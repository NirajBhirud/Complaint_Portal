package com.portal.complaint.service;

import com.portal.complaint.dto.AuthResponse;
import com.portal.complaint.dto.LoginRequest;
import com.portal.complaint.dto.RegisterRequest;
import com.portal.complaint.entity.User;
import com.portal.complaint.enums.Role;
import com.portal.complaint.repository.UserRepository;
import com.portal.complaint.security.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepo;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    // public self-signup - ALWAYS creates a CITIZEN. no way to escalate to
    // officer/commissioner thru this endpoint, thats intentional
    public AuthResponse register(RegisterRequest req) {
        if (userRepo.existsByEmail(req.getEmail())) {
            throw new IllegalArgumentException("an account with this email alredy exists");
        }

        User user = User.builder()
                .fullName(req.getFullName())
                .email(req.getEmail())
                .password(passwordEncoder.encode(req.getPassword()))
                .phoneNo(req.getPhoneNo())
                .role(Role.CITIZEN)
                .build();

        userRepo.save(user);

        String token = jwtUtil.generateToken(user.getEmail(), user.getRole().name());
        return new AuthResponse(token, user.getFullName(), user.getRole().name(), user.getId());
    }

    // shared login for all 3 roles - the frontend routes people based on the role that comes back
    public AuthResponse login(LoginRequest req) {
        User user = userRepo.findByEmail(req.getEmail())
                .orElseThrow(() -> new IllegalArgumentException("invalid email or password"));

        if (!passwordEncoder.matches(req.getPassword(), user.getPassword())) {
            throw new IllegalArgumentException("invalid email or password");
        }

        String token = jwtUtil.generateToken(user.getEmail(), user.getRole().name());
        return new AuthResponse(token, user.getFullName(), user.getRole().name(), user.getId());
    }
}
