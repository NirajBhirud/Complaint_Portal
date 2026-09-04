package com.portal.complaint.dto;

import com.portal.complaint.enums.ComplaintStatus;
import lombok.Data;

// used by officer to move a complaint thru the workflow
@Data
public class StatusUpdateRequest {
    private ComplaintStatus newStatus;
    private String remarks;
}
