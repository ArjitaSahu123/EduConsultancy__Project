package com.backend.educonsultancy_backend.controllers;

import com.backend.educonsultancy_backend.service.BlogFileService;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StreamUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;

@RestController
@RequestMapping("blog/file/")
public class BlogFileController {
    private final BlogFileService blogFileService;

    public BlogFileController(BlogFileService blogFileService) {
        this.blogFileService = blogFileService;
    }

    @Value("${project.blog}")
    private String path;

    @PostMapping("/upload")
    public ResponseEntity<String> uploadFileHandler(@RequestPart MultipartFile file) throws IOException {
        String uploadedFileName = blogFileService.uploadFile(path, file);
        return ResponseEntity.ok("File uploaded : " + uploadedFileName);
    }

    @GetMapping(value = "/{fileName}")
    public void serveFileHandler(@PathVariable String fileName, HttpServletResponse response) throws IOException {
        InputStream resourceFile = blogFileService.getResourceFile(path, fileName);
        response.setContentType(MediaType.IMAGE_PNG_VALUE);
        StreamUtils.copy(resourceFile, response.getOutputStream());
    }
}
