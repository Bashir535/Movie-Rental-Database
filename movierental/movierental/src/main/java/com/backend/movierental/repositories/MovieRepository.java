package com.backend.movierental.repositories;

import com.backend.movierental.models.Movie;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class MovieRepository {

    @Autowired
    private JdbcTemplate jdbc;

    public int createMovie(Movie movie) {
        String sql = """
                    INSERT INTO Movies (title, genre, releaseYear, stock, rentalRate, image)
                    VALUES (?, ?, ?, ?, ?, ?)
                """;

        return jdbc.update(sql,
                movie.getTitle(),
                movie.getGenre(),
                movie.getReleaseYear(),
                movie.getStock(),
                movie.getRentalRate(),
                movie.getImage());
    }

    public Movie getMovieById(int id) {
        String sql = """
            SELECT movieID, title, genre, releaseYear, stock, rentalRate
            FROM Movies
            WHERE movieID = ?
        """;

        List<Movie> result = jdbc.query(sql, (rs, rowNum) -> {
            Movie mv = new Movie();
            mv.setMovieID(rs.getInt("movieID"));
            mv.setTitle(rs.getString("title"));
            mv.setGenre(rs.getString("genre"));
            mv.setReleaseYear(rs.getInt("releaseYear"));
            mv.setStock(rs.getInt("stock"));
            mv.setRentalRate(rs.getDouble("rentalRate"));
            return mv;
        }, id);

        return result.isEmpty() ? null : result.get(0);
    }

    public byte[] getMovieImage(int id) {
        String sql = "SELECT image FROM Movies WHERE movieID = ?";

        List<byte[]> result = jdbc.query(sql, (rs, rowNum) -> rs.getBytes("image"), id);
        return result.isEmpty() ? null : result.get(0);
    }

    public int decreaseStock(int movieID) {
        String sql = """
        UPDATE Movies
        SET stock = stock - 1
        WHERE movieID = ? AND stock > 0
        """;
        return jdbc.update(sql, movieID);
    }

    public List<Movie> getAllMovies() {
        String sql = """
        SELECT movieID, title, genre, releaseYear, stock, rentalRate
        FROM Movies
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
        });
    }

    public List<Movie> getMoviesRentedByUser(int customerID) {
        String sql = """
        SELECT m.movieID, m.title, m.genre, m.releaseYear, m.stock, m.rentalRate
        FROM Rentals r
        JOIN Movies m ON r.movieID = m.movieID
        WHERE r.customerID = ?
        ORDER BY r.rentalDate DESC
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

    public int deleteMovie(int movieID) {
        String sql = "DELETE FROM Movies WHERE movieID = ?";
        return jdbc.update(sql, movieID);
    }
}
