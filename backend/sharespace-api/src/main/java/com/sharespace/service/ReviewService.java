package com.sharespace.service;

import com.sharespace.dto.CreateReviewRequest;
import com.sharespace.dto.ReviewDto;
import com.sharespace.model.Item;
import com.sharespace.model.Review;
import com.sharespace.model.User;
import com.sharespace.repository.ItemRepository;
import com.sharespace.repository.ReviewRepository;
import com.sharespace.repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;
import java.util.List;
import java.util.UUID;

@Service
public class ReviewService {

    private final ReviewRepository reviewRepository;
    private final UserRepository userRepository;
    private final ItemRepository itemRepository;

    public ReviewService(ReviewRepository reviewRepository, UserRepository userRepository,
                         ItemRepository itemRepository) {
        this.reviewRepository = reviewRepository;
        this.userRepository = userRepository;
        this.itemRepository = itemRepository;
    }

    public List<ReviewDto> getReviewsForUser(UUID userId) {
        return reviewRepository.findByRevieweeIdOrderByCreatedAtDesc(userId).stream()
            .map(ReviewDto::from)
            .toList();
    }

    @Transactional
    public ReviewDto createReview(UUID revieweeId, UUID reviewerId, CreateReviewRequest request) {
        if (revieweeId.equals(reviewerId)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Cannot review yourself");
        }

        User reviewer = userRepository.findById(reviewerId)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Reviewer not found"));
        User reviewee = userRepository.findById(revieweeId)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));

        Review review = new Review();
        review.setReviewer(reviewer);
        review.setReviewee(reviewee);
        review.setRating(request.rating());
        review.setComment(request.comment());

        if (request.itemId() != null) {
            Item item = itemRepository.findById(UUID.fromString(request.itemId()))
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Item not found"));
            review.setItem(item);
        }

        Review saved = reviewRepository.save(review);
        return ReviewDto.from(saved);
    }
}
