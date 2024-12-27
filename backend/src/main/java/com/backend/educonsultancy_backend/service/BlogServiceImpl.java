package com.backend.educonsultancy_backend.service;

import com.backend.educonsultancy_backend.auth.entities.User;
import com.backend.educonsultancy_backend.auth.respositories.UserRepository;
import com.backend.educonsultancy_backend.dto.BlogDto;
import com.backend.educonsultancy_backend.entities.Blog;
import com.backend.educonsultancy_backend.exceptions.BlogNotFoundException;
import com.backend.educonsultancy_backend.exceptions.FileExistsException;
import com.backend.educonsultancy_backend.repositories.BlogRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class BlogServiceImpl implements BlogService{

    private final BlogRepository blogRepository;

    private final BlogFileService blogFileService;


    @Value("${project.blog}")
    private String path;

    @Value("${base.url}")
    private String baseUrl;

    public BlogServiceImpl(BlogRepository blogRepository, BlogFileService blogFileService) {
        this.blogRepository = blogRepository;
        this.blogFileService = blogFileService;
    }

    @Override
    public BlogDto addBlog(BlogDto blogDto, MultipartFile file) throws IOException {
        // 1.upload the file
        if (Files.exists(Paths.get(path + File.separator + file.getOriginalFilename()))){
            throw new FileExistsException("File already exists! Please enter another file name!");
        }
        String uploadedFileName = blogFileService.uploadFile(path,file);

        //2. set value of field 'product_image' as filename
        blogDto.setBlogImage(uploadedFileName);

        //3.map dto to product object
        Blog blog = new Blog(
                null,
                blogDto.getUserId(),
                blogDto.getTitle(),
                blogDto.getContent(),
                blogDto.getCategory(),
                blogDto.getCreatedAt(),
                blogDto.getUpdatedAt(),
                blogDto.getBlogImage()
        );

        //4.save the product object ->saved product object
        Blog savedBlog = blogRepository.save(blog);

        //5.generate the productUrl
        String blogUrl = baseUrl + "/blog/file/" + uploadedFileName;

        //6.Map product object to DTO object and return it
        BlogDto response = new BlogDto(
                savedBlog.getBlogId(),
                savedBlog.getUserId(),
                savedBlog.getTitle(),
                savedBlog.getContent(),
                savedBlog.getCategory(),
                savedBlog.getCreatedAt(),
                savedBlog.getUpdatedAt(),
                savedBlog.getBlogImage(),
                blogUrl
        );
        return response;
    }

    @Override
    public BlogDto getBlog(Integer blogId) {
        Blog blog = blogRepository.findById(blogId).orElseThrow(()-> new BlogNotFoundException("Blog not found with id = "+ blogId));


        //generate the productUrl
        String blogUrl = baseUrl + "/blog/file/" + blog.getBlogImage();

        BlogDto response = new BlogDto(
                blog.getBlogId(),
                blog.getUserId(),
                blog.getTitle(),
                blog.getContent(),
                blog.getCategory(),
                blog.getCreatedAt(),
                blog.getUpdatedAt(),
                blog.getBlogImage(),
                blogUrl
        );
        return response;
    }

    @Override
    public List<BlogDto> getAllBlogs() {
        List<Blog> blogs = blogRepository.findAll();
        List<BlogDto> blogDtos = new ArrayList<>();
        for(Blog blog : blogs){
            String blogUrl = baseUrl + "/blog/file/" + blog.getBlogImage();
            BlogDto blogDto = new BlogDto(
                    blog.getBlogId(),
                    blog.getUserId(),
                    blog.getTitle(),
                    blog.getContent(),
                    blog.getCategory(),
                    blog.getCreatedAt(),
                    blog.getUpdatedAt(),
                    blog.getBlogImage(),
                    blogUrl
            );
            blogDtos.add(blogDto);
        }
        return blogDtos;
    }


    @Override
    public BlogDto updateBlog(Integer blogId, BlogDto blogDto, MultipartFile file) throws IOException {
        // Retrieve the existing blog from the repository
        Blog bl = blogRepository.findById(blogId).orElseThrow(() -> new BlogNotFoundException("Blog not found with id = " + blogId));

        // Preserve the 'createdAt' field from the existing blog
        LocalDateTime createdAt = bl.getCreatedAt();

        // If a new file is uploaded, handle it
        String fileName = bl.getBlogImage();
        if (file != null && !file.isEmpty()) {
            // Delete the old file if it exists
            Files.deleteIfExists(Paths.get(path + File.separator + fileName));
            // Upload the new file and get the new file name
            fileName = blogFileService.uploadFile(path, file);
        }

        // Update the blogDto with the new file name
        blogDto.setBlogImage(fileName);

        // Set the fields to update, preserving 'createdAt' and setting 'updatedAt' to the current time
        Blog blog = new Blog(
                bl.getBlogId(),               // Keep the same ID
                blogDto.getUserId(),
                blogDto.getTitle(),
                blogDto.getContent(),
                blogDto.getCategory(),
                createdAt,                    // Preserve the original 'createdAt'
                LocalDateTime.now(),          // Set 'updatedAt' to current time
                blogDto.getBlogImage()
        );

        // Save the updated blog entity to the database
        Blog updatedBlog = blogRepository.save(blog);

        // Construct the blog URL for the response
        String blogUrl = baseUrl + "/product/file/" + fileName;

        // Map the updated blog entity to a BlogDto to return
        BlogDto response = new BlogDto(
                updatedBlog.getBlogId(),
                updatedBlog.getUserId(),
                updatedBlog.getTitle(),
                updatedBlog.getContent(),
                updatedBlog.getCategory(),
                updatedBlog.getCreatedAt(),  // Return the preserved 'createdAt'
                updatedBlog.getUpdatedAt(),  // Return the updated 'updatedAt'
                updatedBlog.getBlogImage(),
                blogUrl
        );
        return response;
    }


    @Override
    public String deleteBlog(Integer blogId) throws IOException {
        Blog bl = blogRepository.findById(blogId).orElseThrow(()-> new BlogNotFoundException("Blog not found with id = "+ blogId));
        Integer id = bl.getBlogId();

        Files.deleteIfExists(Paths.get(path + File.separator + bl.getBlogImage()));

        blogRepository.delete(bl);

        return "Blog deleted with id = " + id;
    }
}

