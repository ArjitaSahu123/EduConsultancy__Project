package com.backend.educonsultancy_backend.service;

import com.backend.educonsultancy_backend.auth.entities.User;
import com.backend.educonsultancy_backend.auth.respositories.UserRepository;
import com.backend.educonsultancy_backend.dto.ContactDto;
import com.backend.educonsultancy_backend.entities.Contact;
import com.backend.educonsultancy_backend.repositories.ContactRepository;
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

class ContactServiceTest {

    @Mock
    private ContactRepository contactRepository;

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private ContactServiceImpl contactService;

    private Contact contact;
    private ContactDto contactDto;
    private User user;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);

        // Initialize the User entity
        user = User.builder()
                .userId(1) // UserId as Integer
                .name("John Doe")
                .username("john.doe")
                .email("john.doe@example.com")
                .password("securepassword")
                .role(null) // Specify UserRole if needed
                .build();

        // Initialize the Contact entity
        contact = Contact.builder()
                .contactId(1L) // ContactId remains Long
                .user(user)
                .name("Jane Doe")
                .email("jane.doe@example.com")
                .subject("Test Subject")
                .message("Test Message")
                .build();

        // Initialize the ContactDto
        contactDto = new ContactDto(
                user.getUserId(), // No need for conversion
                "Jane Doe",
                "jane.doe@example.com",
                "Test Subject",
                "Test Message"
        );
    }

    @Test
    void testCreateContact() {
        // Mock the user repository to return the user
        when(userRepository.findById(1)).thenReturn(Optional.of(user));
        when(contactRepository.save(any(Contact.class))).thenReturn(contact);

        // Call the service method
        Contact createdContact = contactService.createContact(contactDto);

        // Assertions
        assertNotNull(createdContact);
        assertEquals("Jane Doe", createdContact.getName());
        assertEquals("jane.doe@example.com", createdContact.getEmail());

        // Verify interactions
        verify(userRepository, times(1)).findById(1);
        verify(contactRepository, times(1)).save(any(Contact.class));
    }

    @Test
    void testGetAllContacts() {
        // Mock the repository to return a list of contacts
        List<Contact> contacts = new ArrayList<>();
        contacts.add(contact);
        when(contactRepository.findAll()).thenReturn(contacts);

        // Call the service method
        List<Contact> fetchedContacts = contactService.getAllContacts();

        // Assertions
        assertNotNull(fetchedContacts);
        assertEquals(1, fetchedContacts.size());

        // Verify interactions
        verify(contactRepository, times(1)).findAll();
    }

    @Test
    void testGetContactById() {
        // Mock the repository to return a contact
        when(contactRepository.findById(1L)).thenReturn(Optional.of(contact));

        // Call the service method
        Optional<Contact> fetchedContact = contactService.getContactById(1L);

        // Assertions
        assertTrue(fetchedContact.isPresent());
        assertEquals("Jane Doe", fetchedContact.get().getName());

        // Verify interactions
        verify(contactRepository, times(1)).findById(1L);
    }

    @Test
    void testUpdateContact() {
        // Mock the repository and user repository
        when(contactRepository.findById(1L)).thenReturn(Optional.of(contact));
        when(userRepository.findById(1)).thenReturn(Optional.of(user));
        when(contactRepository.save(any(Contact.class))).thenReturn(contact);

        // Call the service method
        Contact updatedContact = contactService.updateContact(1L, contactDto);

        // Assertions
        assertNotNull(updatedContact);
        assertEquals("Jane Doe", updatedContact.getName());
        assertEquals("Test Subject", updatedContact.getSubject());

        // Verify interactions
        verify(contactRepository, times(1)).findById(1L);
        verify(contactRepository, times(1)).save(any(Contact.class));
    }

    @Test
    void testDeleteContact() {
        // Mock the repository
        when(contactRepository.findById(1L)).thenReturn(Optional.of(contact));

        // Call the service method
        contactService.deleteContact(1L);

        // Verify interactions
        verify(contactRepository, times(1)).findById(1L);
        verify(contactRepository, times(1)).delete(contact);
    }

    @Test
    void testGetContactsByUserId() {
        // Mock the repository to return contacts for a user
        List<Contact> contacts = new ArrayList<>();
        contacts.add(contact);
        when(contactRepository.findByUser_UserId(1)).thenReturn(contacts);

        // Call the service method
        List<Contact> fetchedContacts = contactService.getContactsByUserId(1);

        // Assertions
        assertNotNull(fetchedContacts);
        assertEquals(1, fetchedContacts.size());

        // Verify interactions
        verify(contactRepository, times(1)).findByUser_UserId(1);
    }
}
