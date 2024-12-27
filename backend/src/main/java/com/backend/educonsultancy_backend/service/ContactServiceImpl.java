package com.backend.educonsultancy_backend.service;

import com.backend.educonsultancy_backend.auth.entities.User;
import com.backend.educonsultancy_backend.auth.respositories.UserRepository;
import com.backend.educonsultancy_backend.dto.ContactDto;
import com.backend.educonsultancy_backend.entities.Contact;
import com.backend.educonsultancy_backend.repositories.ContactRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ContactServiceImpl implements ContactService{

    @Autowired
    private ContactRepository contactRepository;

    @Autowired
    private UserRepository userRepository;

    @Override
    public Contact createContact(ContactDto contactDto) {
        // Fetch the user by userId
        User user = userRepository.findById(contactDto.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Map the DTO to the Contact entity
        Contact contact = Contact.builder()
                .user(user)
                .name(contactDto.getName())
                .email(contactDto.getEmail())
                .subject(contactDto.getSubject())
                .message(contactDto.getMessage())
                .build();

        // Save the Contact entity to the database
        return contactRepository.save(contact);
    }

    @Override
    public List<Contact> getAllContacts() {
        // Fetch all contacts from the repository
        return contactRepository.findAll();
    }

    @Override
    public Optional<Contact> getContactById(Long contactId) {
        // Fetch contact by ID
        return contactRepository.findById(contactId);
    }

    @Override
    public Contact updateContact(Long contactId, ContactDto contactDto) {
        // Fetch the contact by ID
        Contact contact = contactRepository.findById(contactId)
                .orElseThrow(() -> new RuntimeException("Contact not found"));

        // Fetch the user by userId
        User user = userRepository.findById(contactDto.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Update the contact with the new values
        contact.setUser(user);
        contact.setName(contactDto.getName());
        contact.setEmail(contactDto.getEmail());
        contact.setSubject(contactDto.getSubject());
        contact.setMessage(contactDto.getMessage());

        // Save the updated contact
        return contactRepository.save(contact);
    }

    @Override
    public void deleteContact(Long contactId) {
        // Fetch the contact by ID and delete it
        Contact contact = contactRepository.findById(contactId)
                .orElseThrow(() -> new RuntimeException("Contact not found"));

        contactRepository.delete(contact);
    }

    @Override
    public List<Contact> getContactsByUserId(Long userId) {
        // Fetch contacts by userId
        return contactRepository.findByUser_UserId(userId);
    }

}
