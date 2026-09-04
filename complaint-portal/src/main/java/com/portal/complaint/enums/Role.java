package com.portal.complaint.enums;

public enum Role {
    CITIZEN,        // general public, self-registers
    DEPT_OFFICER,   // staff of one specific department, account created by a COMMISSIONER
    COMMISSIONER    // oversees all departments + all officers, seeded on first run
}
