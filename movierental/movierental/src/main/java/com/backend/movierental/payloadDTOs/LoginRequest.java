package com.backend.movierental.payloadDTOs;

import lombok.Data;

@Data
public class LoginRequest {
    private String email;
    private String password;
}
