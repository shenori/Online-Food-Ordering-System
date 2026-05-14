package com.foodorder.food_ordering_system.dto;

import com.foodorder.food_ordering_system.enums.FoodStatus;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class FoodItemDto {

    private Long id;

    @NotBlank(message = "Food name is required")
    private String name;

    private String description;

    @NotNull(message = "Price is required")
    private Double price;

    private FoodStatus status;

    @NotNull(message = "Category is required")
    private Long categoryId;
}