package com.portal.complaint.dto;

import com.portal.complaint.enums.DeptCategory;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class ComplaintRequest {

    @NotBlank
    private String title;

    @NotBlank
    private String description;

    /*
     * Human-readable address / landmark.
     *
     * Example:
     * Near Shivaji Chowk, Ward 5
     */
    private String location;

    /*
     * Exact GPS coordinates captured from the browser.
     *
     * These remain optional because the citizen can deny
     * location permission.
     */
    private Double latitude;

    private Double longitude;

    /*
     * Determines which government department receives
     * the complaint.
     */
    @NotNull
    private DeptCategory category;
}