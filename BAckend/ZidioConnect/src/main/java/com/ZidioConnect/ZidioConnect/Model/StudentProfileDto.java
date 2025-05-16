package com.ZidioConnect.ZidioConnect.Model;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class StudentProfileDto {

    @NotBlank(message = "Full name must not be blank")
    private String fullName;

    private String phoneNumber;

    private String location;

    @Size(max = 20, message = "Maximum of 20 skills allowed")
    private List<String> skills = new ArrayList<>();

    @Size(max = 20, message = "Maximum of 20 interests allowed")
    private List<String> interests = new ArrayList<>();

    @Size(max = 10, message = "Maximum of 10 education entries allowed")
    private List<String> education = new ArrayList<>();

    @Size(max = 10, message = "Maximum of 10 certifications allowed")
    private List<String> certifications = new ArrayList<>();

    @Size(max = 10, message = "Maximum of 10 projects allowed")
    private List<String> projects = new ArrayList<>();

    @Size(max = 10, message = "Maximum of 10 work experience entries allowed")
    private List<String> workExperience = new ArrayList<>();

    private String resumeUrl;

    private String photoUrl;
}

