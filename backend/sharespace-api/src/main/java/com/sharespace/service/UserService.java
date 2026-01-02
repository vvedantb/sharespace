package com.sharespace.service;

import com.sharespace.dto.CreateUserRequest;
import com.sharespace.dto.UpdateUserRequest;
import com.sharespace.dto.UserDto;
import com.sharespace.model.User;
import com.sharespace.model.enums.ItemStatus;
import com.sharespace.repository.ItemRepository;
import com.sharespace.repository.MentorProfileRepository;
import com.sharespace.repository.ReviewRepository;
import com.sharespace.repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;
import java.util.UUID;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final MentorProfileRepository mentorProfileRepository;
    private final ReviewRepository reviewRepository;
    private final ItemRepository itemRepository;

    public UserService(UserRepository userRepository, MentorProfileRepository mentorProfileRepository,
                       ReviewRepository reviewRepository, ItemRepository itemRepository) {
        this.userRepository = userRepository;
        this.mentorProfileRepository = mentorProfileRepository;
        this.reviewRepository = reviewRepository;
        this.itemRepository = itemRepository;
    }

    public UserDto getUser(UUID id) {
        User user = userRepository.findById(id)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));
        return toDto(user);
    }

    public UserDto getUserByCognitoId(String cognitoId) {
        User user = userRepository.findByCognitoId(cognitoId)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));
        return toDto(user);
    }

    @Transactional
    public UserDto createUser(CreateUserRequest request) {
        if (userRepository.existsByEmail(request.email())) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Email already exists");
        }

        User user = new User();
        user.setCognitoId(request.cognitoId());
        user.setEmail(request.email());
        user.setFirstName(request.firstName());
        user.setLastName(request.lastName());
        user.setUniversity(request.university());

        User saved = userRepository.save(user);
        return toDto(saved);
    }

    @Transactional
    public UserDto updateUser(UUID id, UpdateUserRequest request) {
        User user = userRepository.findById(id)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));

        if (request.firstName() != null) user.setFirstName(request.firstName());
        if (request.lastName() != null) user.setLastName(request.lastName());
        if (request.username() != null) {
            if (userRepository.existsByUsername(request.username()) &&
                (user.getUsername() == null || !user.getUsername().equals(request.username()))) {
                throw new ResponseStatusException(HttpStatus.CONFLICT, "Username already exists");
            }
            user.setUsername(request.username());
        }
        if (request.university() != null) user.setUniversity(request.university());
        if (request.course() != null) user.setCourse(request.course());
        if (request.yearOfStudy() != null) user.setYearOfStudy(request.yearOfStudy());
        if (request.bio() != null) user.setBio(request.bio());

        User saved = userRepository.save(user);
        return toDto(saved);
    }

    private UserDto toDto(User user) {
        boolean isMentor = mentorProfileRepository.existsByUserId(user.getId());
        Double rating = reviewRepository.getAverageRatingForUser(user.getId());
        long itemsListed = itemRepository.countBySellerIdAndStatus(user.getId(), ItemStatus.ACTIVE);
        long itemsSold = itemRepository.countBySellerIdAndStatus(user.getId(), ItemStatus.SOLD);
        return UserDto.from(user, isMentor, rating, itemsListed, itemsSold);
    }
}
