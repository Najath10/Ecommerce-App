package com.ecommerce.project.repository;

import com.ecommerce.project.entity.Category;
import jakarta.validation.constraints.NotBlank;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<Category, Long> {
    Category findByCategoryName(@NotBlank(message = "Cannot be Empty") String categoryName);
}