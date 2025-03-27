package com.ecommerce.project.service;

import com.ecommerce.project.entity.Cart;
import com.ecommerce.project.entity.CartItem;
import com.ecommerce.project.entity.Product;
import com.ecommerce.project.exceptions.APIException;
import com.ecommerce.project.exceptions.ResourceNotFoundException;
import com.ecommerce.project.payload.CartDTO;
import com.ecommerce.project.payload.ProductDTO;
import com.ecommerce.project.repository.CartItemRepository;
import com.ecommerce.project.repository.CartRepository;
import com.ecommerce.project.repository.ProductRepository;
import com.ecommerce.project.util.AuthUtil;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Service
public class CartServiceImpl implements CartService {
    private  CartRepository cartRepository;
    private ProductRepository productRepository;
    private CartItemRepository cartItemRepository;

    @Autowired
    private AuthUtil authUtil;
    @Autowired
    private ModelMapper modelMapper;

    public CartServiceImpl(CartRepository cartRepository, ProductRepository productRepository, CartItemRepository cartItemRepository) {
        this.cartRepository = cartRepository;
        this.productRepository = productRepository;
        this.cartItemRepository = cartItemRepository;
    }
    @Transactional
    @Override
    public CartDTO addProductToCart(Long productId, Integer quantity) {
       Cart cart= createCart();
       Product product= productRepository.findById(productId).orElseThrow(
               ()-> new ResourceNotFoundException("product","productId",productId));

        CartItem cartItem=cartItemRepository.findCartItemByProductIdAndCartId(cart.getCartId(),productId);

        if (cartItem != null) {
            throw new APIException("Product " + product.getProductName() + " already exists in cart");
        }

        if (product.getQuantity() == 0) {
            throw new APIException("Product"+product.getProductName()+" is empty");
        }
        if (product.getQuantity() < quantity) {
            throw new APIException("Please make order of the "+product.getProductName()+" less than or equal to the quantity " +product.getQuantity()+".");
        }

        CartItem newCartItem= new CartItem();
        newCartItem.setProduct(product);
        newCartItem.setQuantity(quantity);
        newCartItem.setCart(cart);
        newCartItem.setDiscount(product.getDiscount());
        newCartItem.setProductPrice(product.getSpecialPrice());
        cart.getCartItems().add(newCartItem);

        cartItemRepository.save(newCartItem);

        product.setQuantity(product.getQuantity()-quantity);
        productRepository.save(product);

        cart.setTotalPrice(BigDecimal.valueOf(cart.getTotalPrice() + (product.getSpecialPrice() * quantity))
                .setScale(2, RoundingMode.HALF_UP)
                .doubleValue());
        cartRepository.save(cart);

        CartDTO cartDTO = modelMapper.map(cart, CartDTO.class);
        List<CartItem> cartItems=cart.getCartItems();

        Stream<ProductDTO> productDTOStream = cartItems.stream().map(item ->{
            ProductDTO map = modelMapper.map(item.getProduct(), ProductDTO.class);
            map.setQuantity(item.getQuantity());
            return map;
        });

        cartDTO.setProducts(productDTOStream.toList());
        return cartDTO;
    }

    @Override
    public List<CartDTO> getAllCarts() {
        List<Cart> carts = cartRepository.findAll();

        if (carts.isEmpty()) {
            throw new APIException("No carts exist");
        }

        List<CartDTO> cartDTOS = carts.stream().map(cart -> {
            CartDTO cartDTO = modelMapper.map(cart, CartDTO.class);

            // Correct mapping of ProductDTO list
            List<ProductDTO> productDTOList = cart.getCartItems()
                    .stream()
                    .map(cartItem -> {
                        ProductDTO productDTO = modelMapper.map(cartItem.getProduct(), ProductDTO.class);
                        productDTO.setQuantity(cartItem.getQuantity());
                        return productDTO;
                    })
                    .collect(Collectors.toList());

            cartDTO.setProducts(productDTOList);
            return cartDTO;
        }).collect(Collectors.toList());

        return cartDTOS;

    }

    @Override
    public CartDTO getCart(String emailId, Long cartId) {
        Cart cart= cartRepository.findCartByEmailAndCartId(emailId,cartId);
        if (cart == null) {
            throw new ResourceNotFoundException("cart","cartId",cartId);
        }
        CartDTO cartDTO = modelMapper.map(cart, CartDTO.class);
        cart.getCartItems().forEach(cartItem -> {
            cartItem.getProduct().setQuantity(cartItem.getQuantity());
        });
        List<ProductDTO> products=cart.getCartItems().stream()
                .map(p-> modelMapper.map(p.getProduct(),ProductDTO.class))
                .toList();
        cartDTO.setProducts(products);
        return cartDTO;
    }

    @Transactional
    @Override
    public CartDTO updateProductQuantityInCart(Long productId, Integer quantity) {
       String emailId = authUtil.loggedInEmail();
       Cart userCart = cartRepository.findCartByEmail(emailId);
       Long cartId =userCart.getCartId();

       Cart cart =cartRepository.findById(cartId).orElseThrow(
               ()-> new ResourceNotFoundException("cart","cartId",cartId)
       );

       Product product = productRepository.findById(productId).orElseThrow(
               ()-> new ResourceNotFoundException("product","productId",productId)
       );
       if (product.getQuantity() == 0) {
           throw new APIException("Product " + product.getProductName()+" is empty");
       }
       if (product.getQuantity() < quantity) {
           throw new APIException("Please make order of the "+product.getProductName()+" less than or equal to the quantity " +product.getQuantity()+".");
       }
        CartItem cartItem = cartItemRepository.findCartItemByProductIdAndCartId(cartId, productId);
       if (cartItem == null) {
           throw new APIException("Product " + product.getProductName()+" does not exist in cart");
       }

       int newQuantity = cartItem.getQuantity() + quantity;

       if (newQuantity < 0) {
           throw new APIException("Quantity cannot be negative");
       }
       if (newQuantity == 0) {
           deleteProductFromCart(productId, cartId);
       }else {

           cartItem.setProductPrice(product.getSpecialPrice());
           cartItem.setQuantity(cartItem.getQuantity() + quantity);
           cartItem.setDiscount(product.getDiscount());
           cart.setTotalPrice(cart.getTotalPrice() + (product.getSpecialPrice() * quantity));
           cartRepository.save(cart);
       }
       CartItem updatedCartItem = cartItemRepository.save(cartItem);
       if (updatedCartItem.getQuantity()==0){
           cartItemRepository.deleteById(updatedCartItem.getCartItemId());
       }
       CartDTO cartDTO = modelMapper.map(cart, CartDTO.class);
       List<CartItem> cartItems=cart.getCartItems();

       Stream<ProductDTO> productDTOStream=cartItems.stream().map(item ->{
           ProductDTO map = modelMapper.map(item.getProduct(), ProductDTO.class);
           map.setQuantity(item.getQuantity());
           return map;
       });
       cartDTO.setProducts(productDTOStream.toList());
       return cartDTO;
    }

    @Transactional
    @Override
    public String deleteProductFromCart(Long cartId, Long productId) {
        Cart cart=cartRepository.findById(cartId).orElseThrow(
                ()-> new ResourceNotFoundException("cart","cartId",cartId)
        );
        CartItem cartItem=cartItemRepository.findCartItemByProductIdAndCartId(cartId,productId);

        if (cartItem == null) {
            throw new ResourceNotFoundException("product","productId",productId);
        }

        cart.setTotalPrice(cart.getTotalPrice() - (cartItem.getProductPrice()*cartItem.getQuantity()));

//        Product product= cartItem.getProduct();
//        product.setQuantity(product.getQuantity() - cartItem.getQuantity());

        cartItemRepository.deleteCartItemByProductIdAndCartId(cartId,productId);
        return "Product " + cartItem.getProduct().getProductName()+" deleted from cart";

    }

    @Override
    public void updateProductInCarts(Long cartId, Long productId) {
        Cart cart = cartRepository.findById(cartId).orElseThrow(
                ()-> new ResourceNotFoundException("cart","cartId",cartId)
        );

        Product product = productRepository.findById(productId).orElseThrow(
                ()-> new ResourceNotFoundException("product","productId",productId)
        );

        CartItem cartItem= cartItemRepository.findCartItemByProductIdAndCartId(cartId,productId);

        if (cartItem == null) {
            throw new APIException("Product " + product.getProductName()+" does not exist in cart");
        }

        double cartPrice = cart.getTotalPrice()
                -(cartItem.getProductPrice()*cartItem.getQuantity());

        cartItem.setProductPrice(product.getSpecialPrice());

        cart.setTotalPrice(cartPrice
                +(cartItem.getProductPrice()*cartItem.getQuantity()));
        cartItemRepository.save(cartItem);

    }

    private Cart createCart() {
        Cart userCart = cartRepository.findCartByEmail(authUtil.loggedInEmail());
        if (userCart != null) {
            return userCart;
        }
        Cart cart = new Cart();
        cart.setTotalPrice(0.0);
        cart.setUser(authUtil.loggedInUser());
        return cartRepository.save(cart);
    }
}
