package com.backend.movierental.payloadDTOs;

import lombok.Data;

@Data
public class RatingCreateDTO {
    private int movieID;
    private int customerID;
    private int score;
    private String comment;
}
