package com.backend.movierental.controller;

import com.backend.movierental.services.RentalService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/rentals")
public class RentalController {

    @Autowired
    private RentalService service;

    @PostMapping("/rent/{customerID}/{movieID}")
    public ResponseEntity<?> rentMovie(@PathVariable int customerID, @PathVariable int movieID) {

        boolean ok = service.rentMovie(customerID, movieID);

        if (!ok) {
            return ResponseEntity.status(400).body("Movie unavailable or not found");
        }

        return ResponseEntity.ok("Movie rented");
    }

    @PostMapping("/{rentalID}/return")
    public ResponseEntity<?> returnRental(@PathVariable int rentalID) {

        boolean ok = service.returnMovie(rentalID);
        if (!ok) return ResponseEntity.status(400).body("Cannot return rental");

        return ResponseEntity.ok("Return processed");
    }

    @GetMapping("/user/{customerID}")
    public ResponseEntity<?> getRentedMovies(@PathVariable int customerID) {
        return ResponseEntity.ok(service.getRentalsByUser(customerID));
    }

}
