package com.foodorder.food_ordering_system.service;

import com.foodorder.food_ordering_system.dto.OrderDto;
import java.util.List;

public interface OrderService {
    OrderDto placeOrder(Long userId);
    OrderDto updateOrderStatus(Long orderId, String status);
    List<OrderDto> getOrdersByUser(Long userId);
    List<OrderDto> getAllOrders();
}