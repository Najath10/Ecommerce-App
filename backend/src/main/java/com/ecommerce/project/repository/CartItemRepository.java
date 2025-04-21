package com.ecommerce.project.repository;

import com.ecommerce.project.entity.Cart;
import com.ecommerce.project.entity.CartItem;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface CartItemRepository extends JpaRepository<CartItem, Long> {
    @Query("select ci from CartItem ci where ci.product.productId= ?2 AND ci.cart.cartId = ?1 ")
   CartItem  findCartItemByProductIdAndCartId(Long cartId, Long productId);

    @Modifying
    @Query("delete from CartItem ci where  ci.cart.cartId = ?1 and ci.product.productId = ?2")
    void deleteCartItemByProductIdAndCartId(Long cartId, Long productId);


    @Modifying
    @Query("DELETE FROM CartItem ci WHERE ci.cart.cartId = ?1 ")
    void deleteAllByCartId(Long cartId);

}