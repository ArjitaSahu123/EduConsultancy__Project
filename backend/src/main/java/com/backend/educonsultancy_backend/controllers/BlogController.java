//package com.backend.educonsultancy_backend.controllers;
//
//import com.backend.educonsultancy_backend.dto.BlogDto;
//import com.backend.educonsultancy_backend.exceptions.EmptyFileException;
//import com.backend.educonsultancy_backend.service.BlogService;
//import com.fasterxml.jackson.core.JsonProcessingException;
//import com.fasterxml.jackson.databind.ObjectMapper;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//import org.springframework.web.multipart.MultipartFile;
//
//import java.io.IOException;
//import java.util.List;
//
//@RestController
//@RequestMapping("/api/blog")
//public class BlogController {
//
//    private final BlogService blogService;
//
//    public BlogController(BlogService blogService) {
//        this.blogService = blogService;
//    }
//
//    @PostMapping("/add-blog")
//    public ResponseEntity<BlogDto> addBlog(@RequestPart MultipartFile file, @RequestPart String blogDto) throws IOException, EmptyFileException {
//        if (file.isEmpty()) {
//            throw new EmptyFileException("File is empty! Please upload a valid file.");
//        }
//        BlogDto dto = convertToDto(blogDto);
//        return new ResponseEntity<>(blogService.addBlog(dto, file), HttpStatus.CREATED);
//    }
//
//    @GetMapping("/{blogId}")
//    public ResponseEntity<BlogDto> getBlog(@PathVariable Integer blogId) {
//        return ResponseEntity.ok(blogService.getBlog(blogId));
//    }
//
//    @GetMapping("/all")
//    public ResponseEntity<List<BlogDto>> getAllBlogs() {
//        return ResponseEntity.ok(blogService.getAllBlogs());
//    }
//
//    @PutMapping("/update/{blogId}")
//    public ResponseEntity<BlogDto> updateBlog(@PathVariable Integer blogId, @RequestPart MultipartFile file, @RequestPart String blogDto) throws IOException {
//        BlogDto dto = convertToDto(blogDto);
//        return ResponseEntity.ok(blogService.updateBlog(blogId, dto, file));
//    }
//
//    @DeleteMapping("/delete/{blogId}")
//    public ResponseEntity<String> deleteBlog(@PathVariable Integer blogId) throws IOException {
//        return ResponseEntity.ok(blogService.deleteBlog(blogId));
//    }
//
//    private BlogDto convertToDto(String blogDto) throws JsonProcessingException {
//        ObjectMapper objectMapper = new ObjectMapper();
//        return objectMapper.readValue(blogDto, BlogDto.class);
//    }
//}



package com.backend.educonsultancy_backend.controllers;


import com.backend.educonsultancy_backend.dto.BlogDto;
import com.backend.educonsultancy_backend.exceptions.EmptyFileException;
import com.backend.educonsultancy_backend.service.BlogService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/blog")
public class BlogController {
    private final BlogService blogService;

    public BlogController(BlogService blogService) {
        this.blogService = blogService;
    }

//    @PreAuthorize("hasAuthority('ADMIN')")
    @PostMapping("/add-blog")
    public ResponseEntity<BlogDto> addBlogHandler(@RequestPart MultipartFile file, @RequestPart String blogDto) throws IOException, EmptyFileException {
        if(file.isEmpty()){
            throw new EmptyFileException("File is empty! Please send another file!");
        }
        BlogDto dto =   convertToBlogDto(blogDto);
        return new ResponseEntity<>(blogService.addBlog(dto,file), HttpStatus.CREATED);
    }

    @GetMapping("/{blogId}")
    public ResponseEntity<BlogDto> getBlogHandler(@PathVariable Integer blogId){
        return ResponseEntity.ok(blogService.getBlog(blogId));
    }

    @GetMapping("/all")
    public ResponseEntity<List<BlogDto>> getAllBlogsHandler(){
        return ResponseEntity.ok(blogService.getAllBlogs());
    }

    @PutMapping("/update/{blogId}")
    public ResponseEntity<BlogDto> updateBlogHandler(@PathVariable Integer blogId, @RequestPart MultipartFile file,@RequestPart String blogDtoObj) throws IOException {
        if(file.isEmpty())  file = null;
        BlogDto blogDto = convertToBlogDto(blogDtoObj);

        return ResponseEntity.ok(blogService.updateBlog(blogId,blogDto,file));
    }

    @DeleteMapping("/delete/{blogId}")
    public ResponseEntity<String> deleteBlogHandler(@PathVariable Integer blogId) throws IOException {
        return ResponseEntity.ok(blogService.deleteBlog(blogId));
    }

    private BlogDto convertToBlogDto(String blogDtoObj) throws JsonProcessingException {
        ObjectMapper objectMapper = new ObjectMapper();
        return objectMapper.readValue(blogDtoObj, BlogDto.class);
    }
}
