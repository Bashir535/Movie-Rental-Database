package com.backend.movierental.controller;

import com.backend.movierental.models.Movie;
import com.backend.movierental.services.RentalService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/rentals")
public class RentalController {

    @Autowired
    private RentalService rentalService;

   
    public static class RentRequest {
        public int customerID;
        public int movieID;
    }

    @PostMapping("/rent")
    public ResponseEntity<?> rentMovie(@RequestBody RentRequest req) {
        boolean success = rentalService.rentMovie(req.customerID, req.movieID);

        if (!success) {
            return ResponseEntity
                    .badRequest()
                    .body("Movie does not exist or is out of stock.");
        }

        return ResponseEntity.ok("Movie rented successfully.");
    }
        @GetMapping("/user/{customerID}")
    public ResponseEntity<List<Movie>> getUserRentedMovies(@PathVariable int customerID) {
        List<Movie> movies = rentalService.getMoviesRentedByUser(customerID);
        return ResponseEntity.ok(movies);
    }
}
