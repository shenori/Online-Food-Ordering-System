package com.foodorder.food_ordering_system.repository;

import com.foodorder.food_ordering_system.entity.FoodItem;
import com.foodorder.food_ordering_system.enums.FoodStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface FoodItemRepository extends JpaRepository<FoodItem, Long> {
    List<FoodItem> findByStatus(FoodStatus status);
    List<FoodItem> findByCategoryId(Long categoryId);
}