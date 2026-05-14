package com.foodorder.food_ordering_system.service;

import com.foodorder.food_ordering_system.dto.FoodItemDto;
import java.util.List;

public interface FoodItemService {
    FoodItemDto createFoodItem(FoodItemDto dto);
    FoodItemDto updateFoodItem(Long id, FoodItemDto dto);
    void deleteFoodItem(Long id);
    FoodItemDto getFoodItemById(Long id);
    List<FoodItemDto> getAllFoodItems();
}