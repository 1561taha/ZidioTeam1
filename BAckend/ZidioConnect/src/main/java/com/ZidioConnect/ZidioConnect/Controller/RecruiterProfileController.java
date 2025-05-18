package com.ZidioConnect.ZidioConnect.Controller;


import com.ZidioConnect.ZidioConnect.Model.RecruiterProfile;
import com.ZidioConnect.ZidioConnect.Model.RecruiterProfileDto;
import com.ZidioConnect.ZidioConnect.Service.RecruiterProfileService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.security.Principal;
import java.util.Collections;
import java.util.Map;

@RestController
@RequestMapping("/recruiter/profile")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
//@PreAuthorize("hasRole('RECRUITER')")
public class RecruiterProfileController {

    private final RecruiterProfileService profileService;

    /** GET /api/recruiter/profile */
    @GetMapping
    public ResponseEntity<RecruiterProfile> getProfile(Principal principal) {
         System.out.println("Principal: " + principal);
        RecruiterProfile profile =
                profileService.getProfileForCurrentUser(principal.getName());
        return ResponseEntity.ok(profile);
    }

    /** POST /api/recruiter/profile */
    @PostMapping
    public ResponseEntity<RecruiterProfile> createProfile(
            Principal principal,
            @Valid @RequestBody RecruiterProfileDto dto) {
        RecruiterProfile profile = RecruiterProfile.builder()
                .companyName(dto.getCompanyName())
                .website(dto.getWebsite())
                .contactNumber(dto.getContactNumber())
                .fullName(dto.getFullName())
                .title(dto.getTitle())
                .companyDescription(dto.getCompanyDescription())
                .photoUrl(dto.getPhotoUrl())
                .build();
        RecruiterProfile created = profileService.createProfile(principal.getName(), profile);
        return ResponseEntity.status(201).body(created);
    }

    /** PUT /api/recruiter/profile */
    @PutMapping
    public ResponseEntity<RecruiterProfile> updateProfile(
            Principal principal,
            @RequestBody RecruiterProfile dto) {

        RecruiterProfile updated =
                profileService.updateProfile(principal.getName(), dto);
        return ResponseEntity.ok(updated);
    }

    /**
     * POST /api/recruiter/profile/photo
     * Upload or replace profile photo. Returns JSON { "photoUrl": "..." }.
     */
    @PostMapping("/photo")
    public ResponseEntity<Map<String, String>> uploadPhoto(
            Principal principal,
            @RequestParam("photo") MultipartFile file) {
        String url = profileService.uploadProfilePhoto(principal.getName(), file);
        return ResponseEntity.ok(Collections.singletonMap("photoUrl", url));
    }
}
