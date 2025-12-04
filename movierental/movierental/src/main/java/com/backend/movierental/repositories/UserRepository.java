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

    public int deleteUser(int id) {
        String sql = "DELETE FROM Users WHERE customerID = ?";
        return jdbc.update(sql, id);
    }

    public String getUserNameById(int id) {
        String sql = "SELECT firstName FROM Users WHERE customerID = ?";
        return jdbc.queryForObject(sql, String.class, id);
    }

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
