package com.portal.complaint.repository;

import com.portal.complaint.entity.User;
import com.portal.complaint.enums.Role;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    boolean existsByEmail(String email);
    List<User> findByRole(Role role);
    boolean existsByRole(Role role);
}
