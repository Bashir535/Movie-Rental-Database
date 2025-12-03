package com.backend.movierental.repositories;

import com.backend.movierental.models.Movie;
import com.backend.movierental.models.Rental;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import java.util.List;

import java.sql.Date;

@Repository
public class RentalRepository {

    @Autowired
    private JdbcTemplate jdbc;

    public int createRental(Rental rental) {
        String sql = """
                INSERT INTO Rentals (customerID, movieID, rentalDate, dueDate, returnDate, status)
                VALUES (?, ?, ?, ?, ?, ?)
                """;

        return jdbc.update(sql,
                rental.getCustomerID(),
                rental.getMovieID(),
                rental.getRentalDate(),
                rental.getDueDate(),
                rental.getReturnDate(),
                rental.getStatus()
        );
    }



    public List<Movie> getMoviesRentedByCustomer(int customerID) {
        String sql = """
            SELECT m.movieID, m.title, m.genre, m.releaseYear, m.stock, m.rentalRate
            FROM Rentals r
            JOIN Movies m ON r.movieID = m.movieID
            WHERE r.customerID = ?
        """;

        return jdbc.query(sql, (rs, rowNum) -> {
            Movie mv = new Movie();
            mv.setMovieID(rs.getInt("movieID"));
            mv.setTitle(rs.getString("title"));
            mv.setGenre(rs.getString("genre"));
            mv.setReleaseYear(rs.getInt("releaseYear"));
            mv.setStock(rs.getInt("stock"));
            mv.setRentalRate(rs.getDouble("rentalRate"));
            
            return mv;
        }, customerID);
    }

    
}
