package com.backend.movierental.repositories;

import com.backend.movierental.models.User;
import com.backend.movierental.payloadDTOs.LoginResponse;
import com.backend.movierental.payloadDTOs.UserUpdateDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class UserRepository {

    @Autowired
    private JdbcTemplate jdbc;

    // Insert a new user record using raw SQL parameters
    public int createUser(User user) {
        String sql = """
        INSERT INTO Users (firstName, lastName, email, password, isAdmin)
        VALUES (?, ?, ?, ?, ?)
    """;

        return jdbc.update(sql,
                user.getFirstName(),
                user.getLastName(),
                user.getEmail(),
                user.getPassword(),
                user.isAdmin());
    }

    // Remove a user by primary key.
    public int deleteUser(int id) {
        String sql = "DELETE FROM Users WHERE customerID = ?";
        return jdbc.update(sql, id);
    }

    // Fetch only the user's first name using a single column query.
    public String getUserNameById(int id) {
        String sql = "SELECT firstName FROM Users WHERE customerID = ?";
        return jdbc.queryForObject(sql, String.class, id);
    }

    // Validate credentials and return essential user details for login.
    public LoginResponse getUserDetails(String email, String password) {
        String sql = """
        SELECT customerID, firstName, lastName, email, isAdmin
        FROM Users
        WHERE email = ? AND password = ?
        LIMIT 1
        """;

        return jdbc.queryForObject(sql, (rs, rowNum) ->
                        new LoginResponse(
                                rs.getInt("customerID"),
                                rs.getString("firstName"),
                                rs.getString("lastName"),
                                rs.getString("email"),
                                rs.getBoolean("isAdmin")
                        ),
                email, password);
    }

    // Update editable profile fields for an existing user.
    public int updateUser(int customerID, UserUpdateDTO dto) {
        String sql = """
        UPDATE Users
        SET firstName = ?, lastName = ?, email = ?
        WHERE customerID = ?
    """;

        return jdbc.update(sql,
                dto.getFirstName(),
                dto.getLastName(),
                dto.getEmail(),
                customerID);
    }

}
