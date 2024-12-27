package com.backend.educonsultancy_backend.service;

import com.backend.educonsultancy_backend.dto.ProductDto;
import com.backend.educonsultancy_backend.entities.Product;
import com.backend.educonsultancy_backend.exceptions.FileExistsException;
import com.backend.educonsultancy_backend.exceptions.ProductNotFoundException;
import com.backend.educonsultancy_backend.repositories.ProductRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;

@Service
public class ProductServiceImpl implements ProductService{
    private final ProductRepository productRepository;

    private final ProductFileService productFileService;

    @Value("${project.product}")
    private String path;

    @Value("${base.url}")
    private String baseUrl;


    public ProductServiceImpl(ProductRepository productRepository, ProductFileService productFileService){
        this.productRepository = productRepository;
        this.productFileService = productFileService;
    }

    @Override
    public ProductDto addProduct(ProductDto productDto, MultipartFile file) throws IOException {
        // 1.upload the file
        if (Files.exists(Paths.get(path + File.separator + file.getOriginalFilename()))){
            throw new FileExistsException("File already exists! Please enter another file name!");
        }
        String uploadedFileName = productFileService.uploadFile(path,file);

        //2. set value of field 'product_image' as filename
        productDto.setProductImage(uploadedFileName);

        //3.map dto to product object
        Product product = new Product(
                null,
                productDto.getTitle(),
                productDto.getDescription(),
                productDto.getCategory(),
                productDto.getPrice(),
                productDto.getRating(),
                productDto.getBuyers(),
                productDto.getProductImage()
        );

        //4.save the product object ->saved product object
        Product savedProduct = productRepository.save(product);

        //5.generate the productUrl
        String productUrl = baseUrl + "/product/file/" + uploadedFileName;

        //6.Map product object to DTO object and return it
        ProductDto response = new ProductDto(
                savedProduct.getProductId(),
                savedProduct.getTitle(),
                savedProduct.getDescription(),
                savedProduct.getCategory(),
                savedProduct.getPrice(),
                savedProduct.getRating(),
                savedProduct.getBuyers(),
                savedProduct.getProductImage(),
                productUrl
        );
        return response;
    }

    @Override
    public ProductDto getProduct(Integer productId) {
        Product product = productRepository.findById(productId).orElseThrow(()-> new ProductNotFoundException("Product not found with id = "+ productId));

        //generate the productUrl
        String productUrl = baseUrl + "/product/file/" + product.getProductImage();

        ProductDto response = new ProductDto(
                product.getProductId(),
                product.getTitle(),
                product.getDescription(),
                product.getCategory(),
                product.getPrice(),
                product.getRating(),
                product.getBuyers(),
                product.getProductImage(),
                productUrl
        );
        return response;
    }

    @Override
    public List<ProductDto> getAllProducts() {
        List<Product> products = productRepository.findAll();
        List<ProductDto> productDtos = new ArrayList<>();
        for(Product product : products){
            String productUrl = baseUrl + "/product/file/" + product.getProductImage();
            ProductDto productDto = new ProductDto(
                    product.getProductId(),
                    product.getTitle(),
                    product.getDescription(),
                    product.getCategory(),
                    product.getPrice(),
                    product.getRating(),
                    product.getBuyers(),
                    product.getProductImage(),
                    productUrl
            );
            productDtos.add(productDto);
        }
        return productDtos;
    }

    @Override
    public ProductDto updateProduct(Integer productId, ProductDto productDto, MultipartFile file) throws IOException {
        Product pd = productRepository.findById(productId).orElseThrow(()-> new ProductNotFoundException("Product not found with id = "+ productId));

        String fileName = pd.getProductImage();
        if(file != null){
            Files.deleteIfExists(Paths.get(path+ File.separator+fileName));
            fileName = productFileService.uploadFile(path,file);
        }

        productDto.setProductImage(fileName);

        Product product = new Product(
                pd.getProductId(),
                productDto.getTitle(),
                productDto.getDescription(),
                productDto.getCategory(),
                productDto.getPrice(),
                productDto.getRating(),
                productDto.getBuyers(),
                productDto.getProductImage()
        );

        Product updatedProduct = productRepository.save(product);

        String productUrl = baseUrl + "/product/file/" + fileName;

        ProductDto response = new ProductDto(
                product.getProductId(),
                product.getTitle(),
                product.getDescription(),
                product.getCategory(),
                product.getPrice(),
                product.getRating(),
                product.getBuyers(),
                product.getProductImage(),
                productUrl
        );
        return response;
    }

    @Override
    public String deleteProduct(Integer productId) throws IOException {
        Product pd = productRepository.findById(productId).orElseThrow(()-> new ProductNotFoundException("Product not found with id = "+ productId));
        Integer id = pd.getProductId();

        Files.deleteIfExists(Paths.get(path + File.separator + pd.getProductImage()));

        productRepository.delete(pd);

        return "Product deleted with id = " + id;
    }
}
