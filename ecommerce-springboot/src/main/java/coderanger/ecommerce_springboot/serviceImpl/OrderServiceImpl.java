package coderanger.ecommerce_springboot.serviceImpl;

import coderanger.ecommerce_springboot.entity.*;
import coderanger.ecommerce_springboot.exception.OrderException;
import coderanger.ecommerce_springboot.repositoris.*;
import coderanger.ecommerce_springboot.services.CartService;
import coderanger.ecommerce_springboot.services.OrderItemService;
import coderanger.ecommerce_springboot.services.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class OrderServiceImpl implements OrderService {

   private OrderRepository orderRepository;
   private CartService cartService;
   private AddressRepository addressRepository;
   private UserRepository userRepository;
   private OrderItemService orderItemService;
   private OrderItemRepository orderItemRepository;
    @Autowired
    public OrderServiceImpl(OrderRepository orderRepository, CartService cartService, AddressRepository addressRepository, UserRepository userRepository, OrderItemService orderItemService, OrderItemRepository orderItemRepository) {
        this.orderRepository = orderRepository;
        this.cartService = cartService;
        this.addressRepository = addressRepository;
        this.userRepository = userRepository;
        this.orderItemService = orderItemService;
        this.orderItemRepository = orderItemRepository;
    }





    @Override
    public Orders createOrder(User user, Address shippingAddress) {
        shippingAddress.setUser(user);
        Address address = addressRepository.save(shippingAddress);
        user.getAddresses().add(address);
        userRepository.save(user);

        Cart cart = cartService.findUserCart(user.getId());
        List<OrderItem> orderItems = new ArrayList<>();

        for(CartItem item : cart.getCartItems()){
            OrderItem orderItem = new OrderItem();

            orderItem.setPrice(item.getPrice());
            orderItem.setProduct(item.getProduct());
            orderItem.setQuantity(item.getQuantity());
            orderItem.setSize(item.getSize());
            orderItem.setUserId(item.getUserId());
            orderItem.setDiscountedPrice(item.getDiscountPrice());

            OrderItem createdOrderItem = orderItemRepository.save(orderItem);
            orderItems.add(createdOrderItem);
        }

        Orders createdOrder = new Orders();
        createdOrder.setUser(user);
        createdOrder.setOrderItems(orderItems);
        createdOrder.setTotalPrice(cart.getTotalPrice());
        createdOrder.setTotalDiscountedPrice(cart.getTotalDiscountPrice());
        createdOrder.setDiscount(cart.getDiscount());
        createdOrder.setTotalItem(cart.getTotalItem());

        createdOrder.setShippingAddress(address);
        createdOrder.setOrderDate(LocalDateTime.now());
        createdOrder.setOrderStatus("PENDING");
        createdOrder.getPaymentDetails().setPaymentStatus("PENDING");
        createdOrder.setCreatedAt(LocalDateTime.now());

        Orders savedOrder = orderRepository.save(createdOrder);

        for (OrderItem item : orderItems){
            item.setOrder(savedOrder);
            orderItemRepository.save(item);
        }
        return savedOrder;
    }

    @Override
    public Orders findOrderById(Long orderId) throws OrderException {
        Optional<Orders> opt = orderRepository.findById(orderId);

        if(opt.isPresent()){
            return opt.get();
        }
        throw new OrderException("Order Not Exist With This Order Id: "+orderId);
    }

    @Override
    public List<Orders> usersOrderHistory(Long userId) {
        List<Orders> orders = orderRepository.getUsersOrders(userId);
        return orders;
    }

    @Override
    public Orders placeOrder(Long orderId) throws OrderException {
        Orders orders = findOrderById(orderId);
        orders.setOrderStatus("PLACED");
        orders.getPaymentDetails().setPaymentStatus("COMPLETED");
        return orderRepository.save(orders);
    }

    @Override
    public Orders confirmedOrder(Long orderId) throws OrderException {
        Orders orders = findOrderById(orderId);
        orders.setOrderStatus("CONFIRMED");
        return orderRepository.save(orders);
    }

    @Override
    public Orders shippedOrder(Long orderId) throws OrderException {
        Orders orders = findOrderById(orderId);
        orders.setOrderStatus("SHIPPED");
        return orderRepository.save(orders);
    }

    @Override
    public Orders deliveredOrder(Long orderId) throws OrderException {
        Orders orders = findOrderById(orderId);
        orders.setOrderStatus("DELIVERED");
        return orderRepository.save(orders);
    }

    @Override
    public Orders canceledOrder(Long orderId) throws OrderException {
        Orders orders = findOrderById(orderId);
        orders.setOrderStatus("CANCELLED");
        return orderRepository.save(orders);
    }

    @Override
    public List<Orders> getAllOrders() {
        return orderRepository.findAll();
    }

    @Override
    public void deleteOrder(Long orderId) throws OrderException {
        Orders orders = findOrderById(orderId);
        orderRepository.deleteById(orderId);
    }
}
