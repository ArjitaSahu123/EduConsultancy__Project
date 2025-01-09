package com.backend.educonsultancy_backend.service;

import com.backend.educonsultancy_backend.auth.entities.User;
import com.backend.educonsultancy_backend.auth.respositories.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class UserServiceTest {

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private UserServiceImpl userService;

    private User user;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);

        // Initialize the User entity
        user = User.builder()
                .userId(1)
                .name("John Doe")
                .username("john.doe")
                .email("john.doe@example.com")
                .password("securepassword")
                .role(null) // Specify UserRole if needed
                .build();
    }

    @Test
    void testGetAllUsers() {
        // Mock the repository to return a list of users
        List<User> users = new ArrayList<>();
        users.add(user);
        when(userRepository.findAll()).thenReturn(users);

        // Call the service method
        List<User> fetchedUsers = userService.getAllUsers();

        // Assertions
        assertNotNull(fetchedUsers);
        assertEquals(1, fetchedUsers.size());

        // Verify interactions
        verify(userRepository, times(1)).findAll();
    }

    @Test
    void testGetUserById() {
        // Mock the repository to return the user
        when(userRepository.findById(1)).thenReturn(Optional.of(user));

        // Call the service method
        User fetchedUser = userService.getUserById(1);

        // Assertions
        assertNotNull(fetchedUser);
        assertEquals("John Doe", fetchedUser.getName());

        // Verify interactions
        verify(userRepository, times(1)).findById(1);
    }

    @Test
    void testGetUserById_UserNotFound() {
        // Mock the repository to return an empty Optional
        when(userRepository.findById(1)).thenReturn(Optional.empty());

        // Call the service method and expect an exception
        RuntimeException exception = assertThrows(RuntimeException.class, () -> {
            userService.getUserById(1);
        });

        assertEquals("User not found with id: 1", exception.getMessage());

        // Verify interactions
        verify(userRepository, times(1)).findById(1);
    }

    @Test
    void testDeleteUserById() {
        // Mock the repository to check existence and deletion
        when(userRepository.existsById(1)).thenReturn(true);
        doNothing().when(userRepository).deleteById(1);

        // Call the service method
        userService.deleteUserById(1);

        // Verify interactions
        verify(userRepository, times(1)).existsById(1);
        verify(userRepository, times(1)).deleteById(1);
    }

    @Test
    void testDeleteUserById_UserNotFound() {
        // Mock the repository to check existence (user not found)
        when(userRepository.existsById(1)).thenReturn(false);

        // Call the service method and expect an exception
        RuntimeException exception = assertThrows(RuntimeException.class, () -> {
            userService.deleteUserById(1);
        });

        assertEquals("User not found with id: 1", exception.getMessage());

        // Verify interactions
        verify(userRepository, times(1)).existsById(1);
        verify(userRepository, times(0)).deleteById(1);
    }
}
