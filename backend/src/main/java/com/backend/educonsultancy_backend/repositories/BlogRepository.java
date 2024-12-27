package com.backend.educonsultancy_backend.repositories;

import com.backend.educonsultancy_backend.entities.Blog;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BlogRepository extends JpaRepository<Blog,Integer> {
}
