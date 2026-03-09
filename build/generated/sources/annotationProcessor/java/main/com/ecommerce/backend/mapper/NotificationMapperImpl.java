package com.ecommerce.backend.mapper;

import com.ecommerce.backend.dto.response.NotificationResponse;
import com.ecommerce.backend.entity.Notification;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2026-03-06T09:03:08+0700",
    comments = "version: 1.6.2, compiler: IncrementalProcessingEnvironment from gradle-language-java-9.3.1.jar, environment: Java 25.0.2 (Oracle Corporation)"
)
@Component
public class NotificationMapperImpl implements NotificationMapper {

    @Override
    public NotificationResponse toResponse(Notification notification) {
        if ( notification == null ) {
            return null;
        }

        NotificationResponse.NotificationResponseBuilder notificationResponse = NotificationResponse.builder();

        notificationResponse.id( notification.getId() );
        notificationResponse.type( notification.getType() );
        notificationResponse.title( notification.getTitle() );
        notificationResponse.body( notification.getBody() );
        notificationResponse.refId( notification.getRefId() );
        notificationResponse.createdAt( notification.getCreatedAt() );

        return notificationResponse.build();
    }
}
