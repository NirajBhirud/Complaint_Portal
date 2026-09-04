package com.portal.complaint.config;

import com.portal.complaint.entity.Department;
import com.portal.complaint.entity.User;
import com.portal.complaint.enums.DeptCategory;
import com.portal.complaint.enums.Role;
import com.portal.complaint.repository.DepartmentRepository;
import com.portal.complaint.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class DataSeeder implements CommandLineRunner {

    private static final Logger log = LoggerFactory.getLogger(DataSeeder.class);

    private final DepartmentRepository deptRepo;
    private final UserRepository userRepo;
    private final PasswordEncoder passwordEncoder;

    @Value("${seed.commissioner.email:commissioner@nagrikseva.gov.in}")
    private String commissionerEmail;

    @Value("${seed.commissioner.password:ChangeMe@123}")
    private String commissionerPassword;

    @Override
    public void run(String... args) {
        seedDepartments();
        seedCommissioner();
    }

    // one department row per category, only runs if the table is empty so
    // this is safe to leave in for every startup
    private void seedDepartments() {
        if (deptRepo.count() > 0) return;

        for (DeptCategory category : DeptCategory.values()) {
            Department dept = Department.builder()
                    .name(prettyName(category))
                    .category(category)
                    .contactEmail(category.name().toLowerCase() + "@nagrikseva.gov.in")
                    .build();
            deptRepo.save(dept);
        }
        log.info("seeded {} departments", DeptCategory.values().length);
    }

    // theres no way to create a COMMISSIONER thru the API by design, so the
    // very first one has to be seeded here. change the password immediately after first login.
    private void seedCommissioner() {
        if (userRepo.existsByRole(Role.COMMISSIONER)) return;

        User commissioner = User.builder()
                .fullName("Default Commissioner")
                .email(commissionerEmail)
                .password(passwordEncoder.encode(commissionerPassword))
                .role(Role.COMMISSIONER)
                .build();
        userRepo.save(commissioner);

        log.warn("=================================================================");
        log.warn(" Seeded a default COMMISSIONER account - change this password ASAP");
        log.warn(" email:    {}", commissionerEmail);
        log.warn(" password: {}", commissionerPassword);
        log.warn("=================================================================");
    }

    private String prettyName(DeptCategory category) {
        String[] words = category.name().toLowerCase().split("_");
        StringBuilder sb = new StringBuilder();
        for (String w : words) {
            sb.append(Character.toUpperCase(w.charAt(0))).append(w.substring(1)).append(" ");
        }
        return sb.toString().trim() + " Department";
    }
}
