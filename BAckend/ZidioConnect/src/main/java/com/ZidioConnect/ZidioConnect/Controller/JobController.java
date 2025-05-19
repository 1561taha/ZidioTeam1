package com.ZidioConnect.ZidioConnect.Controller;

import com.ZidioConnect.ZidioConnect.Model.Job;
import com.ZidioConnect.ZidioConnect.Model.JobDto;
import com.ZidioConnect.ZidioConnect.Service.JobService;
import jakarta.validation.Valid;
import org.springframework.aot.generate.GeneratedTypeReference;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("manage/job")
public class JobController {
    @Autowired
    private JobService jobService;

    @PostMapping
    public ResponseEntity<?> createJob(@Valid @RequestBody JobDto jobDto) {
        // Logic to create a job
        return jobService.createJob(jobDto);

    }
    @GetMapping("/all")
    public ResponseEntity<List<Job>> getJob() {
        return jobService.findallJobs();
    }

    @PutMapping("/{jobId}")
    public ResponseEntity<?> updateJob(@PathVariable Long jobId, @RequestBody JobDto updates) {
        Job updatedJob = jobService.updateJob(jobId, updates);
        return ResponseEntity.ok(updatedJob);
    }

    @GetMapping("/{jobId}")
    public ResponseEntity<Job> getJobById(@PathVariable Long jobId) {
        Job job = jobService.getJobById(jobId);
        return ResponseEntity.ok(job);
    }

    @DeleteMapping("/{jobId}")
    public ResponseEntity<?> deleteJob(@PathVariable Long jobId) {
        jobService.deleteJob(jobId);
        return ResponseEntity.ok("Job deleted successfully");
    }

}
