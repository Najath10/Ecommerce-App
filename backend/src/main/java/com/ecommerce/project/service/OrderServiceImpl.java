package com.ecommerce.project.service;

import com.ecommerce.project.entity.*;
import com.ecommerce.project.exceptions.APIException;
import com.ecommerce.project.exceptions.ResourceNotFoundException;
import com.ecommerce.project.payload.OrderDTO;
import com.ecommerce.project.payload.OrderItemDTO;
import com.ecommerce.project.repository.*;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
public class OrderServiceImpl implements OrderService {
    @Autowired
    private ModelMapper modelMapper;
    @Autowired
    private CartServiceImpl cartService;
    private final CartRepository cartRepository;
    private final OrderRepository orderRepository;
    private final AddressRepository addressRepository;
    private final OrderItemRepository orderItemRepository;
    private final PaymentRepository paymentRepository;
    private final ProductRepository productRepository;

    public OrderServiceImpl(CartRepository cartRepository, OrderRepository orderRepository, AddressRepository addressRepository, OrderItemRepository orderItemRepository, PaymentRepository paymentRepository, ProductRepository productRepository) {
        this.cartRepository = cartRepository;
        this.orderRepository = orderRepository;
        this.addressRepository = addressRepository;
        this.orderItemRepository = orderItemRepository;
        this.paymentRepository = paymentRepository;
        this.productRepository = productRepository;
    }


    @Override
    @Transactional
    public OrderDTO placeOrder(String emailId, Long addressId, String paymentMethod, String pgPaymentId, String pgName, String pgStatus, String pgResponseMessage) {
        Cart cart=cartRepository.findCartByEmail(emailId);
        if(cart==null){
            throw new ResourceNotFoundException("Cart","emailId",emailId);
        }

        Address address=addressRepository.findById(addressId)
                .orElseThrow(() -> new ResourceNotFoundException("Address","id",addressId));

        Order order=new Order();
        order.setEmail(emailId);
        order.setOrderDate(LocalDate.now());
        order.setTotalAmount(BigDecimal.valueOf(cart.getTotalPrice())
                .setScale(2, RoundingMode.HALF_UP)
                .doubleValue());

        order.setOrderStatus("Order Accepted !");
        order.setAddress(address);

        Payment payment=new Payment(paymentMethod,pgPaymentId,pgName,pgStatus,pgResponseMessage);
        payment.setOrder(order);
        payment = paymentRepository.save(payment);
        order.setPayment(payment);

        Order savedOrder=orderRepository.save(order);

        List<CartItem> cartItems = cart.getCartItems();
        if (cartItems.isEmpty()) {
            throw new APIException("Cart is empty");
        }
        List<OrderItem> orderItems = new ArrayList<>();
        for (CartItem cartItem : cartItems) {
            OrderItem orderItem=new OrderItem();
            orderItem.setProduct(cartItem.getProduct());
            orderItem.setQuantity(cartItem.getQuantity());
            orderItem.setDiscount(cartItem.getDiscount());
            orderItem.setOrderedProductPrice(BigDecimal.valueOf(cartItem.getProductPrice())
                    .setScale(2, RoundingMode.HALF_UP)
                    .doubleValue());
            orderItem.setOrder(savedOrder);
            orderItems.add(orderItem);
        }

        orderItems =orderItemRepository.saveAll(orderItems);
        cart.getCartItems().forEach(item ->{
            int quantity = item.getQuantity();
            Product product=item.getProduct();

            product.setQuantity(product.getQuantity() - quantity);
            productRepository.save(product);

            cartService.deleteProductFromCart(cart.getCartId(),item.getProduct().getProductId());

        });

        OrderDTO orderDTO = modelMapper.map(savedOrder, OrderDTO.class);
        orderItems.forEach(item -> {
            OrderItemDTO orderItemDTO = modelMapper.map(item, OrderItemDTO.class);

            // ✅ Manually set the correct ordered quantity
            orderItemDTO.getProduct().setQuantity(item.getQuantity());

            orderDTO.getOrderItems().add(orderItemDTO);
        });

        orderDTO.setAddressId(addressId);
        return orderDTO;
    }
}
