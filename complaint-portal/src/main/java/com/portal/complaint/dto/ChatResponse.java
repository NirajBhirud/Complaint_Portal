package com.portal.complaint.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ChatResponse {
    private String reply;
    private String actionRoute; // e.g. "/citizen/login" — null when no navigation is suggested
    private String actionLabel; // e.g. "Go to Citizen Login" — null when actionRoute is null
}