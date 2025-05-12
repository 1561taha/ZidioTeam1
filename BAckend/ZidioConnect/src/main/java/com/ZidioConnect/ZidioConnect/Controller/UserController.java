package com.ZidioConnect.ZidioConnect.Controller;

import com.ZidioConnect.ZidioConnect.Model.RegisterDto;

import com.ZidioConnect.ZidioConnect.Model.User;
import com.ZidioConnect.ZidioConnect.Repo.UserRepo;
import com.ZidioConnect.ZidioConnect.Service.EmailService;
import com.ZidioConnect.ZidioConnect.Service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

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
    

    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody RegisterDto dto) {
        User user = userService.adduser(dto);
        String token = userService.generateVerificationToken(user);
        System.out.println("Generated token: " + token); // Log the generated token
        emailService.sendVerificationEmail(user.getEmail(), token);
        return ResponseEntity.ok("Registration successful. Please check your email to verify your account.");
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody User user) {
        Authentication authentication = authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(user.getUsername(), user.getPassword())
        );

        User loggedInUser = userRepo.findByUsername(user.getUsername());
        if (!loggedInUser.isVerified()) {
            return ResponseEntity.badRequest().body("Email not verified");
        }

        if (authentication.isAuthenticated()) {
            return ResponseEntity.ok("Login successful");
        } else {
            return ResponseEntity.badRequest().build();
        }
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
