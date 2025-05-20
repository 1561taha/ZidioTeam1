package com.ZidioConnect.ZidioConnect.Model;

import jakarta.validation.constraints.*;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

/**
 * Data Transfer Object for Job-related data with full field validation.
 */
@Data
public class JobDto {


    /** Title of the job (e.g., Software Engineer) */
    @NotBlank(message = "Title is mandatory")
    @Size(max = 255, message = "Title cannot exceed 255 characters")
    private String title;

    /** Name of the company offering the job */
    @NotBlank(message = "Company name is mandatory")
    @Size(max = 255, message = "Company name cannot exceed 255 characters")
    private String companyName;

    /** Detailed description of the job role and responsibilities */
    @NotBlank(message = "Description is mandatory")
    @Size(max = 2000, message = "Description cannot exceed 2000 characters")
    private String description;

    /** List of required or desired skills */
    @NotEmpty(message = "At least one skill must be specified")
    private List<@NotBlank(message = "Skill entries cannot be blank")
    @Size(max = 100, message = "Each skill cannot exceed 100 characters") String> skills;

    /** Job location (e.g., Remote, New York, etc.) */
    @NotBlank(message = "Location is mandatory")
    @Size(max = 255, message = "Location cannot exceed 255 characters")
    private String location;

    /** Type of job (e.g., Full-time, Part-time, Internship) */
    @NotBlank(message = "Job type is mandatory")
    private String jobType;

    /** Salary offered for the job */
    @NotNull(message = "Salary must be provided")
    @PositiveOrZero(message = "Salary must be zero or positive")
    private Long salary;

    /** Required qualifications (e.g., B.Tech, M.Sc.) */
    @NotEmpty(message = "At least one qualification must be specified")
    private List<@NotBlank(message = "Qualification entries cannot be blank")
    @Size(max = 100, message = "Each qualification cannot exceed 100 characters") String> qualifications;

    /** Required experience level (e.g., Entry, Mid, Senior) */
    @NotBlank(message = "Experience level is mandatory")
    private String experienceLevel;

    /** Start date for the job posting */
    @NotNull(message = "Start date must be provided")
    @FutureOrPresent(message = "Start date cannot be in the past")
    private LocalDateTime startDate;

    /** Number of available openings */
    @NotNull(message = "Number of openings must be provided")
    @Min(value = 1, message = "There must be at least one opening")
    private Integer openings;

    /** End date for the job posting */
    @NotNull(message = "End date must be provided")
    @Future(message = "End date must be in the future")
    private LocalDateTime endDate;

    /** Username or ID of the person who posted the job */
    @NotBlank(message = "Posted-by field is mandatory")
    @Size(max = 100, message = "Posted-by cannot exceed 100 characters")
    private String postedBy;

    /**
     * Cross-field validation: ensure endDate ≥ startDate.
     */
    @AssertTrue(message = "End date must be equal to or after start date")
    public boolean isValidDateRange() {
        if (startDate == null || endDate == null) {
            return true; // rely on @NotNull for null checks
        }
        return !endDate.isBefore(startDate);
    }

    // getters and setters...
}
