package com.backend.movierental.services;

import com.backend.movierental.models.Movie;
import com.backend.movierental.repositories.MovieRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MovieService {

    @Autowired
    private MovieRepository repo;

    public void createMovie(Movie movie) {
        repo.createMovie(movie);
    }

    public Movie getMovieById(int id) {
        return repo.getMovieById(id);
    }

    public byte[] getMovieImage(int id) {
        return repo.getMovieImage(id);
    }

    public List<Movie> getAllMovies() {
        return repo.getAllMovies();
    }

    public List<Movie> getMoviesRentedByUser(int customerID) {
        return repo.getMoviesRentedByUser(customerID);
    }
}
