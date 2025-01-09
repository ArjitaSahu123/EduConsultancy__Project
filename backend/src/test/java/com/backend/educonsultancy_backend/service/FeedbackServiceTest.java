package com.backend.educonsultancy_backend.service;

import com.backend.educonsultancy_backend.auth.entities.User;
import com.backend.educonsultancy_backend.auth.respositories.UserRepository;
import com.backend.educonsultancy_backend.dto.FeedbackDto;
import com.backend.educonsultancy_backend.entities.Feedback;
import com.backend.educonsultancy_backend.repositories.FeedbackRepository;
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

class FeedbackServiceTest {

    @Mock
    private FeedbackRepository feedbackRepository;

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private FeedbackServiceImpl feedbackService;

    private Feedback feedback;
    private FeedbackDto feedbackDto;
    private User user;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);

        // Initialize the User entity
        user = User.builder()
                .userId(1) // UserId as Long
                .name("John Doe")
                .username("john.doe")
                .email("john.doe@example.com")
                .password("securepassword")
                .role(null) // Specify UserRole if needed
                .build();

        // Initialize the Feedback entity
        feedback = Feedback.builder()
                .feedbackId(1L) // FeedbackId as Long
                .user(user)
                .name("Jane Doe")
                .email("jane.doe@example.com")
                .phone("1234567890")
                .message("Great service!")
                .build();

        // Initialize the FeedbackDto
        feedbackDto = new FeedbackDto(
                user.getUserId(), // No need for conversion
                "Jane Doe",
                "jane.doe@example.com",
                "1234567890",
                "Great service!"
        );
    }

    @Test
    void testCreateFeedback() {
        // Mock the user repository to return the user
        when(userRepository.findById(1)).thenReturn(Optional.of(user));
        when(feedbackRepository.save(any(Feedback.class))).thenReturn(feedback);

        // Call the service method
        Feedback createdFeedback = feedbackService.createFeedback(feedbackDto);

        // Assertions
        assertNotNull(createdFeedback);
        assertEquals("Jane Doe", createdFeedback.getName());
        assertEquals("jane.doe@example.com", createdFeedback.getEmail());

        // Verify interactions
        verify(userRepository, times(1)).findById(1);
        verify(feedbackRepository, times(1)).save(any(Feedback.class));
    }

    @Test
    void testCreateFeedback_UserNotFound() {
        // Mock the user repository to return an empty Optional
        when(userRepository.findById(1)).thenReturn(Optional.empty());

        // Call the service method and expect an exception
        RuntimeException exception = assertThrows(RuntimeException.class, () -> {
            feedbackService.createFeedback(feedbackDto);
        });

        assertEquals("User not found", exception.getMessage());

        // Verify interactions
        verify(userRepository, times(1)).findById(1);
        verify(feedbackRepository, times(0)).save(any(Feedback.class));
    }

    @Test
    void testGetAllFeedbacks() {
        // Mock the repository to return a list of feedbacks
        List<Feedback> feedbacks = new ArrayList<>();
        feedbacks.add(feedback);
        when(feedbackRepository.findAll()).thenReturn(feedbacks);

        // Call the service method
        List<Feedback> fetchedFeedbacks = feedbackService.getAllFeedbacks();

        // Assertions
        assertNotNull(fetchedFeedbacks);
        assertEquals(1, fetchedFeedbacks.size());

        // Verify interactions
        verify(feedbackRepository, times(1)).findAll();
    }

    @Test
    void testGetFeedbackById() {
        // Mock the repository to return a feedback
        when(feedbackRepository.findById(1L)).thenReturn(Optional.of(feedback));

        // Call the service method
        Optional<Feedback> fetchedFeedback = feedbackService.getFeedbackById(1L);

        // Assertions
        assertTrue(fetchedFeedback.isPresent());
        assertEquals("Jane Doe", fetchedFeedback.get().getName());

        // Verify interactions
        verify(feedbackRepository, times(1)).findById(1L);
    }

    @Test
    void testUpdateFeedback() {
        // Mock the repository and user repository
        when(feedbackRepository.findById(1L)).thenReturn(Optional.of(feedback));
        when(userRepository.findById(1)).thenReturn(Optional.of(user));
        when(feedbackRepository.save(any(Feedback.class))).thenReturn(feedback);

        // Call the service method
        Feedback updatedFeedback = feedbackService.updateFeedback(1L, feedbackDto);

        // Assertions
        assertNotNull(updatedFeedback);
        assertEquals("Jane Doe", updatedFeedback.getName());
        assertEquals("Great service!", updatedFeedback.getMessage());

        // Verify interactions
        verify(feedbackRepository, times(1)).findById(1L);
        verify(feedbackRepository, times(1)).save(any(Feedback.class));
    }

    @Test
    void testDeleteFeedback() {
        // Mock the repository
        when(feedbackRepository.findById(1L)).thenReturn(Optional.of(feedback));

        // Call the service method
        feedbackService.deleteFeedback(1L);

        // Verify interactions
        verify(feedbackRepository, times(1)).findById(1L);
        verify(feedbackRepository, times(1)).delete(feedback);
    }

    @Test
    void testDeleteFeedback_FeedbackNotFound() {
        // Mock the repository to return an empty Optional
        when(feedbackRepository.findById(1L)).thenReturn(Optional.empty());

        // Call the service method and expect an exception
        RuntimeException exception = assertThrows(RuntimeException.class, () -> {
            feedbackService.deleteFeedback(1L);
        });

        assertEquals("Feedback not found", exception.getMessage());

        // Verify interactions
        verify(feedbackRepository, times(1)).findById(1L);
        verify(feedbackRepository, times(0)).delete(feedback);
    }

    @Test
    void testGetFeedbacksByUserId() {
        // Mock the repository to return feedbacks for a user
        List<Feedback> feedbacks = new ArrayList<>();
        feedbacks.add(feedback);
        when(feedbackRepository.findByUser_UserId(1L)).thenReturn(feedbacks);

        // Call the service method
        List<Feedback> fetchedFeedbacks = feedbackService.getFeedbacksByUserId(1L);

        // Assertions
        assertNotNull(fetchedFeedbacks);
        assertEquals(1, fetchedFeedbacks.size());

        // Verify interactions
        verify(feedbackRepository, times(1)).findByUser_UserId(1L);
    }
}
