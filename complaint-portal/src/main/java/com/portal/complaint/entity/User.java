package com.portal.complaint.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.portal.complaint.enums.Role;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "users")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String fullName;

    @Column(unique = true, nullable = false)
    private String email;

    @JsonIgnore
    private String password; // stored as bcrypt hash - never gets serialized back out

    private String phoneNo;

    @Enumerated(EnumType.STRING)
    private Role role;

    // only set when role = DEPT_OFFICER, tells which dept this officer belongs to
    @ManyToOne
    @JoinColumn(name = "department_id")
    private Department department;

    private LocalDateTime createdAt;

    @PrePersist
    public void prePersist() {
        this.createdAt = LocalDateTime.now();
    }
}
