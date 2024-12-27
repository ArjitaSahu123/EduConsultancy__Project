package com.backend.educonsultancy_backend.repositories;

import com.backend.educonsultancy_backend.entities.Contact;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ContactRepository extends JpaRepository<Contact,Long> {
    // Custom query to get contacts by userId
    List<Contact> findByUser_UserId(Long userId);
}
