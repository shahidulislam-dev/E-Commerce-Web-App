package coderanger.ecommerce_springboot.services;

import coderanger.ecommerce_springboot.entity.Address;
import coderanger.ecommerce_springboot.entity.Order;
import coderanger.ecommerce_springboot.entity.User;
import coderanger.ecommerce_springboot.exception.OrderException;

import java.util.List;

public interface OrderService {
    Order createOrder(User user, Address shippingAddress);

    Order findOrderById(Long orderId) throws OrderException;

    List<Order> usersOrderHistory(Long userId);

    Order placeOrder(Long orderId) throws OrderException;

    Order confirmedOrder(Long orderId) throws OrderException;

    Order shippedOrder(Long orderId) throws OrderException;

    Order deliveredOrder(Long orderId) throws OrderException;

    Order canceledOrder(Long orderId) throws OrderException;

    List<Order> getAllOrders();

    public void deleteOrder(Long orderId) throws OrderException;
}