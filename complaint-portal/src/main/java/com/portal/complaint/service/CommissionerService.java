package com.portal.complaint.service;

import com.portal.complaint.dto.AuthResponse;
import com.portal.complaint.dto.CreateOfficerRequest;
import com.portal.complaint.entity.Complaint;
import com.portal.complaint.entity.Department;
import com.portal.complaint.entity.User;
import com.portal.complaint.enums.ComplaintStatus;
import com.portal.complaint.enums.Role;
import com.portal.complaint.repository.ComplaintRepository;
import com.portal.complaint.repository.DepartmentRepository;
import com.portal.complaint.repository.UserRepository;
import com.portal.complaint.security.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

// everything a COMMISSIONER can do - the one role that sees across every
// department instead of just their own queue
@Service
@RequiredArgsConstructor
public class CommissionerService {

    private final UserRepository userRepo;
    private final DepartmentRepository deptRepo;
    private final ComplaintRepository complaintRepo;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public Department createDepartment(Department dept) {
        return deptRepo.save(dept);
    }

    public List<Department> listDepartments() {
        return deptRepo.findAll();
    }

    // this is the ONLY way a DEPT_OFFICER account comes into existence -
    // officers cant self register, a commissioner has to provision them
    public AuthResponse createOfficer(CreateOfficerRequest req) {
        if (userRepo.existsByEmail(req.getEmail())) {
            throw new IllegalArgumentException("an account with this email alredy exists");
        }

        Department dept = deptRepo.findById(req.getDepartmentId())
                .orElseThrow(() -> new IllegalArgumentException("department not found"));

        User officer = User.builder()
                .fullName(req.getFullName())
                .email(req.getEmail())
                .password(passwordEncoder.encode(req.getPassword()))
                .phoneNo(req.getPhoneNo())
                .role(Role.DEPT_OFFICER)
                .department(dept)
                .build();

        userRepo.save(officer);

        // handing back a token isnt really needed here (the commissioner is
        // creating it for someone else) but keeping the shape consistent is
        // handy if you ever want to show/copy credentials right after creation
        String token = jwtUtil.generateToken(officer.getEmail(), officer.getRole().name());
        return new AuthResponse(token, officer.getFullName(), officer.getRole().name(), officer.getId());
    }

    public List<User> listOfficers() {
        return userRepo.findByRole(Role.DEPT_OFFICER);
    }

    public List<Complaint> listAllComplaints() {
        return complaintRepo.findAll();
    }

    // rough counts for the oversight dashboard - fine at demo/college-project
    // scale, would want proper aggregate queries for a real deployment
    public Map<String, Object> getOverview() {
        List<Complaint> all = complaintRepo.findAll();
        List<Department> depts = deptRepo.findAll();

        Map<String, Long> byStatus = new LinkedHashMap<>();
        for (ComplaintStatus status : ComplaintStatus.values()) {
            byStatus.put(status.name(), all.stream().filter(c -> c.getStatus() == status).count());
        }

        Map<String, Long> byDepartment = new LinkedHashMap<>();
        for (Department d : depts) {
            long count = all.stream().filter(c -> c.getDepartment() != null && c.getDepartment().getId().equals(d.getId())).count();
            byDepartment.put(d.getName(), count);
        }

        Map<String, Object> overview = new LinkedHashMap<>();
        overview.put("totalComplaints", all.size());
        overview.put("totalDepartments", depts.size());
        overview.put("totalOfficers", userRepo.findByRole(Role.DEPT_OFFICER).size());
        overview.put("byStatus", byStatus);
        overview.put("byDepartment", byDepartment);
        return overview;
    }
}
