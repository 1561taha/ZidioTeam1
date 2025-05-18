package com.ZidioConnect.ZidioConnect.Controller;

import com.ZidioConnect.ZidioConnect.Model.*;

import com.ZidioConnect.ZidioConnect.Repo.UserRepo;
import com.ZidioConnect.ZidioConnect.Service.EmailService;
import com.ZidioConnect.ZidioConnect.Service.RecruiterProfileService;
import com.ZidioConnect.ZidioConnect.Service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import jakarta.servlet.http.HttpServletRequest;

import static com.ZidioConnect.ZidioConnect.Model.Role.ROLE_Recruiter;

@RestController
@RequestMapping("/user")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {
    @Autowired
    private UserService userService;
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private EmailService emailService;

    @Autowired
    private UserRepo userRepo;
    @Autowired
    private RecruiterProfileService profileService;
    

    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody RegisterDto dto) {
        User user = userService.adduser(dto);

        String token = userService.generateVerificationToken(user);
        System.out.println("Generated token: " + token); // Log the generated token
        emailService.sendVerificationEmail(user.getEmail(), token);
        if (user.getRole() == Role.ROLE_Recruiter) {
            RecruiterProfile recruiterProfile = RecruiterProfile.builder()
                    .fullName(null)
                    .email(null)
                    .title(null)
                    .companyName(null)
                    .website(null)
                    .contactNumber(null)
                    .companyDescription(null)
                    .photoUrl(null)
                    .build();

            profileService.createProfile(user.getUsername(), recruiterProfile);
        }
        return ResponseEntity.ok("Registration successful. Please check your email to verify your account.");
    }
    @PostMapping("/login")
    public ResponseEntity<Response> login(@RequestBody User user, HttpServletRequest request) {
        Authentication authentication = authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(user.getUsername(), user.getPassword())
        );

        if (!authentication.isAuthenticated()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        // Set authentication in SecurityContext
        SecurityContextHolder.getContext().setAuthentication(authentication);

        // Force session creation and persist SecurityContext in session
        request.getSession(true).setAttribute("SPRING_SECURITY_CONTEXT", SecurityContextHolder.getContext());

        User loggedInUser = userRepo.findByUsername(user.getUsername());
        if (loggedInUser == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        if (!loggedInUser.isVerified()) {
            return ResponseEntity.badRequest()
                    .body(new Response("Email not verified"));
        }
        if (user.getRole() != null && !loggedInUser.getRole().toString().equals(user.getRole().toString())) {
            return ResponseEntity.badRequest()
                    .body(new Response("Incorrect role for this user."));
        }
        Role role = loggedInUser.getRole();
        Response response = new Response(role.toString());
        return ResponseEntity.ok(response);
    }

    @GetMapping("/verify")
    public ResponseEntity<?> verifyEmail(@RequestParam String token) {
        System.out.println("Received token: " + token); // Log the token
        User user = userRepo.findByVerificationToken(token);
        if (user == null) {
            System.out.println("Invalid token: " + token); // Log invalid token
            return ResponseEntity.badRequest().body("Invalid token");
        }
        user.setVerified(true);
//        user.setVerificationToken(null);
        userRepo.save(user);
        return ResponseEntity.ok("Email verified successfully");
    }
}
