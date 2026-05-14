package com.foodorder.food_ordering_system.controller;

import com.foodorder.food_ordering_system.dto.FoodItemDto;
import com.foodorder.food_ordering_system.service.FoodItemService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/food")
@RequiredArgsConstructor
public class FoodController {

    private final FoodItemService foodItemService;

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<FoodItemDto> createFood(
            @Valid @RequestBody FoodItemDto dto) {
        return ResponseEntity.ok(foodItemService.createFoodItem(dto));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<FoodItemDto> updateFood(
            @PathVariable Long id,
            @Valid @RequestBody FoodItemDto dto) {
        return ResponseEntity.ok(foodItemService.updateFoodItem(id, dto));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<String> deleteFood(@PathVariable Long id) {
        foodItemService.deleteFoodItem(id);
        return ResponseEntity.ok("Food item deleted successfully!");
    }

    @GetMapping("/{id}")
    public ResponseEntity<FoodItemDto> getFoodById(@PathVariable Long id) {
        return ResponseEntity.ok(foodItemService.getFoodItemById(id));
    }

    @GetMapping
    public ResponseEntity<List<FoodItemDto>> getAllFoods() {
        return ResponseEntity.ok(foodItemService.getAllFoodItems());
    }
}