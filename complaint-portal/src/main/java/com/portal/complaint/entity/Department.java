package com.portal.complaint.entity;

import com.portal.complaint.enums.DeptCategory;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "departments")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Department {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name; // e.g "Roads & Infrastructure Dept"

    @Enumerated(EnumType.STRING)
    @Column(unique = true)
    private DeptCategory category; // e.g ROADS -- used to auto route complaints

    private String contactEmail;
}
