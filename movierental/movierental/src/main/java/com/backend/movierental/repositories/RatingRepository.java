package com.backend.movierental.repositories;

import com.backend.movierental.payloadDTOs.RatingCreateDTO;
import com.backend.movierental.payloadDTOs.RatingResponseDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public class RatingRepository {
    @Autowired
    private JdbcTemplate jdbc;

    public int createRating(RatingCreateDTO dto) {
        String sql = """
            INSERT INTO Ratings (movieID, customerID, score, comment, ratingDate)
            VALUES (?, ?, ?, ?, ?)
        """;

        return jdbc.update(sql,
                dto.getMovieID(),
                dto.getCustomerID(),
                dto.getScore(),
                dto.getComment(),
                LocalDateTime.now());
    }

    public List<RatingResponseDTO> getRatingsForMovie(int movieID) {
        String sql = """
            SELECT ratingID, movieID, customerID, score, comment, ratingDate
            FROM Ratings
            WHERE movieID = ?
            ORDER BY ratingDate DESC
        """;

        return jdbc.query(sql, (rs, row) ->
                new RatingResponseDTO(
                        rs.getInt("ratingID"),
                        rs.getInt("movieID"),
                        rs.getInt("customerID"),
                        rs.getInt("score"),
                        rs.getString("comment"),
                        rs.getTimestamp("ratingDate").toLocalDateTime()
                ), movieID);
    }
}
