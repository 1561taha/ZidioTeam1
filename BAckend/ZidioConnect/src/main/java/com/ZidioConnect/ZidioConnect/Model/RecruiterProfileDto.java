package com.ZidioConnect.ZidioConnect.Model;

import jakarta.validation.constraints.*;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RecruiterProfileDto {

    private String fullName;

    private String email;

    private String title;

    @Size(max = 100, message = "Company name must be at most 100 characters")
    private String companyName;


    @Size(max = 200, message = "Website URL must be at most 200 characters")
    @Pattern(
            regexp = "^(https?://).+",
            message = "Website must start with http:// or https://"
    )
    private String website;


    @Pattern(
            regexp = "^[+]?[0-9]{7,15}$",
            message = "Contact number must be a valid phone number with 7–15 digits"
    )
    private String contactNumber;


    @Size(max = 1000, message = "About section must be at most 1000 characters")
    private String companyDescription;





    @Size(max = 200, message = "Photo URL must be at most 200 characters")
    @Pattern(
            regexp = "^(https?://).+",
            message = "Photo URL must be a valid URL starting with http:// or https://"
    )
    private String photoUrl;
}
