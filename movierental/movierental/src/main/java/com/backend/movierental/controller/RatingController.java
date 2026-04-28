package com.backend.movierental.controller;

import com.backend.movierental.payloadDTOs.RatingCreateDTO;
import com.backend.movierental.services.RatingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

// API endpoints that backend touches
@RestController
@RequestMapping("/api/ratings")
public class RatingController {

    @Autowired
    private RatingService service;

    @PostMapping("/create")
    public ResponseEntity<?> create(@RequestBody RatingCreateDTO dto) {
        service.createRating(dto);
        return ResponseEntity.ok("Rating submitted");
    }

    @GetMapping("/movie/{movieID}")
    public ResponseEntity<?> getForMovie(@PathVariable int movieID) {
        return ResponseEntity.ok(service.getMovieRatings(movieID));
    }
}
