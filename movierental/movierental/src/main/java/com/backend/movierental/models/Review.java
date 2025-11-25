package com.backend.movierental.models;

import lombok.Data;

@Data
public class Review {
    private Integer reviewID;
    private Integer customerID;
    private Integer movieID;
    private int rating;       
    private String comment;  
}
