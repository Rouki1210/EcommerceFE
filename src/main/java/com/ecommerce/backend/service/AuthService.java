package com.ecommerce.backend.service;

import com.ecommerce.backend.dto.request.LoginRequest;
import com.ecommerce.backend.dto.request.RegisterRequest;
import com.ecommerce.backend.dto.response.AuthResponse;

public interface AuthService {
    void     register(RegisterRequest request);
    AuthResponse login(LoginRequest request);
    void     verifyEmail(String token);
    void     resendVerifyEmail(String email);
}