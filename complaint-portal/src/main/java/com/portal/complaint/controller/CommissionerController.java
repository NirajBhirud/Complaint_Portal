package com.portal.complaint.controller;

import com.portal.complaint.dto.AuthResponse;
import com.portal.complaint.dto.CreateOfficerRequest;
import com.portal.complaint.entity.Complaint;
import com.portal.complaint.entity.Department;
import com.portal.complaint.entity.User;
import com.portal.complaint.service.CommissionerService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

// everything here is locked to ROLE_COMMISSIONER by SecurityConfig ("/api/commissioner/**")
@RestController
@RequestMapping("/api/commissioner")
@RequiredArgsConstructor
public class CommissionerController {

    private final CommissionerService commissionerService;

    @GetMapping("/overview")
    public Map<String, Object> overview() {
        return commissionerService.getOverview();
    }

    @PostMapping("/departments")
    public Department createDepartment(@RequestBody Department dept) {
        return commissionerService.createDepartment(dept);
    }

    @GetMapping("/departments")
    public List<Department> listDepartments() {
        return commissionerService.listDepartments();
    }

    @PostMapping("/officers")
    public AuthResponse createOfficer(@Valid @RequestBody CreateOfficerRequest req) {
        return commissionerService.createOfficer(req);
    }

    @GetMapping("/officers")
    public List<User> listOfficers() {
        return commissionerService.listOfficers();
    }

    @GetMapping("/complaints")
    public List<Complaint> listAllComplaints() {
        return commissionerService.listAllComplaints();
    }
}
