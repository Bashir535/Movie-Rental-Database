package com.backend.movierental.models;

import lombok.Data;

import java.sql.Date;

@Data
public class Rental {
    private Integer rentalID;
    private Integer customerID;
    private Integer movieID;
    private Date rentalDate;
    private Date returnDate; 
}
