package com.portal.complaint.service;

import com.portal.complaint.dto.ComplaintRequest;
import com.portal.complaint.dto.StatusUpdateRequest;
import com.portal.complaint.entity.Complaint;
import com.portal.complaint.entity.ComplaintStatusHistory;
import com.portal.complaint.entity.Department;
import com.portal.complaint.entity.User;
import com.portal.complaint.enums.ComplaintStatus;
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

    // ---- citizen raises a new complaint ----
    public Complaint raiseComplaint(String citizenEmail, ComplaintRequest req, MultipartFile beforeImage) {
        User citizen = getUserOrThrow(citizenEmail);

        // auto-route to the right dept based on the category the citizen picked
        Department dept = deptRepo.findByCategory(req.getCategory())
                .orElseThrow(() -> new IllegalArgumentException("no department configured for this category yet"));

        String imgUrl = beforeImage != null && !beforeImage.isEmpty()
                ? fileStorageService.storeFile(beforeImage)
                : null;

        Complaint complaint = Complaint.builder()
                .title(req.getTitle())
                .description(req.getDescription())
                .location(req.getLocation())
                .citizen(citizen)
                .department(dept)
                .status(ComplaintStatus.PENDING)
                .beforeImageUrl(imgUrl)
                .build();

        complaintRepo.save(complaint);
        logHistory(complaint, ComplaintStatus.PENDING, "complaint raised by citizen", citizen.getFullName());

        return complaint;
    }

    public List<Complaint> getMyComplaints(String citizenEmail) {
        User citizen = getUserOrThrow(citizenEmail);
        return complaintRepo.findByCitizenIdOrderByCreatedAtDesc(citizen.getId());
    }

    public List<Complaint> getComplaintsForOfficerDept(String officerEmail) {
        User officer = getUserOrThrow(officerEmail);
        if (officer.getDepartment() == null) {
            throw new IllegalStateException("this officer isnt linked to a department");
        }
        return complaintRepo.findByDepartmentIdOrderByCreatedAtDesc(officer.getDepartment().getId());
    }

    public Complaint getById(Long id) {
        return complaintRepo.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("complaint not found"));
    }

    // ---- officer updates status (assign self / in progress / mark resolved) ----
    // NOTE: officer can only push it as far as RESOLVED_PENDING_CONFIRMATION.
    // they CANNOT set it to COMPLETED directly - that button doesnt even exist for them.
    public Complaint updateStatusByOfficer(Long complaintId, String officerEmail, StatusUpdateRequest req) {
        User officer = getUserOrThrow(officerEmail);
        Complaint complaint = getById(complaintId);

        if (req.getNewStatus() == ComplaintStatus.COMPLETED) {
            throw new IllegalStateException("officers cant mark a complaint completed - only the citizen can, after confirming the repair");
        }

        complaint.setAssignedOfficer(officer);
        complaint.setStatus(req.getNewStatus());
        complaint.setOfficerRemark(req.getRemarks());
        complaintRepo.save(complaint);

        logHistory(complaint, req.getNewStatus(), req.getRemarks(), officer.getFullName());
        return complaint;
    }

    // ---- citizen confirms the repair is actually done, uploads after-photo ----
    // this is the one and only path to COMPLETED status
    public Complaint confirmCompletion(Long complaintId, String citizenEmail, MultipartFile afterImage, String remarks) {
        User citizen = getUserOrThrow(citizenEmail);
        Complaint complaint = getById(complaintId);

        if (!complaint.getCitizen().getId().equals(citizen.getId())) {
            throw new IllegalStateException("you can only confirm completion on your own complaints");
        }

        if (complaint.getStatus() != ComplaintStatus.RESOLVED_PENDING_CONFIRMATION) {
            throw new IllegalStateException("this complaint isnt waiting on your confirmation yet");
        }

        if (afterImage == null || afterImage.isEmpty()) {
            throw new IllegalArgumentException("please upload a photo of the repaired place to confirm completion");
        }

        String afterUrl = fileStorageService.storeFile(afterImage);
        complaint.setAfterImageUrl(afterUrl);
        complaint.setStatus(ComplaintStatus.COMPLETED);
        complaintRepo.save(complaint);

        logHistory(complaint, ComplaintStatus.COMPLETED, remarks, citizen.getFullName());
        return complaint;
    }

    // ---- citizen rejects the officer's resolution, sends it back ----
    public Complaint reopenComplaint(Long complaintId, String citizenEmail, String reason) {
        User citizen = getUserOrThrow(citizenEmail);
        Complaint complaint = getById(complaintId);

        if (!complaint.getCitizen().getId().equals(citizen.getId())) {
            throw new IllegalStateException("you can only reopen your own complaints");
        }
        if (complaint.getStatus() != ComplaintStatus.RESOLVED_PENDING_CONFIRMATION) {
            throw new IllegalStateException("only a resolution waiting on your confirmation can be reopened");
        }

        complaint.setStatus(ComplaintStatus.REOPENED);
        complaintRepo.save(complaint);
        logHistory(complaint, ComplaintStatus.REOPENED, reason, citizen.getFullName());
        return complaint;
    }

    public List<ComplaintStatusHistory> getTimeline(Long complaintId) {
        return historyRepo.findByComplaintIdOrderByChangedAtAsc(complaintId);
    }

    private void logHistory(Complaint complaint, ComplaintStatus status, String remarks, String changedBy) {
        ComplaintStatusHistory hist = ComplaintStatusHistory.builder()
                .complaint(complaint)
                .status(status)
                .remarks(remarks)
                .changedByName(changedBy)
                .build();
        historyRepo.save(hist);
    }

    private User getUserOrThrow(String email) {
        return userRepo.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("user not found"));
    }
}
