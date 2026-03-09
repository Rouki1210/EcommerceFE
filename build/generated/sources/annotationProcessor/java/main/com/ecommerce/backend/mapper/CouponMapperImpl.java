package com.ecommerce.backend.mapper;

import com.ecommerce.backend.dto.response.CouponResponse;
import com.ecommerce.backend.entity.Coupon;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2026-03-06T09:03:08+0700",
    comments = "version: 1.6.2, compiler: IncrementalProcessingEnvironment from gradle-language-java-9.3.1.jar, environment: Java 25.0.2 (Oracle Corporation)"
)
@Component
public class CouponMapperImpl implements CouponMapper {

    @Override
    public CouponResponse toResponse(Coupon coupon) {
        if ( coupon == null ) {
            return null;
        }

        CouponResponse.CouponResponseBuilder couponResponse = CouponResponse.builder();

        couponResponse.id( coupon.getId() );
        couponResponse.code( coupon.getCode() );
        couponResponse.type( coupon.getType() );
        couponResponse.value( coupon.getValue() );
        couponResponse.maxUses( coupon.getMaxUses() );
        couponResponse.usedCount( coupon.getUsedCount() );
        couponResponse.minOrder( coupon.getMinOrder() );
        couponResponse.expiresAt( coupon.getExpiresAt() );

        return couponResponse.build();
    }
}
