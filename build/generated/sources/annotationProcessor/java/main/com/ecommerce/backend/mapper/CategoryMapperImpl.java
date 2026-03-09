package com.ecommerce.backend.mapper;

import com.ecommerce.backend.dto.response.CategoryResponse;
import com.ecommerce.backend.entity.Category;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2026-03-06T09:58:24+0700",
    comments = "version: 1.6.2, compiler: IncrementalProcessingEnvironment from gradle-language-java-9.3.1.jar, environment: Java 25.0.2 (Oracle Corporation)"
)
@Component
public class CategoryMapperImpl implements CategoryMapper {

    @Override
    public CategoryResponse toResponse(Category category) {
        if ( category == null ) {
            return null;
        }

        CategoryResponse.CategoryResponseBuilder categoryResponse = CategoryResponse.builder();

        categoryResponse.id( category.getId() );
        categoryResponse.name( category.getName() );
        categoryResponse.slug( category.getSlug() );
        categoryResponse.children( categoryListToCategoryResponseList( category.getChildren() ) );
        categoryResponse.createdAt( category.getCreatedAt() );

        categoryResponse.parentId( category.getParent() != null ? category.getParent().getId() : null );

        return categoryResponse.build();
    }

    protected List<CategoryResponse> categoryListToCategoryResponseList(List<Category> list) {
        if ( list == null ) {
            return null;
        }

        List<CategoryResponse> list1 = new ArrayList<CategoryResponse>( list.size() );
        for ( Category category : list ) {
            list1.add( toResponse( category ) );
        }

        return list1;
    }
}
