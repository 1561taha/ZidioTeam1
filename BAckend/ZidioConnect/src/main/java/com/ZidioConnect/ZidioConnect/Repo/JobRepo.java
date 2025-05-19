package com.ZidioConnect.ZidioConnect.Repo;

import com.ZidioConnect.ZidioConnect.Model.Job;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface JobRepo extends JpaRepository<Job, Long>{

    List<Job> findByTitleContainingOrDescriptionContainingOrSkillsIn(String title, String description, List<String> skills);

    List<Job> findByPostedby(String postedby);

}
