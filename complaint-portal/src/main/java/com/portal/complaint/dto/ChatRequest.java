package com.portal.complaint.dto;

import lombok.Data;

@Data
public class ChatRequest {

    private String message;

    private String currentPath;

    private String role;

    private String language;
}