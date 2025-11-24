package com.backend.movierental.models;

import lombok.Data;

@Data
public class User {
    private Integer customerID;
    private String firstName;
    private String lastName;
    private String password;
    private String email;
    private boolean isAdmin;
}
