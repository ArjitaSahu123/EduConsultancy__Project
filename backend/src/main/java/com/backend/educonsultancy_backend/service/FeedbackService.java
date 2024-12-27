package com.backend.educonsultancy_backend.service;

import com.backend.educonsultancy_backend.dto.FeedbackDto;
import com.backend.educonsultancy_backend.entities.Feedback;

import java.util.List;
import java.util.Optional;

public interface FeedbackService {
    Feedback createFeedback(FeedbackDto feedbackDto);
    List<Feedback> getAllFeedbacks();  // Get all feedbacks
    Optional<Feedback> getFeedbackById(Long feedbackId);  // Get a feedback by ID
    Feedback updateFeedback(Long feedbackId, FeedbackDto feedbackDto);  // Update a feedback
    void deleteFeedback(Long feedbackId);  // Delete a feedback

    List<Feedback> getFeedbacksByUserId(Long userId);  // Get feedbacks by user ID
}
