package com.ZidioConnect.ZidioConnect.Model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "recruiter_profiles",
        uniqueConstraints = @UniqueConstraint(columnNames = "user_id"))
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RecruiterProfile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id", nullable = false, unique = true)
    private User user;

    private String fullName;
    private String title;

    @Column(nullable = false)
    private String companyName;

    private String companyDescription;

    private String website;
    private String contactNumber;
    private String photoUrl;
}
