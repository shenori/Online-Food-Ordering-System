package com.foodorder.food_ordering_system.controller;

import com.foodorder.food_ordering_system.dto.PaymentDto;
import com.foodorder.food_ordering_system.entity.Payment;
import com.foodorder.food_ordering_system.enums.PaymentStatus;
import com.foodorder.food_ordering_system.repository.PaymentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/payments")
@RequiredArgsConstructor
public class PaymentController {

    private final PaymentRepository paymentRepository;

    @GetMapping("/{orderId}")
    public ResponseEntity<PaymentDto> getPayment(@PathVariable Long orderId) {
        Payment payment = paymentRepository.findByOrderId(orderId)
                .orElseThrow(() -> new RuntimeException("Payment not found!"));
        return ResponseEntity.ok(mapToDto(payment));
    }

    @PutMapping("/{orderId}/complete")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<PaymentDto> completePayment(@PathVariable Long orderId) {
        Payment payment = paymentRepository.findByOrderId(orderId)
                .orElseThrow(() -> new RuntimeException("Payment not found!"));
        payment.setStatus(PaymentStatus.COMPLETED);
        paymentRepository.save(payment);
        return ResponseEntity.ok(mapToDto(payment));
    }

    private PaymentDto mapToDto(Payment payment) {
        return PaymentDto.builder()
                .id(payment.getId())
                .orderId(payment.getOrder().getId())
                .amount(payment.getAmount())
                .status(payment.getStatus())
                .paymentDate(payment.getPaymentDate())
                .build();
    }
}