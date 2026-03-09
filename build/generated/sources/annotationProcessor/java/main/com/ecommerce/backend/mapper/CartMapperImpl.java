package com.ecommerce.backend.mapper;

import com.ecommerce.backend.dto.response.CartItemResponse;
import com.ecommerce.backend.entity.CartItem;
import com.ecommerce.backend.entity.Product;
import java.math.BigDecimal;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2026-03-06T10:14:40+0700",
    comments = "version: 1.6.2, compiler: IncrementalProcessingEnvironment from gradle-language-java-9.3.1.jar, environment: Java 25.0.2 (Oracle Corporation)"
)
@Component
public class CartMapperImpl implements CartMapper {

    @Override
    public CartItemResponse toItemResponse(CartItem item) {
        if ( item == null ) {
            return null;
        }

        CartItemResponse.CartItemResponseBuilder cartItemResponse = CartItemResponse.builder();

        Long id = itemProductId( item );
        if ( id != null ) {
            cartItemResponse.productId( String.valueOf( id ) );
        }
        cartItemResponse.productName( itemProductName( item ) );
        cartItemResponse.productSlug( itemProductSlug( item ) );
        cartItemResponse.currentPrice( itemProductPrice( item ) );
        cartItemResponse.id( item.getId() );
        cartItemResponse.priceSnap( item.getPriceSnap() );
        cartItemResponse.quantity( item.getQuantity() );

        cartItemResponse.productImage( getFirstImageUrl(item) );
        cartItemResponse.subtotal( item.getPriceSnap().multiply(java.math.BigDecimal.valueOf(item.getQuantity())) );

        return cartItemResponse.build();
    }

    private Long itemProductId(CartItem cartItem) {
        Product product = cartItem.getProduct();
        if ( product == null ) {
            return null;
        }
        return product.getId();
    }

    private String itemProductName(CartItem cartItem) {
        Product product = cartItem.getProduct();
        if ( product == null ) {
            return null;
        }
        return product.getName();
    }

    private String itemProductSlug(CartItem cartItem) {
        Product product = cartItem.getProduct();
        if ( product == null ) {
            return null;
        }
        return product.getSlug();
    }

    private BigDecimal itemProductPrice(CartItem cartItem) {
        Product product = cartItem.getProduct();
        if ( product == null ) {
            return null;
        }
        return product.getPrice();
    }
}
