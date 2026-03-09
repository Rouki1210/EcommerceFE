package com.ecommerce.backend.mapper;

import com.ecommerce.backend.dto.response.OrderItemResponse;
import com.ecommerce.backend.dto.response.OrderResponse;
import com.ecommerce.backend.dto.response.OrderStatusLogResponse;
import com.ecommerce.backend.entity.Order;
import com.ecommerce.backend.entity.OrderItem;
import com.ecommerce.backend.entity.OrderStatusLog;
import com.ecommerce.backend.entity.Product;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2026-03-06T15:14:59+0700",
    comments = "version: 1.6.2, compiler: IncrementalProcessingEnvironment from gradle-language-java-9.3.1.jar, environment: Java 25.0.2 (Oracle Corporation)"
)
@Component
public class OrderMapperImpl implements OrderMapper {

    @Override
    public OrderResponse toResponse(Order order) {
        if ( order == null ) {
            return null;
        }

        OrderResponse.OrderResponseBuilder orderResponse = OrderResponse.builder();

        orderResponse.items( orderItemListToOrderItemResponseList( order.getItems() ) );
        orderResponse.statusLogs( orderStatusLogListToOrderStatusLogResponseList( order.getStatusLogs() ) );
        orderResponse.id( order.getId() );
        orderResponse.status( order.getStatus() );
        orderResponse.subtotal( order.getSubtotal() );
        orderResponse.discountAmount( order.getDiscountAmount() );
        orderResponse.total( order.getTotal() );
        orderResponse.shippingName( order.getShippingName() );
        orderResponse.shippingPhone( order.getShippingPhone() );
        orderResponse.shippingAddress( order.getShippingAddress() );
        orderResponse.note( order.getNote() );
        orderResponse.createdAt( order.getCreatedAt() );
        orderResponse.updatedAt( order.getUpdatedAt() );

        orderResponse.couponCode( order.getCoupon() != null ? order.getCoupon().getCode() : null );

        return orderResponse.build();
    }

    @Override
    public OrderItemResponse toItemResponse(OrderItem item) {
        if ( item == null ) {
            return null;
        }

        OrderItemResponse.OrderItemResponseBuilder orderItemResponse = OrderItemResponse.builder();

        orderItemResponse.productId( itemProductId( item ) );
        orderItemResponse.id( item.getId() );
        orderItemResponse.productName( item.getProductName() );
        orderItemResponse.quantity( item.getQuantity() );
        orderItemResponse.unitPrice( item.getUnitPrice() );
        orderItemResponse.subtotal( item.getSubtotal() );

        return orderItemResponse.build();
    }

    @Override
    public OrderStatusLogResponse toLogResponse(OrderStatusLog log) {
        if ( log == null ) {
            return null;
        }

        OrderStatusLogResponse.OrderStatusLogResponseBuilder orderStatusLogResponse = OrderStatusLogResponse.builder();

        orderStatusLogResponse.status( log.getStatus() );
        orderStatusLogResponse.note( log.getNote() );
        orderStatusLogResponse.createdAt( log.getCreatedAt() );

        orderStatusLogResponse.changedBy( log.getChangedBy() != null ? log.getChangedBy().getFullName() : "System" );

        return orderStatusLogResponse.build();
    }

    protected List<OrderItemResponse> orderItemListToOrderItemResponseList(List<OrderItem> list) {
        if ( list == null ) {
            return null;
        }

        List<OrderItemResponse> list1 = new ArrayList<OrderItemResponse>( list.size() );
        for ( OrderItem orderItem : list ) {
            list1.add( toItemResponse( orderItem ) );
        }

        return list1;
    }

    protected List<OrderStatusLogResponse> orderStatusLogListToOrderStatusLogResponseList(List<OrderStatusLog> list) {
        if ( list == null ) {
            return null;
        }

        List<OrderStatusLogResponse> list1 = new ArrayList<OrderStatusLogResponse>( list.size() );
        for ( OrderStatusLog orderStatusLog : list ) {
            list1.add( toLogResponse( orderStatusLog ) );
        }

        return list1;
    }

    private Long itemProductId(OrderItem orderItem) {
        Product product = orderItem.getProduct();
        if ( product == null ) {
            return null;
        }
        return product.getId();
    }
}
