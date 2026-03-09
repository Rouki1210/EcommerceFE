package com.ecommerce.backend.mapper;

import com.ecommerce.backend.dto.response.WishlistItemResponse;
import com.ecommerce.backend.entity.Product;
import com.ecommerce.backend.entity.Wishlist;
import java.math.BigDecimal;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2026-03-06T10:12:10+0700",
    comments = "version: 1.6.2, compiler: IncrementalProcessingEnvironment from gradle-language-java-9.3.1.jar, environment: Java 25.0.2 (Oracle Corporation)"
)
@Component
public class WishlistMapperImpl implements WishlistMapper {

    @Override
    public WishlistItemResponse toResponse(Wishlist w) {
        if ( w == null ) {
            return null;
        }

        WishlistItemResponse.WishlistItemResponseBuilder wishlistItemResponse = WishlistItemResponse.builder();

        wishlistItemResponse.productId( wProductId( w ) );
        wishlistItemResponse.productName( wProductName( w ) );
        wishlistItemResponse.productSlug( wProductSlug( w ) );
        wishlistItemResponse.price( wProductPrice( w ) );
        wishlistItemResponse.stock( wProductStock( w ) );
        wishlistItemResponse.isActive( wProductActive( w ) );
        wishlistItemResponse.addedAt( w.getCreatedAt() );
        wishlistItemResponse.id( w.getId() );

        wishlistItemResponse.productImage( getFirstImageUrl(w) );

        return wishlistItemResponse.build();
    }

    private Long wProductId(Wishlist wishlist) {
        Product product = wishlist.getProduct();
        if ( product == null ) {
            return null;
        }
        return product.getId();
    }

    private String wProductName(Wishlist wishlist) {
        Product product = wishlist.getProduct();
        if ( product == null ) {
            return null;
        }
        return product.getName();
    }

    private String wProductSlug(Wishlist wishlist) {
        Product product = wishlist.getProduct();
        if ( product == null ) {
            return null;
        }
        return product.getSlug();
    }

    private BigDecimal wProductPrice(Wishlist wishlist) {
        Product product = wishlist.getProduct();
        if ( product == null ) {
            return null;
        }
        return product.getPrice();
    }

    private Integer wProductStock(Wishlist wishlist) {
        Product product = wishlist.getProduct();
        if ( product == null ) {
            return null;
        }
        return product.getStock();
    }

    private boolean wProductActive(Wishlist wishlist) {
        Product product = wishlist.getProduct();
        if ( product == null ) {
            return false;
        }
        return product.isActive();
    }
}
