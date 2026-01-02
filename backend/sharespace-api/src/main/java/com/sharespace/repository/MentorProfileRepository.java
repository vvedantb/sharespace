package com.sharespace.repository;

import com.sharespace.model.MentorProfile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface MentorProfileRepository extends JpaRepository<MentorProfile, UUID> {
    Optional<MentorProfile> findByUserId(UUID userId);
    boolean existsByUserId(UUID userId);

    @Query("SELECT m FROM MentorProfile m JOIN m.user u WHERE " +
           "LOWER(u.firstName) LIKE LOWER(CONCAT('%', :search, '%')) OR " +
           "LOWER(u.lastName) LIKE LOWER(CONCAT('%', :search, '%')) OR " +
           "LOWER(m.bio) LIKE LOWER(CONCAT('%', :search, '%'))")
    List<MentorProfile> searchMentors(@Param("search") String search);
}
