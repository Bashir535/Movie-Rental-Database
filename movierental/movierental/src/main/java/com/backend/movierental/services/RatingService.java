package com.backend.movierental.services;

import com.backend.movierental.payloadDTOs.RatingCreateDTO;
import com.backend.movierental.payloadDTOs.RatingResponseDTO;
import com.backend.movierental.repositories.RatingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RatingService {
    @Autowired
    private RatingRepository repo;

    public void createRating(RatingCreateDTO dto) {
        repo.createRating(dto);
    }

    public List<RatingResponseDTO> getMovieRatings(int movieID) {
        return repo.getRatingsForMovie(movieID);
    }
}
