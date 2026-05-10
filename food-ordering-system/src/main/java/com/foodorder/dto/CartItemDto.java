package com.foodorder.food_ordering_system.dto;

import jakarta.validation.constraints.NotNull;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CartItemDto {

    @NotNull(message = "Food item is required")
    private Long foodItemId;

    @NotNull(message = "Quantity is required")
    private Integer quantity;
}