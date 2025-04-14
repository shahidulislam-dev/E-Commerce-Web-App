package coderanger.ecommerce_springboot.services;

import coderanger.ecommerce_springboot.entity.Address;
import coderanger.ecommerce_springboot.entity.Orders;
import coderanger.ecommerce_springboot.entity.User;
import coderanger.ecommerce_springboot.exception.OrderException;

import java.util.List;

public interface OrderService {
    Orders createOrder(User user, Address shippingAddress);

    Orders findOrderById(Long orderId) throws OrderException;

    List<Orders> usersOrderHistory(Long userId);

    Orders placeOrder(Long orderId) throws OrderException;

    Orders confirmedOrder(Long orderId) throws OrderException;

    Orders shippedOrder(Long orderId) throws OrderException;

    Orders deliveredOrder(Long orderId) throws OrderException;

    Orders canceledOrder(Long orderId) throws OrderException;

    List<Orders> getAllOrders();

    void deleteOrder(Long orderId) throws OrderException;
}