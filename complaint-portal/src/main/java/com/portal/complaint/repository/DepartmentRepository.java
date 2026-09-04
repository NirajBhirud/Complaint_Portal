package com.portal.complaint.repository;

import com.portal.complaint.entity.Department;
import com.portal.complaint.enums.DeptCategory;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface DepartmentRepository extends JpaRepository<Department, Long> {
    Optional<Department> findByCategory(DeptCategory category);
}
