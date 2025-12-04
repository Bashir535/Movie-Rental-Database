package com.backend.movierental.services;

import com.backend.movierental.models.User;
import com.backend.movierental.payloadDTOs.LoginResponse;
import com.backend.movierental.payloadDTOs.UserUpdateDTO;
import com.backend.movierental.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

// Business layer that abstracts the JDBC layer

@Service
public class UserService {

    @Autowired
    private UserRepository repo;

    public UserService(UserRepository repo) {
        this.repo = repo;
    }

    public void createUser(User user) {
        repo.createUser(user);
    }

    public void deleteUser(int id) {
        repo.deleteUser(id);
    }

    public String getUserName(int id) {
        return repo.getUserNameById(id);
    }

    // Combination of authenticating user and returning user details to the frontend
    public LoginResponse loginAndFetch(String email, String password) {

        try {
            return repo.getUserDetails(email, password);
        } catch (Exception e) {
            return null;
        }
    }

    // Service used for updating user profile feature
    public void updateUser(int customerID, UserUpdateDTO dto) {
        repo.updateUser(customerID, dto);
    }
}
