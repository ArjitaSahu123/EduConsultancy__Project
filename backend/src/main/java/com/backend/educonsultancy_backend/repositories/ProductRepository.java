package com.backend.educonsultancy_backend.repositories;

import com.backend.educonsultancy_backend.entities.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product,Integer> {
}
