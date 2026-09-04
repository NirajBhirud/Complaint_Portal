package com.portal.complaint.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

// used by a COMMISSIONER to provision a department officer account
@Data
public class CreateOfficerRequest {
    @NotBlank
    private String fullName;

    @Email
    @NotBlank
    private String email;

    @NotBlank
    private String password;

    private String phoneNo;

    @NotNull
    private Long departmentId;
}
