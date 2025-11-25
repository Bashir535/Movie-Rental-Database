package com.backend.movierental.repositories;

import com.backend.movierental.models.Rental;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.sql.Date;

@Repository
public class RentalRepository {

    @Autowired
    private JdbcTemplate jdbc;

    public int createRental(Rental rental) {
        String sql = """
                INSERT INTO Rentals (customerID, movieID, rentalDate, returnDate)
                VALUES (?, ?, ?, ?)
                """;

        return jdbc.update(sql,
                rental.getCustomerID(),
                rental.getMovieID(),
                rental.getRentalDate(),
                rental.getReturnDate()
        );
    }

    
}
