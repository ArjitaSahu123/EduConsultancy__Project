package com.backend.educonsultancy_backend.controllers;

import com.backend.educonsultancy_backend.auth.entities.User;
import com.backend.educonsultancy_backend.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public ResponseEntity<List<User>> getAllUsers() {
        return ResponseEntity.ok(userService.getAllUsers());
    }

//    @PreAuthorize("hasAuthority('ADMIN')")
//    @GetMapping("/{id}")
//    public ResponseEntity<User> getUserById(@PathVariable Integer id) {
//        return ResponseEntity.ok(userService.getUserById(id));
//    }

    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Integer id) {
        return ResponseEntity.ok(userService.getUserById(id));
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteUserById(@PathVariable Integer id) {
        userService.deleteUserById(id);
        // Return a custom message including the ID of the deleted user
        String message = "User deleted with ID: " + id;
        return ResponseEntity.ok(message); // You can also use ResponseEntity.status(HttpStatus.OK).body(message);
    }
}
