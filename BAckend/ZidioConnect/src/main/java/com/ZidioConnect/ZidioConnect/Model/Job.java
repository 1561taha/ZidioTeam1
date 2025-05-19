package com.ZidioConnect.ZidioConnect.Model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Job {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String companyName;

    @Column(nullable = false)
    private String description;

    @ElementCollection
    @CollectionTable(name = "job_skills", joinColumns = @JoinColumn(name = "job_id"))
    @Column(name = "skill" , nullable = false)
    private List<String> skills;

    @Column(nullable = false)
    private String location;
    @Column(nullable = false)
    private String jobType;
    @Column(nullable = false)
    private  Long salaryRange;

    @ElementCollection
    @CollectionTable(name = "job_qualifiications" ,joinColumns = @JoinColumn(name = "job_id"))
    @Column(name ="qualification" , nullable = false)
    private List<String> qualifications;
    @Column(nullable = false)
    private String experienceLevel;
    @Column(nullable = false)
    private LocalDateTime startDate;
    @Column(nullable = false)
    private Integer openings;
    @Column(nullable = false)
    private LocalDateTime endDate;

    private String postedby;



}
