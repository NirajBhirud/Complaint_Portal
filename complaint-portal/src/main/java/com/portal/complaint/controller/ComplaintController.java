package com.portal.complaint.controller;

import com.portal.complaint.dto.ComplaintRequest;
import com.portal.complaint.dto.StatusUpdateRequest;
import com.portal.complaint.entity.Complaint;
import com.portal.complaint.entity.ComplaintStatusHistory;
import com.portal.complaint.service.ComplaintService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/complaints")
@RequiredArgsConstructor
public class ComplaintController {

    private final ComplaintService complaintService;

    // citizen raises a complaint - multipart so the before-photo comes in the same request
    @PostMapping(consumes = "multipart/form-data")
    public ResponseEntity<Complaint> raise(Authentication auth,
                                            @RequestPart("data") ComplaintRequest req,
                                            @RequestPart(value = "image", required = false) MultipartFile image) {
        String email = auth.getName();
        return ResponseEntity.ok(complaintService.raiseComplaint(email, req, image));
    }

    // citizen sees their own complaints + status
    @GetMapping("/my")
    public List<Complaint> myComplaints(Authentication auth) {
        return complaintService.getMyComplaints(auth.getName());
    }

    // officer sees complaints assigned to their department
    @GetMapping("/officer/dept")
    public List<Complaint> deptComplaints(Authentication auth) {
        return complaintService.getComplaintsForOfficerDept(auth.getName());
    }

    @GetMapping("/{id}")
    public Complaint getOne(@PathVariable Long id) {
        return complaintService.getById(id);
    }

    @GetMapping("/{id}/timeline")
    public List<ComplaintStatusHistory> timeline(@PathVariable Long id) {
        return complaintService.getTimeline(id);
    }

    // officer moves the status forward (cant set COMPLETED - service layer blocks that)
    @PatchMapping("/{id}/status")
    public Complaint updateStatus(@PathVariable Long id, Authentication auth,
                                   @RequestBody StatusUpdateRequest req) {
        return complaintService.updateStatusByOfficer(id, auth.getName(), req);
    }

    // citizen confirms the repair - the ONLY way a complaint reaches COMPLETED
    @PostMapping(value = "/{id}/confirm-completion", consumes = "multipart/form-data")
    public Complaint confirmCompletion(@PathVariable Long id, Authentication auth,
                                        @RequestPart("image") MultipartFile afterImage,
                                        @RequestPart(value = "remarks", required = false) String remarks) {
        return complaintService.confirmCompletion(id, auth.getName(), afterImage, remarks);
    }

    // citizen isnt happy with the "fix" - sends it back to the department
    @PostMapping("/{id}/reopen")
    public Complaint reopen(@PathVariable Long id, Authentication auth,
                             @RequestBody Map<String, String> body) {
        return complaintService.reopenComplaint(id, auth.getName(), body.get("reason"));
    }
}
