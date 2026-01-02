package com.sharespace.model;

import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "mentor_profiles")
public class MentorProfile {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", unique = true, nullable = false)
    private User user;

    @Column(columnDefinition = "TEXT")
    private String bio;

    @ElementCollection
    @CollectionTable(name = "mentor_expertise", joinColumns = @JoinColumn(name = "mentor_id"))
    @Column(name = "expertise")
    private List<String> expertise = new ArrayList<>();

    private int endorsements;

    @Column(name = "total_answers")
    private int totalAnswers;

    @Column(name = "helpful_answers")
    private int helpfulAnswers;

    @Column(name = "is_verified")
    private boolean isVerified;

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getBio() {
        return bio;
    }

    public void setBio(String bio) {
        this.bio = bio;
    }

    public List<String> getExpertise() {
        return expertise;
    }

    public void setExpertise(List<String> expertise) {
        this.expertise = expertise;
    }

    public int getEndorsements() {
        return endorsements;
    }

    public void setEndorsements(int endorsements) {
        this.endorsements = endorsements;
    }

    public int getTotalAnswers() {
        return totalAnswers;
    }

    public void setTotalAnswers(int totalAnswers) {
        this.totalAnswers = totalAnswers;
    }

    public int getHelpfulAnswers() {
        return helpfulAnswers;
    }

    public void setHelpfulAnswers(int helpfulAnswers) {
        this.helpfulAnswers = helpfulAnswers;
    }

    public boolean isVerified() {
        return isVerified;
    }

    public void setVerified(boolean verified) {
        isVerified = verified;
    }
}
