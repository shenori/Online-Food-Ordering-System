package com.foodorder.food_ordering_system.dto;

import com.foodorder.food_ordering_system.enums.OrderStatus;
import lombok.*;
import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OrderDto {

    private Long id;
    private Long userId;
    private OrderStatus status;
    private LocalDateTime orderDate;
    private Double totalAmount;
    private List<OrderItemDto> orderItems;
}