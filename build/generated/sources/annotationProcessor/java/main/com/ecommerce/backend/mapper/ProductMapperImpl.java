package com.ecommerce.backend.mapper;

import com.ecommerce.backend.dto.response.ProductImageResponse;
import com.ecommerce.backend.dto.response.ProductResponse;
import com.ecommerce.backend.entity.Product;
import com.ecommerce.backend.entity.ProductImage;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2026-03-06T10:04:07+0700",
    comments = "version: 1.6.2, compiler: IncrementalProcessingEnvironment from gradle-language-java-9.3.1.jar, environment: Java 25.0.2 (Oracle Corporation)"
)
@Component
public class ProductMapperImpl implements ProductMapper {

    @Autowired
    private CategoryMapper categoryMapper;

    @Override
    public ProductResponse toResponse(Product product) {
        if ( product == null ) {
            return null;
        }

        ProductResponse.ProductResponseBuilder productResponse = ProductResponse.builder();

        productResponse.category( categoryMapper.toResponse( product.getCategory() ) );
        productResponse.images( productImageListToProductImageResponseList( product.getImages() ) );
        productResponse.id( product.getId() );
        productResponse.name( product.getName() );
        productResponse.slug( product.getSlug() );
        productResponse.description( product.getDescription() );
        productResponse.price( product.getPrice() );
        productResponse.stock( product.getStock() );
        productResponse.ratingAvg( product.getRatingAvg() );
        productResponse.ratingCount( product.getRatingCount() );
        productResponse.createdAt( product.getCreatedAt() );
        productResponse.updatedAt( product.getUpdatedAt() );

        return productResponse.build();
    }

    @Override
    public ProductImageResponse toImageResponse(ProductImage image) {
        if ( image == null ) {
            return null;
        }

        ProductImageResponse.ProductImageResponseBuilder productImageResponse = ProductImageResponse.builder();

        productImageResponse.id( image.getId() );
        productImageResponse.url( image.getUrl() );
        productImageResponse.sortOrder( image.getSortOrder() );

        return productImageResponse.build();
    }

    protected List<ProductImageResponse> productImageListToProductImageResponseList(List<ProductImage> list) {
        if ( list == null ) {
            return null;
        }

        List<ProductImageResponse> list1 = new ArrayList<ProductImageResponse>( list.size() );
        for ( ProductImage productImage : list ) {
            list1.add( toImageResponse( productImage ) );
        }

        return list1;
    }
}
