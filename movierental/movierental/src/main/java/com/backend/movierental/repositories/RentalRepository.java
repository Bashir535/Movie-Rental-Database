package com.backend.movierental.repositories;

import com.backend.movierental.models.Rental;
import com.backend.movierental.payloadDTOs.UserRentalDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.List;

@Repository
public class RentalRepository {

    @Autowired
    private JdbcTemplate jdbc;

    public int createRental(Rental r) {
        String sql = """
            INSERT INTO Rentals (movieID, customerID, rentalDate, dueDate, returnDate, status)
            VALUES (?, ?, ?, ?, ?, ?)
        """;
        // return date starts off as null when rented
        return jdbc.update(sql,
                r.getMovieID(),
                r.getCustomerID(),
                Timestamp.valueOf(r.getRentalDate()),
                Timestamp.valueOf(r.getDueDate()),
                null,
                r.getStatus()
        );
    }

    public Rental getRentalById(int rentalID) {
        String sql = """
        SELECT rentalID, movieID, customerID, rentalDate, dueDate, returnDate, status
        FROM Rentals
        WHERE rentalID = ?
        """;

        List<Rental> list = jdbc.query(sql, (rs, rowNum) -> {
            Rental r = new Rental();
            r.setRentalID(rs.getInt("rentalID"));
            r.setMovieID(rs.getInt("movieID"));
            r.setCustomerID(rs.getInt("customerID"));
            r.setRentalDate(rs.getTimestamp("rentalDate").toLocalDateTime());
            r.setDueDate(rs.getTimestamp("dueDate").toLocalDateTime());
            Timestamp ret = rs.getTimestamp("returnDate");
            r.setReturnDate(ret == null ? null : ret.toLocalDateTime());
            r.setStatus(rs.getString("status"));
            return r;
        }, rentalID);

        return list.isEmpty() ? null : list.get(0);
    }

    public int completeReturn(int rentalID, LocalDateTime returnDate, String status) {
        String sql = """
        UPDATE Rentals
        SET returnDate = ?, status = ?
        WHERE rentalID = ?
    """;
        return jdbc.update(sql, returnDate, status, rentalID);
    }

    public int increaseStock(int movieID) {
        String sql = "UPDATE Movies SET stock = stock + 1 WHERE movieID = ?";
        return jdbc.update(sql, movieID);
    }

    public List<UserRentalDTO> getRentalsByUser(int customerID) {
        String sql = """
        SELECT 
            r.rentalID,
            r.movieID,
            m.title,
            r.rentalDate,
            r.dueDate,
            r.returnDate,
            r.status
        FROM Rentals r
        JOIN Movies m ON r.movieID = m.movieID
        WHERE r.customerID = ?
        ORDER BY r.rentalDate DESC
    """;

        return jdbc.query(sql, (rs, row) -> {
            Timestamp ret = rs.getTimestamp("returnDate");

            return new UserRentalDTO(
                    rs.getInt("rentalID"),
                    rs.getInt("movieID"),
                    rs.getString("title"),
                    rs.getTimestamp("rentalDate").toLocalDateTime(),
                    rs.getTimestamp("dueDate").toLocalDateTime(),
                    ret == null ? null : ret.toLocalDateTime(),
                    rs.getString("status")
            );
        }, customerID);
    }


}
