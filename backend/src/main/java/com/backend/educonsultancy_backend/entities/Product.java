package com.backend.educonsultancy_backend.entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.DecimalMax;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.Set;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer productId;

    @Column(nullable = false)
    @NotBlank(message = "Title is mandatory")
    private String title;

    @Lob
    @Column(name = "description", nullable = false, columnDefinition = "LONGTEXT")
    @NotBlank(message = "Description is mandatory")
    private String description;

    @Column(nullable = false)
    @NotBlank(message = "Category is mandatory")
    private String category;

    @NotNull(message = "Price is mandatory")
    @DecimalMin(value = "0.0", inclusive = false, message = "Price must be greater than 0")
    private Double price;

    @DecimalMin(value = "0.0", message = "Rating cannot be less than 0")
    @DecimalMax(value = "5.0", message = "Rating cannot exceed 5")
    private Double rating;

    @ElementCollection
    @CollectionTable(name = "product_buyers", joinColumns = @JoinColumn(name = "product_id"))
    @Column(name = "user_identifier")
    private Set<String> buyers;

    @Column(nullable = false)
    @NotBlank(message = "Product Image is mandatory")
    private String productImage;
}
