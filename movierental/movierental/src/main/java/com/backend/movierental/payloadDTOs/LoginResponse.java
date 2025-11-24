package com.backend.movierental.payloadDTOs;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class LoginResponse {
    private int customerID;
    private String firstName;
    private String lastName;
    private String email;
    private boolean isAdmin;
}
