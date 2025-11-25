package com.backend.movierental.services;

import com.backend.movierental.models.Review;
import com.backend.movierental.repositories.ReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReviewService {

    @Autowired
    private ReviewRepository reviewRepo;

    public void addReview(Review review) {
        reviewRepo.addReview(review);
    }

    public List<Review> getReviewsForMovie(int movieID) {
        return reviewRepo.getReviewsByMovieId(movieID);
    }
}
