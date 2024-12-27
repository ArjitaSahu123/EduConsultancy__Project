package com.backend.educonsultancy_backend.controllers;

import com.backend.educonsultancy_backend.dto.ContactDto;
import com.backend.educonsultancy_backend.entities.Contact;
import com.backend.educonsultancy_backend.service.ContactService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/contacts")
public class ContactController {
    @Autowired
    private ContactService contactService;

    // Create a new contact
    @PostMapping
    public ResponseEntity<Contact> createContact(@Valid @RequestBody ContactDto contactDto) {
        Contact contact = contactService.createContact(contactDto);
        return new ResponseEntity<>(contact, HttpStatus.CREATED);
    }

    // Get all contacts
    @GetMapping
    public ResponseEntity<List<Contact>> getAllContacts() {
        List<Contact> contacts = contactService.getAllContacts();
        return new ResponseEntity<>(contacts, HttpStatus.OK);
    }

    // Get a contact by ID
    @GetMapping("/{id}")
    public ResponseEntity<Contact> getContactById(@PathVariable("id") Long contactId) {
        Optional<Contact> contact = contactService.getContactById(contactId);
        return contact.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    // Update an existing contact
    @PutMapping("/{id}")
    public ResponseEntity<Contact> updateContact(
            @PathVariable("id") Long contactId,
            @Valid @RequestBody ContactDto contactDto) {
        try {
            Contact updatedContact = contactService.updateContact(contactId, contactDto);
            return new ResponseEntity<>(updatedContact, HttpStatus.OK);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    // Delete a contact by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteContact(@PathVariable("id") Long contactId) {
        try {
            contactService.deleteContact(contactId);
            return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    // Get contacts by user ID
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Contact>> getContactsByUserId(@PathVariable("userId") Long userId) {
        List<Contact> contacts = contactService.getContactsByUserId(userId);
        if (contacts.isEmpty()) {
            return new ResponseEntity<>(contacts, HttpStatus.OK);
        }
        return new ResponseEntity<>(contacts, HttpStatus.OK);
    }
}
