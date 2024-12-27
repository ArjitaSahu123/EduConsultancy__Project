package com.backend.educonsultancy_backend.repositories;

import com.backend.educonsultancy_backend.entities.Feedback;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FeedbackRepository extends JpaRepository<Feedback, Long> {
    List<Feedback> findByUser_UserId(Long userId);
}
