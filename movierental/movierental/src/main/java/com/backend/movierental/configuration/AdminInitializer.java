package com.backend.movierental.configuration;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

@Component
public class AdminInitializer implements CommandLineRunner {
    @Autowired
    private JdbcTemplate jdbc;

    @Override
    public void run(String... args) throws Exception {

        String checkSql = """
            SELECT COUNT(*) 
            FROM Users 
            WHERE email = 'admin@example.com'
            """;

        Integer count = jdbc.queryForObject(checkSql, Integer.class);

        if (count != null && count == 0) {
            String insertSql = """
                INSERT INTO Users (firstName, lastName, email, password, isAdmin)
                VALUES (?, ?, ?, ?, ?)
            """;

            jdbc.update(insertSql,
                    "Admin",
                    "User",
                    "admin@example.com",
                    "admin123",    // store hashed if you implement hashing later
                    true
            );

            System.out.println("Admin user created.");
        } else {
            System.out.println("Admin user already exists. Skipping creation.");
        }
    }
}
