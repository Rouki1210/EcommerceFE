package com.ecommerce.backend.dto.response;

import com.ecommerce.backend.enums.Role;
import lombok.Builder;
import lombok.Data;

import java.util.UUID;

@Data
@Builder
public class AuthResponse {
    private Long    id;
    private String  email;
    private String  fullName;
    private String  avatarUrl;
    private Role    role;
    private String  accessToken;
    private String  tokenType;
}