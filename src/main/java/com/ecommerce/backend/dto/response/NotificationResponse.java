package com.ecommerce.backend.dto.response;

import com.ecommerce.backend.enums.NotificationType;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
@Builder
public class NotificationResponse {
    private Long             id;
    private NotificationType type;
    private String           title;
    private String           body;
    private boolean          isRead;
    private Long             refId;
    private LocalDateTime    createdAt;
}