package com.ecommerce.project.controller;

import com.ecommerce.project.entity.Cart;
import com.ecommerce.project.payload.CartDTO;
import com.ecommerce.project.repository.CartRepository;
import com.ecommerce.project.service.CartService;
import com.ecommerce.project.service.CartServiceImpl;
import com.ecommerce.project.util.AuthUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class CartController {

    @Autowired
    private AuthUtil authUtil;

    private CartService cartService;
    private CartRepository cartRepository;
    public CartController(CartService cartService, CartRepository cartRepository) {
        this.cartService = cartService;
        this.cartRepository = cartRepository;
    }

    @PostMapping("/cart/product/{productId}/quantity/{quantity}")
    public ResponseEntity<CartDTO> addProductToCart(@PathVariable Long productId, @PathVariable Integer quantity) {
        CartDTO cartDTO= cartService.addProductToCart(productId,quantity);
        return new ResponseEntity<>(cartDTO, HttpStatus.CREATED);

    }
    @GetMapping("/carts")
    public ResponseEntity<List<CartDTO>> getAllCarts() {
       List<CartDTO> cartDTOS= cartService.getAllCarts();
       return new ResponseEntity<>(cartDTOS, HttpStatus.OK);
    }

    @GetMapping("/carts/user/cart")
    public ResponseEntity<CartDTO> getCartById() {
        String emailId = authUtil.loggedInEmail();
        Cart cart=cartRepository.findCartByEmail(emailId);
        Long cartId=cart.getCartId();
       CartDTO cartDTOS= cartService.getCart(emailId,cartId);
       return new ResponseEntity<>(cartDTOS, HttpStatus.OK);
    }
    @PutMapping("/cart/products/{productId}/quantity/{operation}")
    public ResponseEntity<CartDTO> updateProductQuantity(@PathVariable Long productId,
                                                         @PathVariable String operation) {
         CartDTO cartDTO=cartService.updateProductQuantityInCart(productId,
                operation.equalsIgnoreCase("delete")? -1: 1 );
         return new ResponseEntity<>(cartDTO, HttpStatus.OK);
    }
    @DeleteMapping("/carts/{cartId}/product/{productId}")
    public ResponseEntity<?> deleteProductFromCart(@PathVariable Long cartId, @PathVariable Long productId) {
        String status=cartService.deleteProductFromCart(cartId,productId);
        return new ResponseEntity<>(status, HttpStatus.OK);
    }

}
