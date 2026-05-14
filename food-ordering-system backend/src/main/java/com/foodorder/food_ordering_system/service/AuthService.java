package com.foodorder.food_ordering_system.service;

import com.foodorder.food_ordering_system.dto.AuthRequest;
import com.foodorder.food_ordering_system.dto.AuthResponse;
import com.foodorder.food_ordering_system.dto.RegisterRequest;

public interface AuthService {
    AuthResponse register(RegisterRequest request);
    AuthResponse login(AuthRequest request);
}