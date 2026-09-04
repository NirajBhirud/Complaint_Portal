package com.portal.complaint.controller;

import com.portal.complaint.entity.Department;
import com.portal.complaint.repository.DepartmentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/departments")
@RequiredArgsConstructor
public class DepartmentController {

    private final DepartmentRepository deptRepo;

    // public endpoint - a citizen needs this list to pick a category when raising a complaint.
    // creating departments is a COMMISSIONER-only action, see CommissionerController
    @GetMapping
    public List<Department> getAll() {
        return deptRepo.findAll();
    }
}
