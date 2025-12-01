package com.backend.movierental.services;

import com.backend.movierental.models.Movie;
import com.backend.movierental.models.Rental;
import com.backend.movierental.repositories.MovieRepository;
import com.backend.movierental.repositories.RentalRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

import java.sql.Date;

@Service
public class RentalService {

    @Autowired
    private RentalRepository rentalRepo;

    @Autowired
    private MovieRepository movieRepo;

    public boolean rentMovie(int customerID, int movieID) {
        
        Movie movie = movieRepo.getMovieById(movieID);
        if (movie == null || movie.getStock() <= 0) {
            return false;
        }

       
        Rental rental = new Rental();
        rental.setCustomerID(customerID);
        rental.setMovieID(movieID);
        rental.setRentalDate(new Date(System.currentTimeMillis()));
        rental.setReturnDate(null);

        rentalRepo.createRental(rental);

        
        movieRepo.decreaseStock(movieID);

        return true;
    }
    
        public java.util.List<Movie> getMoviesRentedByUser(int customerID) {
        return rentalRepo.getMoviesRentedByCustomer(customerID);
    }
}
