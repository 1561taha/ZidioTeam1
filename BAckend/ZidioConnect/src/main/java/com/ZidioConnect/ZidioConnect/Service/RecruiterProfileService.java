package com.ZidioConnect.ZidioConnect.Service;

import com.ZidioConnect.ZidioConnect.Model.RecruiterProfile;
import com.ZidioConnect.ZidioConnect.Model.User;
import com.ZidioConnect.ZidioConnect.Repo.RecruiterProfileRepository;
import com.ZidioConnect.ZidioConnect.Repo.UserRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.Optional;

import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.http.HttpStatus;
import org.springframework.dao.DataIntegrityViolationException;

@Service
@RequiredArgsConstructor
public class RecruiterProfileService {

    private final RecruiterProfileRepository profileRepo;
    private final UserRepo userRepo;
    private final CloudinaryService cloudinaryService;

    /**
     * Get the recruiter profile for the currently authenticated user.
     */
    @Transactional(readOnly = true)
    public RecruiterProfile getProfileForCurrentUser(String username) {
        User user = Optional.ofNullable(userRepo.findByUsername(username))
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));
        return profileRepo.findByUser(user)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Profile not found"));
    }

    /**
     * Create a new recruiter profile (only if not already present).
     */
    @Transactional
    public RecruiterProfile createProfile(String username, RecruiterProfile dto) {
        User user = Optional.ofNullable(userRepo.findByUsername(username))
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));

        if (profileRepo.findByUser(user).isPresent()) {
            throw new DataIntegrityViolationException("Profile already exists for this user");
        }

        dto.setEmail(user.getEmail());
        dto.setUser(user);

        return profileRepo.save(dto);
    }

    /**
     * Update non-null fields of the existing recruiter profile.
     */
    @Transactional
    public RecruiterProfile updateProfile(String username, RecruiterProfile updates) {
        RecruiterProfile existing = getProfileForCurrentUser(username);

        if (updates.getCompanyName() != null)   existing.setCompanyName(updates.getCompanyName());
        if (updates.getWebsite() != null)       existing.setWebsite(updates.getWebsite());
        if (updates.getContactNumber() != null) existing.setContactNumber(updates.getContactNumber());
        if (updates.getFullName() != null)         existing.setFullName(updates.getFullName());
        if (updates.getTitle() != null)         existing.setTitle(updates.getTitle());
        if (updates.getCompanyDescription() != null)         existing.setCompanyDescription(updates.getCompanyDescription());
        // photoUrl etc. is handled separately (see uploadProfilePhoto)

        return profileRepo.save(existing);
    }

    /**
     * Simple save for cases where you have a fully populated RecruiterProfile.
     */
    @Transactional
    public RecruiterProfile saveProfile(RecruiterProfile profile) {
        return profileRepo.save(profile);
    }

    /**
     * Uploads a profile photo to Cloudinary and updates the recruiter profile.
     */
    @Transactional
    public String uploadProfilePhoto(String username, MultipartFile file) {
        // upload under a dedicated folder
        String url = cloudinaryService.upload(file, "recruiter-photos");

        // update entity
        RecruiterProfile profile = getProfileForCurrentUser(username);
        profile.setPhotoUrl(url);
        profileRepo.save(profile);

        return url;
    }
}
