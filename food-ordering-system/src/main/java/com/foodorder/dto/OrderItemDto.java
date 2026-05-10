package com.foodorder.food_ordering_system.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OrderItemDto {

    private Long foodItemId;
    private String foodItemName;
    private Integer quantity;
    private Double price;
}