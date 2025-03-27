package com.ecommerce.project.repository;

import com.ecommerce.project.entity.Category;
import com.ecommerce.project.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, Long> {
    Page<Product> findByCategoryOrderByPriceAsc(Category categoryId, Pageable pageDetails);

    Page<Product> findByProductNameContainingIgnoreCase(String keyword, Pageable pageDetails);
}