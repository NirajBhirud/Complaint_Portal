package com.portal.complaint.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

// public self-signup - this is CITIZENS ONLY. theres no role field here on purpose:
// officer/commissioner accounts cant be created thru this endpoint, see CommissionerService instead
@Data
public class RegisterRequest {
    @NotBlank
    private String fullName;

    @Email
    @NotBlank
    private String email;

    @NotBlank
    private String password;

    private String phoneNo;
}
