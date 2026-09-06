// FULL FILE — replace service/EmailService.java entirely with this
package com.portal.complaint.service;

import com.portal.complaint.entity.Complaint;
import com.portal.complaint.entity.User;
import com.portal.complaint.enums.ComplaintStatus;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

// every email the platform sends lives here. nothing about a complaint's status
// or ownership is decided in this class - ComplaintService tells it who to email
// and about what, this class just formats + sends. failures are swallowed and
// logged so a dead SMTP server never breaks someone raising a complaint
@Service
@RequiredArgsConstructor
public class EmailService {

    private static final Logger log = LoggerFactory.getLogger(EmailService.class);

    private final JavaMailSender mailSender;

    @Value("${app.mail.enabled:true}")
    private boolean mailEnabled;

    @Value("${app.mail.from-name}")
    private String fromName;

    @Value("${spring.mail.username}")
    private String fromAddress;

    @Value("${app.frontend-url}")
    private String frontendUrl;

    private static final Map<ComplaintStatus, String> STATUS_LABEL = Map.of(
            ComplaintStatus.PENDING, "Pending",
            ComplaintStatus.ASSIGNED, "Assigned",
            ComplaintStatus.IN_PROGRESS, "In Progress",
            ComplaintStatus.RESOLVED_PENDING_CONFIRMATION, "Resolved — Awaiting Your Confirmation",
            ComplaintStatus.COMPLETED, "Completed",
            ComplaintStatus.REOPENED, "Reopened"
    );

    // ================= public API used by ComplaintService =================

    // fired once, to every officer in the department, when a citizen raises a new complaint
    public void notifyOfficersOfNewComplaint(Complaint complaint, List<User> officers) {
        String subject = "New complaint #%d assigned to %s".formatted(complaint.getId(), complaint.getDepartment().getName());
        String body = newComplaintBody(complaint);
        for (User officer : officers) {
            send(officer.getEmail(), officer.getFullName(), subject, body);
        }
    }

    // fired to the citizen every time an officer moves the status forward
    public void notifyCitizenOfStatusChange(Complaint complaint, ComplaintStatus previousStatus) {
        String label = STATUS_LABEL.getOrDefault(complaint.getStatus(), complaint.getStatus().name());
        String subject = "Update on complaint #%d — %s".formatted(complaint.getId(), label);
        String body = statusChangeBody(complaint, previousStatus);
        send(complaint.getCitizen().getEmail(), complaint.getCitizen().getFullName(), subject, body);
    }

    // fired to every officer in the department when the citizen confirms completion or reopens it
    public void notifyOfficersOfCitizenAction(Complaint complaint, List<User> officers, String actionHeadline) {
        String subject = "Complaint #%d — %s".formatted(complaint.getId(), actionHeadline);
        String body = citizenActionBody(complaint, actionHeadline);
        for (User officer : officers) {
            send(officer.getEmail(), officer.getFullName(), subject, body);
        }
    }

    // a short receipt back to the citizen confirming their own action went through
    public void notifyCitizenOfOwnAction(Complaint complaint, String actionHeadline) {
        String subject = "Complaint #%d — %s".formatted(complaint.getId(), actionHeadline);
        String body = citizenActionBody(complaint, actionHeadline);
        send(complaint.getCitizen().getEmail(), complaint.getCitizen().getFullName(), subject, body);
    }

    // ================= sending plumbing =================

    private void send(String toEmail, String toName, String subject, String htmlBody) {
        if (!mailEnabled) {
            log.info("app.mail.enabled=false, skipping email to {} — subject: {}", toEmail, subject);
            return;
        }
        if (toEmail == null || toEmail.isBlank()) return;

        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, "UTF-8");
            helper.setFrom(fromAddress, fromName);
            helper.setTo(toEmail);
            helper.setSubject(subject);
            helper.setText(htmlBody, true);
            mailSender.send(message);
        } catch (MessagingException | java.io.UnsupportedEncodingException e) {
            // an email failing to send should never take down the actual complaint workflow
            log.error("failed to send email to {} (subject: {}): {}", toEmail, subject, e.getMessage());
        }
    }

    // ================= templates =================

    private String newComplaintBody(Complaint c) {
        String content = """
            <p>A new complaint has been raised under your department and needs attention.</p>
            %s
            <p style="margin-top:20px;">Please review and assign it as soon as possible.</p>
            %s
            """.formatted(complaintFactTable(c), ctaButton("Open in department queue", frontendUrl + "/officer"));
        return shell("New Complaint Assigned", content);
    }

    private String statusChangeBody(Complaint c, ComplaintStatus previousStatus) {
        String prevLabel = STATUS_LABEL.getOrDefault(previousStatus, previousStatus.name());
        String newLabel = STATUS_LABEL.getOrDefault(c.getStatus(), c.getStatus().name());

        String extra = "";
        if (c.getStatus() == ComplaintStatus.RESOLVED_PENDING_CONFIRMATION) {
            extra = """
                <p style="background:#FBF0DE;border:1px solid #C1852B;border-radius:6px;padding:14px 16px;margin-top:16px;color:#6B4712;">
                    <strong>Action needed:</strong> the department says this is fixed. Please confirm by uploading a photo of the
                    repaired spot — this is the only way the complaint gets closed.
                </p>
                """;
        }
        if (c.getOfficerRemark() != null && !c.getOfficerRemark().isBlank()) {
            extra += """
                <p style="margin-top:14px;"><strong>Department note:</strong> %s</p>
                """.formatted(escape(c.getOfficerRemark()));
        }

        String content = """
            <p>The status of your complaint has changed from <strong>%s</strong> to <strong>%s</strong>.</p>
            %s
            %s
            %s
            """.formatted(prevLabel, newLabel, complaintFactTable(c), extra,
                ctaButton("View complaint", frontendUrl + "/complaints/" + c.getId()));
        return shell("Complaint Status Update", content);
    }

    private String citizenActionBody(Complaint c, String actionHeadline) {
        String content = """
            <p>%s</p>
            %s
            %s
            """.formatted(escape(actionHeadline) + ".", complaintFactTable(c),
                ctaButton("View complaint", frontendUrl + "/complaints/" + c.getId()));
        return shell("Complaint Update", content);
    }

    // a small, consistent fact table used across every email
    private String complaintFactTable(Complaint c) {
        String mapRow = "";
        if (c.getLatitude() != null && c.getLongitude() != null) {
            String mapUrl = "https://www.google.com/maps?q=%s,%s".formatted(c.getLatitude(), c.getLongitude());
            mapRow = """
                <tr><td style="padding:6px 0;color:#4B5768;">Exact location</td><td style="padding:6px 0;"><a href="%s" style="color:#2C5F8A;">Open in Google Maps →</a></td></tr>
                """.formatted(mapUrl);
        }

        return """
            <table style="width:100%%;border-collapse:collapse;margin-top:14px;font-size:14px;">
                <tr><td style="padding:6px 0;color:#4B5768;width:140px;">Complaint ID</td><td style="padding:6px 0;color:#14213D;font-weight:600;">#%d</td></tr>
                <tr><td style="padding:6px 0;color:#4B5768;">Title</td><td style="padding:6px 0;color:#14213D;">%s</td></tr>
                <tr><td style="padding:6px 0;color:#4B5768;">Department</td><td style="padding:6px 0;color:#14213D;">%s</td></tr>
                <tr><td style="padding:6px 0;color:#4B5768;">Location</td><td style="padding:6px 0;color:#14213D;">%s</td></tr>
                %s
                <tr><td style="padding:6px 0;color:#4B5768;vertical-align:top;">Description</td><td style="padding:6px 0;color:#14213D;">%s</td></tr>
            </table>
            """.formatted(
                c.getId(),
                escape(c.getTitle()),
                escape(c.getDepartment() != null ? c.getDepartment().getName() : "Unassigned"),
                escape(c.getLocation() != null ? c.getLocation() : "—"),
                mapRow,
                escape(c.getDescription())
        );
    }

    private String ctaButton(String label, String url) {
        return """
            <div style="margin-top:22px;">
                <a href="%s" style="background:#14213D;color:#ffffff;text-decoration:none;padding:11px 22px;border-radius:6px;font-size:14px;font-weight:600;display:inline-block;">%s</a>
            </div>
            """.formatted(url, label);
    }

    // wraps any inner content in the shared header/footer chrome so every
    // email looks like it came from the same, professional system
    private String shell(String heading, String innerContentHtml) {
        return """
            <!doctype html>
            <html>
            <body style="margin:0;padding:0;background:#F3F4F0;font-family:Arial,Helvetica,sans-serif;">
                <table style="width:100%%;background:#F3F4F0;padding:32px 0;">
                    <tr>
                        <td align="center">
                            <table style="width:520px;max-width:92%%;background:#ffffff;border-radius:8px;overflow:hidden;border:1px solid #DADCD4;">
                                <tr>
                                    <td style="background:#14213D;padding:20px 28px;">
                                        <span style="color:#ffffff;font-size:17px;font-weight:700;letter-spacing:0.01em;">Nagrik Seva</span>
                                        <div style="color:#9AA6BD;font-size:12px;margin-top:2px;">Public Grievance Portal</div>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding:28px 28px 8px 28px;">
                                        <h2 style="margin:0 0 12px 0;color:#14213D;font-size:18px;">%s</h2>
                                        <div style="color:#333333;font-size:14px;line-height:1.55;">%s</div>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding:22px 28px 26px 28px;border-top:1px solid #EFEFEA;margin-top:20px;">
                                        <p style="margin:0;color:#8892A0;font-size:12px;">
                                            This is an automated message from Nagrik Seva. Please do not reply directly to this email.
                                        </p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
            </body>
            </html>
            """.formatted(heading, innerContentHtml);
    }

    private String escape(String raw) {
        if (raw == null) return "";
        return raw.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;");
    }
}