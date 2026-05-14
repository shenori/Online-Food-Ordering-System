package com.foodorder.food_ordering_system.controller;

import com.foodorder.food_ordering_system.dto.CartItemDto;
import com.foodorder.food_ordering_system.entity.Cart;
import com.foodorder.food_ordering_system.entity.CartItem;
import com.foodorder.food_ordering_system.entity.FoodItem;
import com.foodorder.food_ordering_system.entity.User;
import com.foodorder.food_ordering_system.repository.CartItemRepository;
import com.foodorder.food_ordering_system.repository.CartRepository;
import com.foodorder.food_ordering_system.repository.FoodItemRepository;
import com.foodorder.food_ordering_system.repository.UserRepository;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@RestController
@RequestMapping("/api/cart")
@RequiredArgsConstructor
public class CartController {

    private final CartRepository cartRepository;
    private final CartItemRepository cartItemRepository;
    private final FoodItemRepository foodItemRepository;
    private final UserRepository userRepository;

    @PostMapping("/add")
    public ResponseEntity<String> addToCart(
            @Valid @RequestBody CartItemDto dto,
            Principal principal) {

        User user = userRepository.findByEmail(principal.getName())
                .orElseThrow(() -> new RuntimeException("User not found!"));

        Cart cart = cartRepository.findByUserId(user.getId())
                .orElseGet(() -> {
                    Cart newCart = Cart.builder().user(user).build();
                    return cartRepository.save(newCart);
                });

        FoodItem foodItem = foodItemRepository.findById(dto.getFoodItemId())
                .orElseThrow(() -> new RuntimeException("Food item not found!"));

        CartItem cartItem = CartItem.builder()
                .cart(cart)
                .foodItem(foodItem)
                .quantity(dto.getQuantity())
                .build();

        cartItemRepository.save(cartItem);
        return ResponseEntity.ok("Item added to cart!");
    }

    @GetMapping
    public ResponseEntity<Cart> getCart(Principal principal) {
        User user = userRepository.findByEmail(principal.getName())
                .orElseThrow(() -> new RuntimeException("User not found!"));
        Cart cart = cartRepository.findByUserId(user.getId())
                .orElseThrow(() -> new RuntimeException("Cart not found!"));
        return ResponseEntity.ok(cart);
    }

    @DeleteMapping("/remove/{cartItemId}")
    public ResponseEntity<String> removeFromCart(
            @PathVariable Long cartItemId) {
        cartItemRepository.deleteById(cartItemId);
        return ResponseEntity.ok("Item removed from cart!");
    }
}