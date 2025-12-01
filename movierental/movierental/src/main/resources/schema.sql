CREATE TABLE users (
   customerID INT AUTO_INCREMENT PRIMARY KEY,
    firstName VARCHAR(50) NOT NULL,
    lastName VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    isAdmin BOOLEAN NOT NULL DEFAULT FALSE
);

--ALTER TABLE Users ADD COLUMN password VARCHAR(255) NOT NULL;

CREATE TABLE Movies (
    movieID INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    genre VARCHAR(50) NOT NULL,
    releaseYear INT NOT NULL,
    stock INT NOT NULL,
    rentalRate DECIMAL(5,2) NOT NULL
    image LONGBLOB
);

CREATE TABLE Rentals (
    rentalID INT AUTO_INCREMENT PRIMARY KEY,
    movieID INT NOT NULL,
    customerID INT NOT NULL,
    rentalDate DATETIME NOT NULL,
    dueDate DATETIME NOT NULL,
    returnDate DATETIME NULL,
    status VARCHAR(10) NOT NULL,

    CONSTRAINT fk_rentals_movie FOREIGN KEY (movieID) REFERENCES Movies(movieID) ON DELETE CASCADE,

    CONSTRAINT fk_rentals_customer FOREIGN KEY (customerID) REFERENCES Users(customerID) ON DELETE CASCADE
);

CREATE TABLE Ratings (
    ratingID INT AUTO_INCREMENT PRIMARY KEY,
    movieID INT NOT NULL,
    customerID INT NOT NULL,
    score INT NOT NULL,
    comment TEXT,
    ratingDate DATETIME NOT NULL,

    CONSTRAINT fk_ratings_movie FOREIGN KEY (movieID) REFERENCES Movies(movieID) ON DELETE CASCADE,

    CONSTRAINT fk_ratings_customer FOREIGN KEY (customerID) REFERENCES Users(customerID) ON DELETE CASCADE
);

ALTER TABLE Movies ADD COLUMN image LONGBLOB;


