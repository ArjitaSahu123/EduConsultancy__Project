package com.backend.educonsultancy_backend.service;

import com.backend.educonsultancy_backend.auth.entities.User;

import java.util.List;

public interface UserService {
    List<User> getAllUsers();
    User getUserById(Integer id);
    void deleteUserById(Integer id);
}
