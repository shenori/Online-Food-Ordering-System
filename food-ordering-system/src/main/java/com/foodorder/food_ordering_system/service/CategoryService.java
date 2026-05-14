package com.foodorder.food_ordering_system.service;

import com.foodorder.food_ordering_system.dto.CategoryDto;
import java.util.List;

public interface CategoryService {
    CategoryDto createCategory(CategoryDto dto);
    CategoryDto updateCategory(Long id, CategoryDto dto);
    void deleteCategory(Long id);
    List<CategoryDto> getAllCategories();
}