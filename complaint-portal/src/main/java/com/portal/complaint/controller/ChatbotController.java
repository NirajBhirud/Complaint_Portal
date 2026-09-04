package com.portal.complaint.controller;

import com.portal.complaint.dto.ChatRequest;
import com.portal.complaint.service.GeminiChatService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/chatbot")
@RequiredArgsConstructor
public class ChatbotController {

    private final GeminiChatService geminiChatService;

    @PostMapping("/ask")
    public Map<String, String> ask(@RequestBody ChatRequest req) {
        String reply = geminiChatService.getReply(req.getMessage());
        return Map.of("reply", reply);
    }
}
