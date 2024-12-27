//package com.backend.educonsultancy_backend.service;
//
//import com.backend.educonsultancy_backend.dto.BlogDto;
//import org.springframework.web.multipart.MultipartFile;
//
//import java.io.IOException;
//import java.util.List;
//
//public interface BlogService {
//    BlogDto addBlog(BlogDto blogDto, MultipartFile file) throws IOException;
//    BlogDto getBlog(Integer blogId);
//    List<BlogDto> getAllBlogs();
//    BlogDto updateBlog(Integer blogId, BlogDto blogDto, MultipartFile file) throws IOException;
//    String deleteBlog(Integer blogId) throws IOException;
//}


package com.backend.educonsultancy_backend.service;

import com.backend.educonsultancy_backend.dto.BlogDto;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface BlogService {
    BlogDto addBlog(BlogDto blogDto, MultipartFile file) throws IOException;

    BlogDto getBlog(Integer blogId);

    List<BlogDto> getAllBlogs();

    BlogDto updateBlog(Integer blogId, BlogDto blogDto,MultipartFile file) throws IOException;

    String deleteBlog(Integer blogId) throws IOException;
}
