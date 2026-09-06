package com.portal.complaint.service;

import com.portal.complaint.dto.ComplaintRequest;
import com.portal.complaint.dto.StatusUpdateRequest;
import com.portal.complaint.entity.Complaint;
import com.portal.complaint.entity.ComplaintStatusHistory;
import com.portal.complaint.entity.Department;
import com.portal.complaint.entity.User;
import com.portal.complaint.enums.ComplaintStatus;
import com.portal.complaint.enums.Role;
import com.portal.complaint.repository.ComplaintRepository;
import com.portal.complaint.repository.ComplaintStatusHistoryRepository;
import com.portal.complaint.repository.DepartmentRepository;
import com.portal.complaint.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ComplaintService {

    private final ComplaintRepository complaintRepo;
    private final DepartmentRepository deptRepo;
    private final UserRepository userRepo;
    private final ComplaintStatusHistoryRepository historyRepo;
    private final FileStorageService fileStorageService;
    private final EmailService emailService;

    // =========================================================
    // CITIZEN RAISES COMPLAINT
    // =========================================================

    public Complaint raiseComplaint(
            String citizenEmail,
            ComplaintRequest req,
            MultipartFile beforeImage
    ) {

        User citizen = getUserOrThrow(citizenEmail);

        /*
         * Automatically find the department using the
         * category selected by the citizen.
         */
        Department dept = deptRepo.findByCategory(req.getCategory())
                .orElseThrow(() ->
                        new IllegalArgumentException(
                                "No department configured for this category yet"
                        )
                );

        /*
         * Store complaint image if provided.
         */
        String imgUrl = beforeImage != null && !beforeImage.isEmpty()
                ? fileStorageService.storeFile(beforeImage)
                : null;

        /*
         * Create complaint including GPS coordinates.
         */
        Complaint complaint = Complaint.builder()
                .title(req.getTitle())
                .description(req.getDescription())
                .location(req.getLocation())
                .latitude(req.getLatitude())
                .longitude(req.getLongitude())
                .citizen(citizen)
                .department(dept)
                .status(ComplaintStatus.PENDING)
                .beforeImageUrl(imgUrl)
                .build();

        complaintRepo.save(complaint);

        logHistory(
                complaint,
                ComplaintStatus.PENDING,
                "Complaint raised by citizen",
                citizen.getFullName()
        );

        /*
         * Notify all officers belonging to the selected department.
         */
        List<User> officers =
                userRepo.findByRoleAndDepartmentId(
                        Role.DEPT_OFFICER,
                        dept.getId()
                );

        emailService.notifyOfficersOfNewComplaint(
                complaint,
                officers
        );

        return complaint;
    }

    // =========================================================
    // CITIZEN COMPLAINTS
    // =========================================================

    public List<Complaint> getMyComplaints(String citizenEmail) {

        User citizen = getUserOrThrow(citizenEmail);

        return complaintRepo
                .findByCitizenIdOrderByCreatedAtDesc(citizen.getId());
    }

    // =========================================================
    // OFFICER DEPARTMENT QUEUE
    // =========================================================

    public List<Complaint> getComplaintsForOfficerDept(
            String officerEmail
    ) {

        User officer = getUserOrThrow(officerEmail);

        if (officer.getDepartment() == null) {
            throw new IllegalStateException(
                    "This officer is not linked to a department"
            );
        }

        return complaintRepo
                .findByDepartmentIdOrderByCreatedAtDesc(
                        officer.getDepartment().getId()
                );
    }

    // =========================================================
    // GET SINGLE COMPLAINT
    // =========================================================

    public Complaint getById(Long id) {

        return complaintRepo.findById(id)
                .orElseThrow(() ->
                        new IllegalArgumentException(
                                "Complaint not found"
                        )
                );
    }

    // =========================================================
    // OFFICER UPDATES STATUS
    // =========================================================

    public Complaint updateStatusByOfficer(
            Long complaintId,
            String officerEmail,
            StatusUpdateRequest req
    ) {

        User officer = getUserOrThrow(officerEmail);

        Complaint complaint = getById(complaintId);

        /*
         * Officer must belong to a department.
         */
        if (officer.getDepartment() == null) {
            throw new IllegalStateException(
                    "Officer is not linked to a department"
            );
        }

        /*
         * IMPORTANT:
         *
         * Prevent an officer from modifying complaints
         * belonging to another department.
         */
        if (complaint.getDepartment() == null ||
                !complaint.getDepartment()
                        .getId()
                        .equals(officer.getDepartment().getId())) {

            throw new IllegalStateException(
                    "You cannot update a complaint belonging to another department"
            );
        }

        /*
         * Officer cannot directly complete a complaint.
         * Citizen must confirm the repair.
         */
        if (req.getNewStatus() == ComplaintStatus.COMPLETED) {

            throw new IllegalStateException(
                    "Officers cannot mark a complaint completed. " +
                            "Only the citizen can confirm completion."
            );
        }

        ComplaintStatus previousStatus =
                complaint.getStatus();

        /*
         * Assign the officer who performed the update.
         */
        complaint.setAssignedOfficer(officer);

        complaint.setStatus(req.getNewStatus());

        complaint.setOfficerRemark(req.getRemarks());

        complaintRepo.save(complaint);

        logHistory(
                complaint,
                req.getNewStatus(),
                req.getRemarks(),
                officer.getFullName()
        );

        /*
         * Notify citizen about status change.
         */
        emailService.notifyCitizenOfStatusChange(
                complaint,
                previousStatus
        );

        return complaint;
    }

    // =========================================================
    // CITIZEN CONFIRMS COMPLETION
    // =========================================================

    public Complaint confirmCompletion(
            Long complaintId,
            String citizenEmail,
            MultipartFile afterImage,
            String remarks
    ) {

        User citizen = getUserOrThrow(citizenEmail);

        Complaint complaint = getById(complaintId);

        /*
         * Only complaint owner can confirm.
         */
        if (!complaint.getCitizen()
                .getId()
                .equals(citizen.getId())) {

            throw new IllegalStateException(
                    "You can only confirm completion of your own complaints"
            );
        }

        /*
         * Complaint must be waiting for citizen confirmation.
         */
        if (complaint.getStatus() !=
                ComplaintStatus.RESOLVED_PENDING_CONFIRMATION) {

            throw new IllegalStateException(
                    "This complaint is not waiting for your confirmation yet"
            );
        }

        /*
         * Citizen must provide proof photo.
         */
        if (afterImage == null || afterImage.isEmpty()) {

            throw new IllegalArgumentException(
                    "Please upload a photo of the repaired location"
            );
        }

        String afterUrl =
                fileStorageService.storeFile(afterImage);

        complaint.setAfterImageUrl(afterUrl);

        complaint.setStatus(
                ComplaintStatus.COMPLETED
        );

        complaintRepo.save(complaint);

        logHistory(
                complaint,
                ComplaintStatus.COMPLETED,
                remarks,
                citizen.getFullName()
        );

        /*
         * Notify department officers.
         */
        if (complaint.getDepartment() != null) {

            List<User> officers =
                    userRepo.findByRoleAndDepartmentId(
                            Role.DEPT_OFFICER,
                            complaint.getDepartment().getId()
                    );

            emailService.notifyOfficersOfCitizenAction(
                    complaint,
                    officers,
                    "Citizen confirmed this complaint as completed"
            );
        }

        return complaint;
    }

    // =========================================================
    // CITIZEN REOPENS COMPLAINT
    // =========================================================

    public Complaint reopenComplaint(
            Long complaintId,
            String citizenEmail,
            String reason
    ) {

        User citizen = getUserOrThrow(citizenEmail);

        Complaint complaint = getById(complaintId);

        if (!complaint.getCitizen()
                .getId()
                .equals(citizen.getId())) {

            throw new IllegalStateException(
                    "You can only reopen your own complaints"
            );
        }

        if (complaint.getStatus() !=
                ComplaintStatus.RESOLVED_PENDING_CONFIRMATION) {

            throw new IllegalStateException(
                    "Only complaints waiting for confirmation can be reopened"
            );
        }

        complaint.setStatus(
                ComplaintStatus.REOPENED
        );

        complaintRepo.save(complaint);

        logHistory(
                complaint,
                ComplaintStatus.REOPENED,
                reason,
                citizen.getFullName()
        );

        if (complaint.getDepartment() != null) {

            List<User> officers =
                    userRepo.findByRoleAndDepartmentId(
                            Role.DEPT_OFFICER,
                            complaint.getDepartment().getId()
                    );

            emailService.notifyOfficersOfCitizenAction(
                    complaint,
                    officers,
                    "Citizen reopened this complaint — the issue is not resolved"
            );
        }

        return complaint;
    }

    // =========================================================
    // TIMELINE
    // =========================================================

    public List<ComplaintStatusHistory> getTimeline(
            Long complaintId
    ) {

        return historyRepo
                .findByComplaintIdOrderByChangedAtAsc(
                        complaintId
                );
    }

    // =========================================================
    // HISTORY
    // =========================================================

    private void logHistory(
            Complaint complaint,
            ComplaintStatus status,
            String remarks,
            String changedBy
    ) {

        ComplaintStatusHistory history =
                ComplaintStatusHistory.builder()
                        .complaint(complaint)
                        .status(status)
                        .remarks(remarks)
                        .changedByName(changedBy)
                        .build();

        historyRepo.save(history);
    }

    // =========================================================
    // USER LOOKUP
    // =========================================================

    private User getUserOrThrow(String email) {

        return userRepo.findByEmail(email)
                .orElseThrow(() ->
                        new IllegalArgumentException(
                                "User not found"
                        )
                );
    }
}