package com.ecommerce.project.service;

import com.ecommerce.project.entity.Category;

import java.util.List;

public interface CategoryService {
    List<Category> getAllCategories();

    void addCategory(Category category);

    String deleteCategory(Long id);

    Category updateCategory(Category category, Long categoryId);
}
