package com.backend.educonsultancy_backend.service;

import com.backend.educonsultancy_backend.dto.ProductDto;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface ProductService {
    ProductDto addProduct(ProductDto productDto, MultipartFile file) throws IOException;

    ProductDto getProduct(Integer productId);

    List<ProductDto> getAllProducts();

    ProductDto updateProduct(Integer productId, ProductDto productDto,MultipartFile file) throws IOException;

    String deleteProduct(Integer productId) throws IOException;

}
