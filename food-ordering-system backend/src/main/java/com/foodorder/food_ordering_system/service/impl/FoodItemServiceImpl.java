package com.foodorder.food_ordering_system.service.impl;

import com.foodorder.food_ordering_system.dto.FoodItemDto;
import com.foodorder.food_ordering_system.entity.Category;
import com.foodorder.food_ordering_system.entity.FoodItem;
import com.foodorder.food_ordering_system.repository.CategoryRepository;
import com.foodorder.food_ordering_system.repository.FoodItemRepository;
import com.foodorder.food_ordering_system.service.FoodItemService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class FoodItemServiceImpl implements FoodItemService {

    private final FoodItemRepository foodItemRepository;
    private final CategoryRepository categoryRepository;

    @Override
    public FoodItemDto createFoodItem(FoodItemDto dto) {
        Category category = categoryRepository.findById(dto.getCategoryId())
                .orElseThrow(() -> new RuntimeException("Category not found!"));

        FoodItem foodItem = FoodItem.builder()
                .name(dto.getName())
                .description(dto.getDescription())
                .price(dto.getPrice())
                .status(dto.getStatus())
                .category(category)
                .build();

        FoodItem saved = foodItemRepository.save(foodItem);
        return mapToDto(saved);
    }

    @Override
    public FoodItemDto updateFoodItem(Long id, FoodItemDto dto) {
        FoodItem foodItem = foodItemRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Food item not found!"));

        foodItem.setName(dto.getName());
        foodItem.setDescription(dto.getDescription());
        foodItem.setPrice(dto.getPrice());
        foodItem.setStatus(dto.getStatus());

        return mapToDto(foodItemRepository.save(foodItem));
    }

    @Override
    public void deleteFoodItem(Long id) {
        foodItemRepository.deleteById(id);
    }

    @Override
    public FoodItemDto getFoodItemById(Long id) {
        FoodItem foodItem = foodItemRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Food item not found!"));
        return mapToDto(foodItem);
    }

    @Override
    public List<FoodItemDto> getAllFoodItems() {
        return foodItemRepository.findAll()
                .stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    private FoodItemDto mapToDto(FoodItem foodItem) {
        return FoodItemDto.builder()
                .id(foodItem.getId())
                .name(foodItem.getName())
                .description(foodItem.getDescription())
                .price(foodItem.getPrice())
                .status(foodItem.getStatus())
                .categoryId(foodItem.getCategory().getId())
                .build();
    }
}