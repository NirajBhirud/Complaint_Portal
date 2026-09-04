package com.portal.complaint.dto;

import com.portal.complaint.enums.DeptCategory;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

// used when citizen raises a new complaint (multipart form, image sent separately)
@Data
public class ComplaintRequest {
    @NotBlank
    private String title;

    @NotBlank
    private String description;

    private String location;

    @NotNull
    private DeptCategory category; // e.g "ROADS" -> gets auto routed to roads dept
}
