package com.portal.complaint.entity;

import com.portal.complaint.enums.ComplaintStatus;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "complaints")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Complaint {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    @Column(length = 2000)
    private String description;

    /*
     * Human-readable location entered by the citizen.
     *
     * Example:
     * "Near Shivaji Chowk, Ward 5"
     */
    @Column(length = 500)
    private String location;

    /*
     * Exact GPS location captured from the citizen's device.
     *
     * These are optional because the citizen may deny
     * browser location permission.
     */
    private Double latitude;

    private Double longitude;

    @ManyToOne
    @JoinColumn(name = "citizen_id", nullable = false)
    private User citizen;

    @ManyToOne
    @JoinColumn(name = "department_id")
    private Department department;

    @ManyToOne
    @JoinColumn(name = "assigned_officer_id")
    private User assignedOfficer;

    @Enumerated(EnumType.STRING)
    private ComplaintStatus status;

    /*
     * Photo uploaded when the complaint is raised.
     */
    private String beforeImageUrl;

    /*
     * Photo uploaded by citizen after the officer says
     * the issue has been fixed.
     */
    private String afterImageUrl;

    /*
     * Remark added by department officer.
     */
    @Column(length = 1000)
    private String officerRemark;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

    @PrePersist
    public void prePersist() {
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();

        if (this.status == null) {
            this.status = ComplaintStatus.PENDING;
        }
    }

    @PreUpdate
    public void preUpdate() {
        this.updatedAt = LocalDateTime.now();
    }
}