package com.backend.movierental.payloadDTOs;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
public class RatingResponseDTO {
    private int ratingID;
    private int movieID;
    private int customerID;
    private String customerName;
    private int score;
    private String comment;
    private LocalDateTime ratingDate;
}
