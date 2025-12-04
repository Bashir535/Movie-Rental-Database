package com.backend.movierental.controller;

import com.backend.movierental.models.User;
import com.backend.movierental.payloadDTOs.LoginRequest;
import com.backend.movierental.payloadDTOs.LoginResponse;
import com.backend.movierental.payloadDTOs.UserUpdateDTO;
import com.backend.movierental.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService service;

    @PostMapping("/create")
    public ResponseEntity<String> create(@RequestBody User user) {
        service.createUser(user);
        return ResponseEntity.ok("User created");
    }

    @DeleteMapping("/{id}/delete")
    public ResponseEntity<String> delete(@PathVariable int id) {
        service.deleteUser(id);
        return ResponseEntity.ok("User deleted");
    }

    @GetMapping("/{id}/name")
    public ResponseEntity<String> getUserName(@PathVariable int id) {
        String name = service.getUserName(id);
        return ResponseEntity.ok(name);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest req) {

        LoginResponse user = service.loginAndFetch(req.getEmail(), req.getPassword());

        if (user == null) {
            return ResponseEntity.status(401).body("Invalid credentials");
        }

        return ResponseEntity.ok(user);
    }

    @PutMapping("/{id}/update")
    public ResponseEntity<?> update(
            @PathVariable int id,
            @RequestBody UserUpdateDTO dto) {

        service.updateUser(id, dto);
        return ResponseEntity.ok("Profile updated");
    }
}
