package com.backend.educonsultancy_backend.controllers;

import com.backend.educonsultancy_backend.dto.ProductDto;
import com.backend.educonsultancy_backend.exceptions.EmptyFileException;
import com.backend.educonsultancy_backend.service.ProductService;
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
@RequestMapping("/api/product")
public class ProductController {
    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @PostMapping("/add-product")
    public ResponseEntity<ProductDto> addProductHandler(@RequestPart MultipartFile file,@RequestPart String productDto) throws IOException, EmptyFileException {
        if(file.isEmpty()){
            throw new EmptyFileException("File is empty! Please send another file!");
        }
        ProductDto dto = convertToProductDto(productDto);
        return new ResponseEntity<>(productService.addProduct(dto,file), HttpStatus.CREATED);
    }

    @GetMapping("/{productId}")
    public ResponseEntity<ProductDto> getProductHandler(@PathVariable Integer productId){
        return ResponseEntity.ok(productService.getProduct(productId));
    }

    @GetMapping("/all")
    public ResponseEntity<List<ProductDto>> getAllProductsHandler(){
        return ResponseEntity.ok(productService.getAllProducts());
    }

    @PutMapping("/update/{productId}")
    public ResponseEntity<ProductDto> updateProductHandler(@PathVariable Integer productId, @RequestPart MultipartFile file,@RequestPart String productDtoObj) throws IOException {
        if(file.isEmpty())  file = null;
        ProductDto productDto = convertToProductDto(productDtoObj);

        return ResponseEntity.ok(productService.updateProduct(productId,productDto,file));
    }

    @DeleteMapping("/delete/{productId}")
    public ResponseEntity<String> deleteProductHandler(@PathVariable Integer productId) throws IOException {
        return ResponseEntity.ok(productService.deleteProduct(productId));
    }

    private ProductDto convertToProductDto(String productDtoObj) throws JsonProcessingException{
        ObjectMapper objectMapper = new ObjectMapper();
        return objectMapper.readValue(productDtoObj, ProductDto.class);
    }
}
