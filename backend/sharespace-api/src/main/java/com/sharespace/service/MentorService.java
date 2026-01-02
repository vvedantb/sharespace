package com.sharespace.service;

import com.sharespace.dto.CreateMentorRequest;
import com.sharespace.dto.MentorDto;
import com.sharespace.model.MentorProfile;
import com.sharespace.model.User;
import com.sharespace.repository.MentorProfileRepository;
import com.sharespace.repository.ReviewRepository;
import com.sharespace.repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;
import java.util.List;
import java.util.UUID;

@Service
public class MentorService {

    private final MentorProfileRepository mentorProfileRepository;
    private final UserRepository userRepository;
    private final ReviewRepository reviewRepository;

    public MentorService(MentorProfileRepository mentorProfileRepository, UserRepository userRepository,
                         ReviewRepository reviewRepository) {
        this.mentorProfileRepository = mentorProfileRepository;
        this.userRepository = userRepository;
        this.reviewRepository = reviewRepository;
    }

    public List<MentorDto> getMentors(String search) {
        List<MentorProfile> mentors = search != null && !search.isBlank()
            ? mentorProfileRepository.searchMentors(search)
            : mentorProfileRepository.findAll();

        return mentors.stream().map(this::toDto).toList();
    }

    public MentorDto getMentor(UUID id) {
        MentorProfile mentor = mentorProfileRepository.findById(id)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Mentor not found"));
        return toDto(mentor);
    }

    public MentorDto getMentorByUserId(UUID userId) {
        MentorProfile mentor = mentorProfileRepository.findByUserId(userId)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Mentor profile not found"));
        return toDto(mentor);
    }

    @Transactional
    public MentorDto createMentor(UUID userId, CreateMentorRequest request) {
        if (mentorProfileRepository.existsByUserId(userId)) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Mentor profile already exists");
        }

        User user = userRepository.findById(userId)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));

        MentorProfile mentor = new MentorProfile();
        mentor.setUser(user);
        mentor.setBio(request.bio());
        mentor.setExpertise(request.expertise() != null ? request.expertise() : List.of());

        MentorProfile saved = mentorProfileRepository.save(mentor);
        return toDto(saved);
    }

    @Transactional
    public MentorDto updateMentor(UUID id, UUID userId, CreateMentorRequest request) {
        MentorProfile mentor = mentorProfileRepository.findById(id)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Mentor not found"));

        if (!mentor.getUser().getId().equals(userId)) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Not authorized");
        }

        if (request.bio() != null) mentor.setBio(request.bio());
        if (request.expertise() != null) mentor.setExpertise(request.expertise());

        MentorProfile saved = mentorProfileRepository.save(mentor);
        return toDto(saved);
    }

    private MentorDto toDto(MentorProfile mentor) {
        Double rating = reviewRepository.getAverageRatingForUser(mentor.getUser().getId());
        return MentorDto.from(mentor, rating);
    }
}
