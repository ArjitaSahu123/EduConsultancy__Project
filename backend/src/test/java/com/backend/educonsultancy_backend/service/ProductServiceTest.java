package com.backend.educonsultancy_backend.service;

import com.backend.educonsultancy_backend.dto.ProductDto;
import com.backend.educonsultancy_backend.entities.Product;
import com.backend.educonsultancy_backend.exceptions.FileExistsException;
import com.backend.educonsultancy_backend.exceptions.ProductNotFoundException;
import com.backend.educonsultancy_backend.repositories.ProductRepository;
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
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class ProductServiceTest {

    @Mock
    private ProductRepository productRepository;

    @Mock
    private ProductFileService productFileService;

    @InjectMocks
    private ProductServiceImpl productService;

    private Product product;
    private ProductDto productDto;
    private ProductDto productDtoObj;
    private MultipartFile file;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);

        // Initialize product
        product = new Product(
                1,
                "Product 1",
                "Product Description",
                "Category 1",
                10.0,
                4.5,
                Set.of("user1"),
                "product1.jpg"
        );

        // Initialize productDto with correct constructor
        productDto = new ProductDto(
                1,
                "Product 1",  // title
                "Product Description",  // description
                "Category 1",  // category
                10.0,  // price
                4.5,   // rating
                Set.of("user1"),  // buyers
                "product1.jpg",  // productImage
                "http://baseurl.com/product/file/product1.jpg"  // productUrl
        );

        // Initialize productDtoObj for update test
        productDtoObj = new ProductDto(
                1,
                "Updated Product",  // updated title
                "Updated Description",  // updated description
                "Updated Category",  // updated category
                20.0,  // updated price
                4.7,   // updated rating
                Set.of("user1", "user2"),  // updated buyers
                "updated_product.jpg",  // updated productImage
                "http://baseurl.com/product/file/updated_product.jpg"  // updated productUrl
        );
    }

    @Test
    void testAddProduct() throws IOException {
        // Mock file upload
        when(productFileService.uploadFile(anyString(), any(MultipartFile.class))).thenReturn("product1.jpg");

        // Mock the repository to save product
        when(productRepository.save(any(Product.class))).thenReturn(product);

        // Mock Files.exists to return false (file doesn't exist)
        try (var mock = Mockito.mockStatic(Files.class)) {
            mock.when(() -> Files.exists(Paths.get(anyString()))).thenReturn(false);

            // Call the service method
            ProductDto response = productService.addProduct(productDto, file);

            // Assertions
            assertNotNull(response);
            assertEquals("Product 1", response.getTitle());
            assertEquals("product1.jpg", response.getProductImage());

            // Verify interactions
            verify(productRepository, times(1)).save(any(Product.class));
        }
    }

    @Test
    void testAddProduct_FileAlreadyExists() throws IOException {
        // Mock file exists check
        try (var mock = Mockito.mockStatic(Files.class)) {
            mock.when(() -> Files.exists(Paths.get(anyString()))).thenReturn(true);

            // Call the service method and expect exception
            assertThrows(FileExistsException.class, () -> productService.addProduct(productDto, file));

            // Verify interactions
            verify(productRepository, times(0)).save(any(Product.class));
        }
    }

    @Test
    void testGetProduct() {
        // Mock the repository to return the product
        when(productRepository.findById(1)).thenReturn(Optional.of(product));

        // Call the service method
        ProductDto response = productService.getProduct(1);

        // Assertions
        assertNotNull(response);
        assertEquals("Product 1", response.getTitle());
        assertEquals("product1.jpg", response.getProductImage());

        // Verify interactions
        verify(productRepository, times(1)).findById(1);
    }

    @Test
    void testGetProduct_ProductNotFound() {
        // Mock the repository to return an empty Optional
        when(productRepository.findById(1)).thenReturn(Optional.empty());

        // Call the service method and expect exception
        assertThrows(ProductNotFoundException.class, () -> productService.getProduct(1));

        // Verify interactions
        verify(productRepository, times(1)).findById(1);
    }

    @Test
    void testGetAllProducts() {
        // Mock the repository to return a list of products
        List<Product> products = new ArrayList<>();
        products.add(product);
        when(productRepository.findAll()).thenReturn(products);

        // Call the service method
        List<ProductDto> response = productService.getAllProducts();

        // Assertions
        assertNotNull(response);
        assertEquals(1, response.size());
        assertEquals("Product 1", response.get(0).getTitle());

        // Verify interactions
        verify(productRepository, times(1)).findAll();
    }

    @Test
    void testUpdateProduct() throws IOException {
        // Prepare a mock MultipartFile
        MultipartFile file = mock(MultipartFile.class);

        // Mock the repository to return the existing product
        when(productRepository.findById(1)).thenReturn(Optional.of(product));

        // Mock file upload to return the updated file name
        when(productFileService.uploadFile(anyString(), any(MultipartFile.class))).thenReturn("updated_product.jpg");

        // Mock static method using mockStatic
        try (var mock = Mockito.mockStatic(Files.class)) {
            mock.when(() -> Files.deleteIfExists(Paths.get(anyString()))).thenReturn(true);

            // Call the service method
            ProductDto response = productService.updateProduct(1, productDtoObj, file);

            // Assertions
            assertNotNull(response);
            assertEquals("Updated Product", response.getTitle());
            assertEquals("updated_product.jpg", response.getProductImage());

            // Verify interactions
            verify(productRepository, times(1)).findById(1);
            verify(productRepository, times(1)).save(any(Product.class));
            verify(productFileService, times(1)).uploadFile(anyString(), any(MultipartFile.class));
            mock.verify(() -> Files.deleteIfExists(Paths.get(anyString())), times(1));
        }
    }

    @Test
    void testDeleteProduct() throws IOException {
        // Mock the repository to return the existing product
        when(productRepository.findById(1)).thenReturn(Optional.of(product));

        // Mock file deletion
        try (var mock = Mockito.mockStatic(Files.class)) {
            mock.when(() -> Files.deleteIfExists(Paths.get(anyString()))).thenReturn(true);

            // Call the service method
            String response = productService.deleteProduct(1);

            // Assertions
            assertEquals("Product deleted with id = 1", response);

            // Verify interactions
            verify(productRepository, times(1)).findById(1);
            verify(productRepository, times(1)).delete(any(Product.class));
        }
    }

    @Test
    void testDeleteProduct_ProductNotFound() throws IOException {
        // Mock the repository to return an empty Optional
        when(productRepository.findById(1)).thenReturn(Optional.empty());

        // Call the service method and expect exception
        assertThrows(ProductNotFoundException.class, () -> productService.deleteProduct(1));

        // Verify interactions
        verify(productRepository, times(1)).findById(1);
        verify(productRepository, times(0)).delete(any(Product.class));
    }
}
