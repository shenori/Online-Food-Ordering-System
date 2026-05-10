package com.foodorder.food_ordering_system.service.impl;

import com.foodorder.food_ordering_system.dto.OrderDto;
import com.foodorder.food_ordering_system.dto.OrderItemDto;
import com.foodorder.food_ordering_system.entity.*;
import com.foodorder.food_ordering_system.enums.OrderStatus;
import com.foodorder.food_ordering_system.enums.PaymentStatus;
import com.foodorder.food_ordering_system.repository.*;
import com.foodorder.food_ordering_system.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class OrderServiceImpl implements OrderService {

    private final OrderRepository orderRepository;
    private final CartRepository cartRepository;
    private final UserRepository userRepository;
    private final PaymentRepository paymentRepository;

    @Override
    public OrderDto placeOrder(Long userId) {
        Cart cart = cartRepository.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("Cart not found!"));

        if (cart.getCartItems().isEmpty()) {
            throw new RuntimeException("Cart is empty!");
        }

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found!"));

        Double total = cart.getCartItems().stream()
                .mapToDouble(item -> item.getFoodItem().getPrice() * item.getQuantity())
                .sum();

        Order order = Order.builder()
                .user(user)
                .status(OrderStatus.PLACED)
                .orderDate(LocalDateTime.now())
                .totalAmount(total)
                .orderItems(cart.getCartItems().stream().map(cartItem -> {
                    return OrderItem.builder()
                            .foodItem(cartItem.getFoodItem())
                            .quantity(cartItem.getQuantity())
                            .price(cartItem.getFoodItem().getPrice())
                            .build();
                }).collect(Collectors.toList()))
                .build();

        order.getOrderItems().forEach(item -> item.setOrder(order));
        Order saved = orderRepository.save(order);

        Payment payment = Payment.builder()
                .order(saved)
                .amount(total)
                .status(PaymentStatus.PENDING)
                .paymentDate(LocalDateTime.now())
                .build();
        paymentRepository.save(payment);

        cart.getCartItems().clear();
        cartRepository.save(cart);

        return mapToDto(saved);
    }

    @Override
    public OrderDto updateOrderStatus(Long orderId, String status) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found!"));
        order.setStatus(OrderStatus.valueOf(status));
        return mapToDto(orderRepository.save(order));
    }

    @Override
    public List<OrderDto> getOrdersByUser(Long userId) {
        return orderRepository.findByUserId(userId)
                .stream().map(this::mapToDto).collect(Collectors.toList());
    }

    @Override
    public List<OrderDto> getAllOrders() {
        return orderRepository.findAll()
                .stream().map(this::mapToDto).collect(Collectors.toList());
    }

    private OrderDto mapToDto(Order order) {
        List<OrderItemDto> items = order.getOrderItems().stream()
                .map(item -> OrderItemDto.builder()
                        .foodItemId(item.getFoodItem().getId())
                        .foodItemName(item.getFoodItem().getName())
                        .quantity(item.getQuantity())
                        .price(item.getPrice())
                        .build())
                .collect(Collectors.toList());

        return OrderDto.builder()
                .id(order.getId())
                .userId(order.getUser().getId())
                .status(order.getStatus())
                .orderDate(order.getOrderDate())
                .totalAmount(order.getTotalAmount())
                .orderItems(items)
                .build();
    }
}