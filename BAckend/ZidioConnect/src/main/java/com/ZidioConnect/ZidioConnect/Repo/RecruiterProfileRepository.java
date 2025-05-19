package com.ZidioConnect.ZidioConnect.Repo;

import com.ZidioConnect.ZidioConnect.Model.RecruiterProfile;
import com.ZidioConnect.ZidioConnect.Model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RecruiterProfileRepository extends JpaRepository<RecruiterProfile, Long> {
    Optional<RecruiterProfile> findByUser(User user);

    User findByUsername(String username);
}
