package com.foodorder.food_ordering_system.dto;

import com.foodorder.food_ordering_system.enums.PaymentStatus;
import lombok.*;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PaymentDto {

    private Long id;
    private Long orderId;
    private Double amount;
    private PaymentStatus status;
    private LocalDateTime paymentDate;
}