package com.backend.movierental.configuration;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Random;

// Script for creating a minimum of 15 entries per table
// Includes a default admin user. email: admin@example.com, password: admin123
@Component
public class DatabaseSeeder implements CommandLineRunner {
    @Autowired
    private JdbcTemplate jdbc;

    private final Random random = new Random();

    @Override
    public void run(String... args) throws Exception {
        Integer userCount = jdbc.queryForObject("SELECT COUNT(*) FROM Users", Integer.class);
        if (userCount != null && userCount == 0) {
            seedUsers();
        }

        Integer movieCount = jdbc.queryForObject("SELECT COUNT(*) FROM Movies", Integer.class);
        if (movieCount != null && movieCount == 0) {
            seedMovies();
        }

        Integer rentalCount = jdbc.queryForObject("SELECT COUNT(*) FROM Rentals", Integer.class);
        if (rentalCount != null && rentalCount == 0) {
            seedRentals();
        }

        Integer ratingCount = jdbc.queryForObject("SELECT COUNT(*) FROM Ratings", Integer.class);
        if (ratingCount != null && ratingCount == 0) {
            seedRatings();
        }
    }

    private void seedUsers() {
        System.out.println("Seeding Users...");

        jdbc.update("""
                INSERT INTO Users (firstName, lastName, email, password, isAdmin)
                VALUES ('Admin', 'User', 'admin@example.com', 'admin123', true)
                """);

        for (int i = 1; i <= 15; i++) {
            jdbc.update("""
                INSERT INTO Users (firstName, lastName, email, password, isAdmin)
                VALUES (?, ?, ?, ?, false)
                """,
                    "User" + i,
                    "Test" + i,
                    "user" + i + "@example.com",
                    "password" + i
            );
        }
    }

    private void seedMovies() {
        System.out.println("Creating Movies");

        for (int i = 1; i <= 15; i++) {
            jdbc.update("""
                INSERT INTO Movies (title, genre, releaseYear, stock, rentalRate)
                VALUES (?, ?, ?, ?, ?)
                """,
                    "Movie " + i,
                    randomGenre(),
                    2000 + random.nextInt(25),
                    5 + random.nextInt(10),
                    1.99 + random.nextDouble() * 3
            );
        }
    }

    private void seedRentals() {
        System.out.println("Creating Rentals");

        List<Integer> userIDs = jdbc.query("SELECT customerID FROM Users", (rs, row) -> rs.getInt(1));
        List<Integer> movieIDs = jdbc.query("SELECT movieID FROM Movies", (rs, row) -> rs.getInt(1));

        LocalDateTime now = LocalDateTime.now();

        for (int i = 1; i <= 15; i++) {
            int user = userIDs.get(random.nextInt(userIDs.size()));
            int movie = movieIDs.get(random.nextInt(movieIDs.size()));

            LocalDateTime rentalDate = now.minusDays(random.nextInt(20));
            LocalDateTime dueDate = rentalDate.plusDays(3);
            LocalDateTime returnDate = random.nextBoolean()
                    ? rentalDate.plusDays(random.nextInt(7))
                    : null;

            String status;
            if (returnDate == null) {
                status = "RENTED";
            } else if (returnDate.isAfter(dueDate)) {
                status = "LATE";
            } else {
                status = "RETURNED";
            }

            jdbc.update("""
                INSERT INTO Rentals (movieID, customerID, rentalDate, dueDate, returnDate, status)
                VALUES (?, ?, ?, ?, ?, ?)
                """,
                    movie,
                    user,
                    rentalDate,
                    dueDate,
                    returnDate,
                    status
            );
        }
    }

    private void seedRatings() {
        System.out.println("Creating Ratings");

        List<Integer> userIDs = jdbc.query("SELECT customerID FROM Users", (rs, row) -> rs.getInt(1));
        List<Integer> movieIDs = jdbc.query("SELECT movieID FROM Movies", (rs, row) -> rs.getInt(1));

        LocalDateTime now = LocalDateTime.now();

        for (int i = 1; i <= 15; i++) {
            int user = userIDs.get(random.nextInt(userIDs.size()));
            int movie = movieIDs.get(random.nextInt(movieIDs.size()));
            int score = 1 + random.nextInt(5);

            jdbc.update("""
                INSERT INTO Ratings (movieID, customerID, score, comment, ratingDate)
                VALUES (?, ?, ?, ?, ?)
                """,
                    movie,
                    user,
                    score,
                    "Sample review " + i + " (score " + score + ")",
                    now.minusDays(random.nextInt(20))
            );
        }
    }

    private String randomGenre() {
        String[] genres = {"Action", "Drama", "Comedy", "Sci-Fi", "Horror", "Romance"};
        return genres[random.nextInt(genres.length)];
    }
}
