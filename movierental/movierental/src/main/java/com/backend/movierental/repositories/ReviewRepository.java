package com.backend.movierental.repositories;

import com.backend.movierental.models.Review;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class ReviewRepository {

    @Autowired
    private JdbcTemplate jdbc;

    public int addReview(Review review) {
        String sql = """
                INSERT INTO Reviews (customerID, movieID, rating, comment)
                VALUES (?, ?, ?, ?)
                """;

        return jdbc.update(sql,
                review.getCustomerID(),
                review.getMovieID(),
                review.getRating(),
                review.getComment()
        );
    }

    public List<Review> getReviewsByMovieId(int movieID) {
        String sql = """
                SELECT reviewID, customerID, movieID, rating, comment
                FROM Reviews
                WHERE movieID = ?
                """;

        return jdbc.query(sql, (rs, rowNum) -> {
            Review r = new Review();
            r.setReviewID(rs.getInt("reviewID"));
            r.setCustomerID(rs.getInt("customerID"));
            r.setMovieID(rs.getInt("movieID"));
            r.setRating(rs.getInt("rating"));
            r.setComment(rs.getString("comment"));
            return r;
        }, movieID);
    }
}
