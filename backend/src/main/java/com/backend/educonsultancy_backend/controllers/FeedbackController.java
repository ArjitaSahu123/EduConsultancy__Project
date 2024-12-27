package com.backend.educonsultancy_backend.controllers;

import com.backend.educonsultancy_backend.dto.FeedbackDto;
import com.backend.educonsultancy_backend.entities.Feedback;
import com.backend.educonsultancy_backend.service.FeedbackService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/feedbacks")
public class FeedbackController {

    @Autowired
    private FeedbackService feedbackService;

    // Create a new feedback
    @PostMapping
    public ResponseEntity<Feedback> createFeedback(@Valid @RequestBody FeedbackDto feedbackDto) {
        Feedback feedback = feedbackService.createFeedback(feedbackDto);
        return new ResponseEntity<>(feedback, HttpStatus.CREATED);
    }

    // Get all feedbacks
    @GetMapping
    public ResponseEntity<List<Feedback>> getAllFeedbacks() {
        List<Feedback> feedbacks = feedbackService.getAllFeedbacks();
        return new ResponseEntity<>(feedbacks, HttpStatus.OK);
    }

    // Get all feedbacks related to a particular user ID
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Feedback>> getFeedbacksByUserId(@PathVariable("userId") Long userId) {
        List<Feedback> feedbacks = feedbackService.getFeedbacksByUserId(userId);
        return new ResponseEntity<>(feedbacks, HttpStatus.OK);
    }

    // Get a feedback by ID
    @GetMapping("/{id}")
    public ResponseEntity<Feedback> getFeedbackById(@PathVariable("id") Long feedbackId) {
        Optional<Feedback> feedback = feedbackService.getFeedbackById(feedbackId);
        return feedback.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    // Update an existing feedback
    @PutMapping("/{id}")
    public ResponseEntity<Feedback> updateFeedback(
            @PathVariable("id") Long feedbackId,
            @Valid @RequestBody FeedbackDto feedbackDto) {
        try {
            Feedback updatedFeedback = feedbackService.updateFeedback(feedbackId, feedbackDto);
            return new ResponseEntity<>(updatedFeedback, HttpStatus.OK);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    // Delete a feedback by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteFeedback(@PathVariable("id") Long feedbackId) {
        try {
            feedbackService.deleteFeedback(feedbackId);
            return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }
}
