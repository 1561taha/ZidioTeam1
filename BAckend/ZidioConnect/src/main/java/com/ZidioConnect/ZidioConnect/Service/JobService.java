package com.ZidioConnect.ZidioConnect.Service;

import com.ZidioConnect.ZidioConnect.Model.Job;
import com.ZidioConnect.ZidioConnect.Model.JobDto;
import com.ZidioConnect.ZidioConnect.Model.User;
import com.ZidioConnect.ZidioConnect.Repo.JobRepo;
import com.ZidioConnect.ZidioConnect.Repo.RecruiterProfileRepository;
import com.ZidioConnect.ZidioConnect.Repo.UserRepo;
import jakarta.persistence.EntityNotFoundException;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class JobService {
    @Autowired
    private JobRepo jobRepo;
    @Autowired
    private RecruiterProfileRepository recruiterProfileRepository;
    @Autowired
    private UserRepo userRepo;

    public String getcurrentname (){
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepo.findByUsername(username);
        String name = recruiterProfileRepository.findByUser(user)
                .map(profile -> profile.getFullName())
                .orElseThrow(() -> new RuntimeException("Recruiter profile not found"));
        return name;
    }
    public ResponseEntity<?> createJob(@Valid JobDto jobDto) {
        String name = getcurrentname();


        Job job = new Job();
        job.setTitle(jobDto.getTitle());
        job.setDescription(jobDto.getDescription());
        job.setLocation(jobDto.getLocation());
        job.setCompanyName(jobDto.getCompanyName());
        job.setSalaryRange(jobDto.getSalary());
        job.setJobType(jobDto.getJobType());
        job.setExperienceLevel(jobDto.getExperienceLevel());
        job.setSkills(jobDto.getSkills());
        job.setQualifications(jobDto.getQualifications());
        job.setStartDate(jobDto.getStartDate());
        job.setEndDate(jobDto.getEndDate());
        job.setOpenings(jobDto.getOpenings());
        job.setPostedby(name);



        return ResponseEntity.ok(jobRepo.save(job));
    }

    public ResponseEntity<List<Job>> findallJobs() {
        String name = getcurrentname();
        List <Job> jobs= jobRepo.findByPostedby(name);
        return ResponseEntity.ok(jobs);
    }

    public Job updateJob(Long jobId, JobDto updates) {
        // Fetch existing job
        Job existingJob = jobRepo.findById(jobId)
                .orElseThrow(() -> new EntityNotFoundException("Job not found with id: " + jobId));

        // Update fields
        if (updates.getTitle() != null) existingJob.setTitle(updates.getTitle());
        if (updates.getCompanyName() != null) existingJob.setCompanyName(updates.getCompanyName());
        if (updates.getDescription() != null) existingJob.setDescription(updates.getDescription());
        if (updates.getSkills() != null) existingJob.setSkills(updates.getSkills());
        if (updates.getLocation() != null) existingJob.setLocation(updates.getLocation());
        if (updates.getJobType() != null) existingJob.setJobType(updates.getJobType());
        if (updates.getSalary() != null) existingJob.setSalaryRange(updates.getSalary());
        if (updates.getQualifications() != null) existingJob.setQualifications(updates.getQualifications());
        if (updates.getExperienceLevel() != null) existingJob.setExperienceLevel(updates.getExperienceLevel());
        if (updates.getStartDate() != null) existingJob.setStartDate(updates.getStartDate());
        if (updates.getOpenings() != null) existingJob.setOpenings(updates.getOpenings());
        if (updates.getEndDate() != null) existingJob.setEndDate(updates.getEndDate());



        // Save updated job
        return jobRepo.save(existingJob);
    }


    public Job getJobById(Long jobId) {
        return jobRepo.findById(jobId)
                .orElseThrow(() -> new EntityNotFoundException("Job not found with id: " + jobId));
    }

    public void deleteJob(Long jobId) {
        if (!jobRepo.existsById(jobId)) {
            throw new EntityNotFoundException("Job not found with id: " + jobId);
        }
        jobRepo.deleteById(jobId);
    }
}
