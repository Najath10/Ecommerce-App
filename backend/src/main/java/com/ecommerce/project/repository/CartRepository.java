package com.ecommerce.project.repository;

import com.ecommerce.project.entity.Cart;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CartRepository extends JpaRepository<Cart, Long> {
    @Query("SELECT c  FROM Cart c WHERE c.user.email = ?1")
    Cart findCartByEmail(String email);
   @Query("SELECT c  FROM Cart c WHERE c.user.email = ?1 AND c.cartId = ?2")
    Cart findCartByEmailAndCartId(String emailId, Long cartId);

   @Query("select c from Cart  c JOIN FETCH c.cartItems ci JOIN  FETCH  ci.product p where  p.productId =?1")
    List<Cart> findCartByProductId(Long productId);


}