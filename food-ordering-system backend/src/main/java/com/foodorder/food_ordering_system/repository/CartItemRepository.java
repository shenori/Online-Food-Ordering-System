package com.foodorder.food_ordering_system.repository;

import com.foodorder.food_ordering_system.entity.CartItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CartItemRepository extends JpaRepository<CartItem, Long> {
}