package com.portal.complaint.controller;

import com.portal.complaint.dto.ChatRequest;
import com.portal.complaint.dto.ChatResponse;
import com.portal.complaint.service.GeminiChatService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/chatbot")
@RequiredArgsConstructor
public class ChatbotController {

    private final GeminiChatService geminiChatService;

    @PostMapping("/ask")
    public ChatResponse ask(@RequestBody ChatRequest req) {

        return geminiChatService.getReply(
                req.getMessage(),
                req.getCurrentPath(),
                req.getRole(),
                req.getLanguage()
        );
    }
}