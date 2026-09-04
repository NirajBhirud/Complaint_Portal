package com.portal.complaint.repository;

import com.portal.complaint.entity.Complaint;
import com.portal.complaint.enums.ComplaintStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ComplaintRepository extends JpaRepository<Complaint, Long> {
    List<Complaint> findByCitizenIdOrderByCreatedAtDesc(Long citizenId);
    List<Complaint> findByDepartmentIdOrderByCreatedAtDesc(Long deptId);
    List<Complaint> findByAssignedOfficerIdOrderByCreatedAtDesc(Long officerId);
    List<Complaint> findByStatus(ComplaintStatus status);
}
