package com.backend.educonsultancy_backend.service;

import com.backend.educonsultancy_backend.dto.ContactDto;
import com.backend.educonsultancy_backend.entities.Contact;

import java.util.List;
import java.util.Optional;

public interface ContactService {
    Contact createContact(ContactDto contactDto);
    List<Contact> getAllContacts();  // Get all contacts
    Optional<Contact> getContactById(Long contactId);  // Get a contact by ID
    Contact updateContact(Long contactId, ContactDto contactDto);  // Update a contact
    void deleteContact(Long contactId);  // Delete a contact
    // Add this method in ContactService interface
    List<Contact> getContactsByUserId(Long userId);

}
