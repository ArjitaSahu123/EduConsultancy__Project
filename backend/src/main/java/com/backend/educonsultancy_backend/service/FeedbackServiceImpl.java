package com.backend.educonsultancy_backend.service;

import com.backend.educonsultancy_backend.auth.entities.User;
import com.backend.educonsultancy_backend.auth.respositories.UserRepository;
import com.backend.educonsultancy_backend.dto.FeedbackDto;
import com.backend.educonsultancy_backend.entities.Feedback;
import com.backend.educonsultancy_backend.repositories.FeedbackRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class FeedbackServiceImpl implements FeedbackService {

    @Autowired
    private FeedbackRepository feedbackRepository;

    @Autowired
    private UserRepository userRepository;

    @Override
    public Feedback createFeedback(FeedbackDto feedbackDto) {
        // Fetch the user by userId
        User user = userRepository.findById(feedbackDto.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Map the DTO to the Feedback entity
        Feedback feedback = Feedback.builder()
                .user(user)
                .name(feedbackDto.getName())
                .email(feedbackDto.getEmail())
                .phone(feedbackDto.getPhone())
                .message(feedbackDto.getMessage())
                .build();

        // Save the Feedback entity to the database
        return feedbackRepository.save(feedback);
    }

    @Override
    public List<Feedback> getAllFeedbacks() {
        // Fetch all feedbacks from the repository
        return feedbackRepository.findAll();
    }

    @Override
    public Optional<Feedback> getFeedbackById(Long feedbackId) {
        // Fetch feedback by ID
        return feedbackRepository.findById(feedbackId);
    }

    @Override
    public Feedback updateFeedback(Long feedbackId, FeedbackDto feedbackDto) {
        // Fetch the feedback by ID
        Feedback feedback = feedbackRepository.findById(feedbackId)
                .orElseThrow(() -> new RuntimeException("Feedback not found"));

        // Fetch the user by userId
        User user = userRepository.findById(feedbackDto.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Update the feedback with the new values
        feedback.setUser(user);
        feedback.setName(feedbackDto.getName());
        feedback.setEmail(feedbackDto.getEmail());
        feedback.setPhone(feedbackDto.getPhone());
        feedback.setMessage(feedbackDto.getMessage());

        // Save the updated feedback
        return feedbackRepository.save(feedback);
    }

    @Override
    public void deleteFeedback(Long feedbackId) {
        // Fetch the feedback by ID and delete it
        Feedback feedback = feedbackRepository.findById(feedbackId)
                .orElseThrow(() -> new RuntimeException("Feedback not found"));

        feedbackRepository.delete(feedback);
    }

    @Override
    public List<Feedback> getFeedbacksByUserId(Long userId) {
        // Fetch feedbacks associated with the user ID
        return feedbackRepository.findByUser_UserId(userId);
    }
}
