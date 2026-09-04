package com.portal.complaint.enums;

public enum ComplaintStatus {
    PENDING,                        // just raised by citizen, not yet assigned
    ASSIGNED,                       // assigned to a dept officer
    IN_PROGRESS,                    // officer working on it
    RESOLVED_PENDING_CONFIRMATION,  // officer says its fixed, waiting on citizen to confirm w/ photo
    COMPLETED,                      // citizen confirmed, uploaded after-photo. final state
    REOPENED                        // citizen rejected the resolution, goes back to officer
}
