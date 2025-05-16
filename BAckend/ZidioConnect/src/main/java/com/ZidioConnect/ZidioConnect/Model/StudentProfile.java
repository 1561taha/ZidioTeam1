package com.ZidioConnect.ZidioConnect.Model;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "student_profiles",
        uniqueConstraints = @UniqueConstraint(columnNames = "user_id"))
@Data
@NoArgsConstructor
@AllArgsConstructor
public class StudentProfile {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id", nullable = false, unique = true)
    private User user;

    @Column(name = "full_name", nullable = false)
    private String fullName;

    @Column(name = "phone_number")
    private String phoneNumber;

    @Column(name = "location")
    private String location;

    @ElementCollection
    @CollectionTable(name = "student_skills", joinColumns = @JoinColumn(name = "student_profile_id"))
    @Column(name = "skill")
    private List<String> skills = new ArrayList<>();

    @ElementCollection
    @CollectionTable(name = "student_interests", joinColumns = @JoinColumn(name = "student_profile_id"))
    @Column(name = "interest")
    private List<String> interests = new ArrayList<>();

    @ElementCollection
    @CollectionTable(name = "student_education", joinColumns = @JoinColumn(name = "student_profile_id"))
    @Column(name = "education_entry")
    private List<String> education = new ArrayList<>();

    @ElementCollection
    @CollectionTable(name = "student_certifications", joinColumns = @JoinColumn(name = "student_profile_id"))
    @Column(name = "certification")
    private List<String> certifications = new ArrayList<>();

    @ElementCollection
    @CollectionTable(name = "student_projects", joinColumns = @JoinColumn(name = "student_profile_id"))
    @Column(name = "project")
    private List<String> projects = new ArrayList<>();

    @ElementCollection
    @CollectionTable(name = "student_work_experience", joinColumns = @JoinColumn(name = "student_profile_id"))
    @Column(name = "work_experience_entry")
    private List<String> workExperience = new ArrayList<>();

    @Column(name = "resume_url")
    private String resumeUrl;

    @Column(name = "photo_url")
    private String photoUrl;
}


