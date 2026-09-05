package com.portal.complaint.service;

import com.portal.complaint.dto.ChatResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.List;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
public class GeminiChatService {

    private static final Logger log =
            LoggerFactory.getLogger(GeminiChatService.class);

    @Value("${gemini.api.key}")
    private String apiKey;

    @Value("${gemini.api.url}")
    private String apiUrl;

    private final WebClient webClient = WebClient.builder().build();

    private static final String KNOWN_ROUTES = """
            /                     -> Landing page. Publicly accessible. Contains citizen login, citizen registration and government login.
            /citizen/login        -> Login page for PUBLIC citizens.
            /citizen/register     -> Registration page for new citizens.
            /gov/login            -> Login page for GOVERNMENT STAFF, including department officers and commissioners.
            /citizen              -> Citizen dashboard showing the citizen's own complaints. Requires CITIZEN login.
            /citizen/raise        -> Page for citizens to submit a new complaint. Requires CITIZEN login.
            /complaints/:id       -> Complaint detail and timeline page. Requires login.
            /officer              -> Department officer complaint queue. Requires DEPT_OFFICER login.
            /commissioner         -> Commissioner oversight dashboard. Requires COMMISSIONER login.
            """;

    private static final String CONTEXT_PROMPT = """
            You are the official in-app assistant for "Nagrik Seva",
            a public grievance and complaint management portal.

            Your job is to help visitors understand and use THIS PLATFORM.

            PLATFORM PURPOSE:
            Citizens can report civic problems such as:
            - Roads
            - Water supply
            - Electricity
            - Sanitation and garbage
            - Street lighting
            - Drainage and sewage
            - Public health
            - Parks and environment
            - Illegal construction
            - Other civic issues

            HOW THE PLATFORM WORKS:

            1. PUBLIC / CITIZEN
            Citizens can create a free account.
            They can log in through the citizen login.
            They can raise complaints.
            They can select a department/category.
            They can describe the problem.
            They can optionally upload a photo.
            They can track their complaints.
            They can see status updates.
            When a department says a complaint is fixed, the citizen can upload a photo of the repaired location and confirm completion.
            Only the citizen who created the complaint can confirm completion.

            2. GOVERNMENT STAFF
            Government staff do NOT use the citizen login.
            Department officers and commissioners use the separate government login.
            Government staff accounts are created by the commissioner and are not self-registered.

            3. DEPARTMENT OFFICER
            A department officer sees complaints assigned to their department.
            The officer can update the complaint status and provide remarks.

            4. COMMISSIONER
            The commissioner can see departments, officers and complaints.
            The commissioner can create department officer accounts.

            NAVIGATION:
            You may suggest ONLY these exact routes:

            %s

            CURRENT USER CONTEXT:
            Current page: %s
            Logged-in role: %s
            Preferred language: %s

            IMPORTANT NAVIGATION RULES:

            - If the visitor asks where the public/citizen login is:
              use /citizen/login.

            - If the visitor asks where to register:
              use /citizen/register.

            - If the visitor asks where the government login is:
              use /gov/login.

            - If the visitor asks how to raise a complaint:
              if they are not logged in, explain that they first need a citizen account/login and use /citizen/login.
              if they are already a CITIZEN, use /citizen/raise.

            - Do not send a logged-in citizen to government login.

            - Do not send a government officer or commissioner to the citizen dashboard.

            - Never invent routes.

            - If a specific page would genuinely help the user, finish the response on a separate line with exactly:
              ACTION: <route>|<short button label>

            - Include only ONE ACTION line.

            - If no navigation is necessary, do not include an ACTION line.

            RESPONSE STYLE:

            - Be friendly and concise.
            - Explain this portal only.
            - Give practical instructions.
            - Do not claim to perform actions that you cannot perform.
            - Do not invent complaint IDs, departments, users or system data.
            - If the user asks an unrelated question, politely explain that you can help with the Nagrik Seva portal.
            - Respond in the user's preferred language when possible.

            USER MESSAGE:
            %s
            """;

    private static final Pattern ACTION_PATTERN =
            Pattern.compile(
                    "(?im)^ACTION:\\s*([^|\\n]+)\\|\\s*(.+)$"
            );

    public ChatResponse getReply(
            String userMessage,
            String currentPath,
            String role,
            String language
    ) {

        String safeMessage =
                userMessage == null || userMessage.isBlank()
                        ? "Hello"
                        : userMessage.trim();

        String safePath =
                currentPath == null || currentPath.isBlank()
                        ? "/"
                        : currentPath;

        String safeRole =
                role == null || role.isBlank()
                        ? "NOT_LOGGED_IN"
                        : role;

        String safeLanguage =
                language == null || language.isBlank()
                        ? "en"
                        : language;

        String prompt = CONTEXT_PROMPT.formatted(
                KNOWN_ROUTES,
                safePath,
                safeRole,
                safeLanguage,
                safeMessage
        );

        Map<String, Object> requestBody = Map.of(
                "contents",
                List.of(
                        Map.of(
                                "parts",
                                List.of(
                                        Map.of(
                                                "text",
                                                prompt
                                        )
                                )
                        )
                )
        );

        try {

            log.info(
                    "Sending chatbot request to Gemini. page={}, role={}, language={}",
                    safePath,
                    safeRole,
                    safeLanguage
            );

            Map response = webClient
                    .post()
                    .uri(apiUrl)
                    .header("x-goog-api-key", apiKey)
                    .contentType(MediaType.APPLICATION_JSON)
                    .bodyValue(requestBody)
                    .retrieve()
                    .bodyToMono(Map.class)
                    .block();

            String rawText = extractText(response);

            if (rawText == null || rawText.isBlank()) {
                log.error("Gemini returned an empty response: {}", response);

                return new ChatResponse(
                        getFallbackMessage(safeLanguage),
                        null,
                        null
                );
            }

            return parseAction(rawText);

        } catch (Exception e) {

            log.error("Gemini API request failed", e);

            return new ChatResponse(
                    getUnavailableMessage(safeLanguage),
                    null,
                    null
            );
        }
    }

    private ChatResponse parseAction(String rawText) {

        if (rawText == null || rawText.isBlank()) {
            return new ChatResponse(
                    "I couldn't understand that. Please try asking in another way.",
                    null,
                    null
            );
        }

        Matcher matcher =
                ACTION_PATTERN.matcher(rawText);

        if (matcher.find()) {

            String route =
                    matcher.group(1).trim();

            String label =
                    matcher.group(2).trim();

            String replyWithoutAction =
                    rawText.substring(0, matcher.start()).trim();

            return new ChatResponse(
                    replyWithoutAction,
                    route,
                    label
            );
        }

        return new ChatResponse(
                rawText.trim(),
                null,
                null
        );
    }

    @SuppressWarnings("unchecked")
    private String extractText(Map response) {

        try {

            if (response == null) {
                return null;
            }

            List<Map> candidates =
                    (List<Map>) response.get("candidates");

            if (candidates == null || candidates.isEmpty()) {
                log.error(
                        "Gemini response contains no candidates: {}",
                        response
                );
                return null;
            }

            Map content =
                    (Map) candidates.get(0).get("content");

            if (content == null) {
                return null;
            }

            List<Map> parts =
                    (List<Map>) content.get("parts");

            if (parts == null || parts.isEmpty()) {
                return null;
            }

            Object text =
                    parts.get(0).get("text");

            return text != null
                    ? text.toString()
                    : null;

        } catch (Exception e) {

            log.error(
                    "Could not parse Gemini response: {}",
                    response,
                    e
            );

            return null;
        }
    }

    private String getFallbackMessage(String language) {

        return switch (language) {
            case "mr" ->
                    "मला योग्य उत्तर मिळाले नाही. कृपया पुन्हा विचारून पहा.";

            case "hi" ->
                    "मुझे सही उत्तर नहीं मिला। कृपया फिर से पूछें।";

            default ->
                    "I couldn't get a proper answer. Please try again.";
        };
    }

    private String getUnavailableMessage(String language) {

        return switch (language) {
            case "mr" ->
                    "सहाय्यक सध्या उपलब्ध नाही. कृपया थोड्या वेळाने पुन्हा प्रयत्न करा.";

            case "hi" ->
                    "सहायक अभी उपलब्ध नहीं है। कृपया थोड़ी देर बाद फिर प्रयास करें।";

            default ->
                    "The assistant is temporarily unavailable. Please try again in a moment.";
        };
    }
}