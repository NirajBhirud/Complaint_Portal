package com.portal.complaint.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.List;
import java.util.Map;

@Service
public class GeminiChatService {

    @Value("${gemini.api.key}")
    private String apiKey;

    @Value("${gemini.api.url}")
    private String apiUrl;

    private final WebClient webClient = WebClient.builder().build();

    // system-ish instruction we prepend so the bot stays on-topic for this portal.
    // gemini free tier doesnt have a dedicated system role on all endpoints so we
    // just prefix it into the first turn instead
    private static final String CONTEXT_PROMPT = """
            You are a helpful assistant for a Public Grievance Complaint Portal used by citizens
            to report civic issues (roads, water supply, electricity, sanitation, drainage, street
            lighting, etc.) to their local government. Help the user describe their issue clearly,
            suggest which department category it likely falls under (ROADS, WATER_SUPPLY,
            ELECTRICITY, SANITATION_GARBAGE, STREET_LIGHTING, DRAINAGE_SEWAGE, PUBLIC_HEALTH,
            PARKS_ENVIRONMENT, ILLEGAL_CONSTRUCTION, OTHER), and answer questions about how the
            portal works (raising complaints, tracking status, confirming a repair with a photo).
            Keep replies short and simple.

            User message: %s
            """;

    public String getReply(String userMessage) {
        String prompt = CONTEXT_PROMPT.formatted(userMessage);

        Map<String, Object> requestBody = Map.of(
                "contents", List.of(
                        Map.of("parts", List.of(Map.of("text", prompt)))
                )
        );

        try {
            Map response = webClient.post()
                    .uri(apiUrl + "?key=" + apiKey)
                    .bodyValue(requestBody)
                    .retrieve()
                    .bodyToMono(Map.class)
                    .block();

            return extractText(response);
        } catch (Exception e) {
            return "Sorry, the chat assistant is unavailable right now. Please try again in a bit.";
        }
    }

    @SuppressWarnings("unchecked")
    private String extractText(Map response) {
        try {
            List<Map> candidates = (List<Map>) response.get("candidates");
            Map content = (Map) candidates.get(0).get("content");
            List<Map> parts = (List<Map>) content.get("parts");
            return (String) parts.get(0).get("text");
        } catch (Exception e) {
            return "Hmm, I didn't quite get a proper response. Could you rephrase that?";
        }
    }
}
