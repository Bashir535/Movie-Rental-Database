package com.backend.movierental.controller;

import com.backend.movierental.models.Review;
import com.backend.movierental.services.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/movies/{movieId}/reviews")
public class ReviewController {

    @Autowired
    private ReviewService reviewService;

    
    public static class CreateReviewRequest {
        public int customerID;
        public int rating;
        public String comment;
    }

    @PostMapping
    public ResponseEntity<?> addReview(
            @PathVariable int movieId,
            @RequestBody CreateReviewRequest req
    ) {
        if (req.rating < 1 || req.rating > 5) {
            return ResponseEntity.badRequest().body("Rating must be between 1 and 5.");
        }

        Review review = new Review();
        review.setCustomerID(req.customerID);
        review.setMovieID(movieId);
        review.setRating(req.rating);
        review.setComment(req.comment);

        reviewService.addReview(review);

        return ResponseEntity.ok("Review added successfully.");
    }

    @GetMapping
    public ResponseEntity<List<Review>> getReviews(@PathVariable int movieId) {
        List<Review> reviews = reviewService.getReviewsForMovie(movieId);
        return ResponseEntity.ok(reviews);
    }
}
