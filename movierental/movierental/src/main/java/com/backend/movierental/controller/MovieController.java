package com.backend.movierental.controller;

import com.backend.movierental.models.Movie;
import com.backend.movierental.services.MovieService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.util.List;

@RestController
@RequestMapping("/api/movies")
public class MovieController {

    @Autowired
    private MovieService service;

    @GetMapping("/{id}")
    public ResponseEntity<?> getMovie(@PathVariable int id) {
        Movie movie = service.getMovieById(id);
        if (movie == null) {
            return ResponseEntity.status(404).body("Movie not found");
        }
        return ResponseEntity.ok(movie);
    }

    @GetMapping("/{id}/image")
    public ResponseEntity<byte[]> getMovieImage(@PathVariable int id) {
        byte[] img = service.getMovieImage(id);
        return ResponseEntity.ok()
                .contentType(MediaType.IMAGE_JPEG)
                .body(img);
    }

    @PostMapping(value = "/create", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> createMovie(
            @RequestParam("title") String title,
            @RequestParam("genre") String genre,
            @RequestParam("releaseYear") int releaseYear,
            @RequestParam("stock") int stock,
            @RequestParam("rentalRate") double rentalRate,
            @RequestParam(value = "image", required = false) MultipartFile image
    ) {
        Movie movie = new Movie();
        movie.setTitle(title);
        movie.setGenre(genre);
        movie.setReleaseYear(releaseYear);
        movie.setStock(stock);
        movie.setRentalRate(rentalRate);

        try {
            if (image != null && !image.isEmpty()) {
                movie.setImage(image.getBytes());
            }
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Image upload failed");
        }

        service.createMovie(movie);

        return ResponseEntity.ok("Movie created");
    }
}
