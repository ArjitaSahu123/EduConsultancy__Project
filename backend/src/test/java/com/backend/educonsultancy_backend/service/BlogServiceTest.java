package com.backend.educonsultancy_backend.service;

import com.backend.educonsultancy_backend.dto.BlogDto;
import com.backend.educonsultancy_backend.entities.Blog;
import com.backend.educonsultancy_backend.exceptions.BlogNotFoundException;
import com.backend.educonsultancy_backend.exceptions.FileExistsException;
import com.backend.educonsultancy_backend.repositories.BlogRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class BlogServiceTest {

    @Mock
    private BlogRepository blogRepository;

    @Mock
    private BlogFileService blogFileService;

    @InjectMocks
    private BlogServiceImpl blogService;

    private Blog blog;
    private BlogDto blogDto;
    private BlogDto updatedBlogDto;
    private MultipartFile file;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);

        // Initialize Blog entity
        blog = new Blog(
                1,
                1,
                "Test Blog",
                "Content",
                "Category",
                LocalDateTime.now(),
                LocalDateTime.now(),
                "testfile.jpg"
        );

        // Initialize BlogDto for creation
        blogDto = new BlogDto(
                1,
                1,
                "Test Blog",
                "Content",
                "Category",
                LocalDateTime.now(),
                LocalDateTime.now(),
                "testfile.jpg",
                "http://baseurl.com/blog/file/testfile.jpg"
        );

        // Initialize updated BlogDto
        updatedBlogDto = new BlogDto(
                1,
                1,
                "Updated Blog",
                "Updated Content",
                "Updated Category",
                LocalDateTime.now(),
                LocalDateTime.now(),
                "updatedfile.jpg",
                "http://baseurl.com/blog/file/updatedfile.jpg"
        );
    }

    @Test
    void testAddBlog() throws IOException {
        // Mock file upload
        when(blogFileService.uploadFile(anyString(), any(MultipartFile.class))).thenReturn("testfile.jpg");

        // Mock the repository to save blog
        when(blogRepository.save(any(Blog.class))).thenReturn(blog);

        // Mock Files.exists to return false (file doesn't exist)
        try (var mock = Mockito.mockStatic(Files.class)) {
            mock.when(() -> Files.exists(Paths.get(anyString()))).thenReturn(false);

            // Call the service method
            BlogDto response = blogService.addBlog(blogDto, file);

            // Assertions
            assertNotNull(response);
            assertEquals("Test Blog", response.getTitle());
            assertEquals("testfile.jpg", response.getBlogImage());

            // Verify interactions
            verify(blogRepository, times(1)).save(any(Blog.class));
        }
    }

    @Test
    void testAddBlog_FileAlreadyExists() throws IOException {
        // Mock file exists check
        try (var mock = Mockito.mockStatic(Files.class)) {
            mock.when(() -> Files.exists(Paths.get(anyString()))).thenReturn(true);

            // Call the service method and expect exception
            assertThrows(FileExistsException.class, () -> blogService.addBlog(blogDto, file));

            // Verify interactions
            verify(blogRepository, times(0)).save(any(Blog.class));
        }
    }

    @Test
    void testGetBlog() {
        // Mock the repository to return the blog
        when(blogRepository.findById(1)).thenReturn(Optional.of(blog));

        // Call the service method
        BlogDto response = blogService.getBlog(1);

        // Assertions
        assertNotNull(response);
        assertEquals("Test Blog", response.getTitle());
        assertEquals("testfile.jpg", response.getBlogImage());

        // Verify interactions
        verify(blogRepository, times(1)).findById(1);
    }

    @Test
    void testGetBlog_BlogNotFound() {
        // Mock the repository to return an empty Optional
        when(blogRepository.findById(1)).thenReturn(Optional.empty());

        // Call the service method and expect exception
        assertThrows(BlogNotFoundException.class, () -> blogService.getBlog(1));

        // Verify interactions
        verify(blogRepository, times(1)).findById(1);
    }

    @Test
    void testUpdateBlog() throws IOException {
        // Prepare a mock MultipartFile
        MultipartFile file = mock(MultipartFile.class);

        // Mock the repository to return the existing blog
        when(blogRepository.findById(1)).thenReturn(Optional.of(blog));

        // Mock file upload to return the updated file name
        when(blogFileService.uploadFile(anyString(), any(MultipartFile.class))).thenReturn("updatedfile.jpg");

        // Mock static method using mockStatic
        try (var mock = Mockito.mockStatic(Files.class)) {
            mock.when(() -> Files.deleteIfExists(Paths.get(anyString()))).thenReturn(true);

            // Call the service method
            BlogDto response = blogService.updateBlog(1, updatedBlogDto, file);

            // Assertions
            assertNotNull(response);
            assertEquals("Updated Blog", response.getTitle());
            assertEquals("updatedfile.jpg", response.getBlogImage());

            // Verify interactions
            verify(blogRepository, times(1)).findById(1);
            verify(blogRepository, times(1)).save(any(Blog.class));
            verify(blogFileService, times(1)).uploadFile(anyString(), any(MultipartFile.class));
            mock.verify(() -> Files.deleteIfExists(Paths.get(anyString())), times(1));
        }
    }

    @Test
    void testDeleteBlog() throws IOException {
        // Mock the repository to return the existing blog
        when(blogRepository.findById(1)).thenReturn(Optional.of(blog));

        // Mock file deletion
        try (var mock = Mockito.mockStatic(Files.class)) {
            mock.when(() -> Files.deleteIfExists(Paths.get(anyString()))).thenReturn(true);

            // Call the service method
            String response = blogService.deleteBlog(1);

            // Assertions
            assertEquals("Blog deleted with id = 1", response);

            // Verify interactions
            verify(blogRepository, times(1)).findById(1);
            verify(blogRepository, times(1)).delete(any(Blog.class));
        }
    }

    @Test
    void testDeleteBlog_BlogNotFound() throws IOException {
        // Mock the repository to return an empty Optional
        when(blogRepository.findById(1)).thenReturn(Optional.empty());

        // Call the service method and expect exception
        assertThrows(BlogNotFoundException.class, () -> blogService.deleteBlog(1));

        // Verify interactions
        verify(blogRepository, times(1)).findById(1);
        verify(blogRepository, times(0)).delete(any(Blog.class));
    }
}
