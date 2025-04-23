package coderanger.ecommerce_springboot.controller;

import coderanger.ecommerce_springboot.entity.Address;
import coderanger.ecommerce_springboot.entity.Orders;
import coderanger.ecommerce_springboot.entity.User;
import coderanger.ecommerce_springboot.exception.OrderException;
import coderanger.ecommerce_springboot.exception.UserException;
import coderanger.ecommerce_springboot.services.OrderService;
import coderanger.ecommerce_springboot.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    private final OrderService orderService;
    private final UserService userService;

    @Autowired
    public OrderController(OrderService orderService, UserService userService) {
        this.orderService = orderService;
        this.userService = userService;
    }

    @PostMapping("/create")
    public ResponseEntity<Orders> createOrder(@RequestBody Address shippingAddress, @RequestHeader("Authorization") String jwt) throws UserException{
        User user = userService.findUserProfileByJwt(jwt);

        Orders order = orderService.createOrder(user, shippingAddress);
        return new ResponseEntity<>(order, HttpStatus.CREATED);
    }

    @GetMapping("/user/order/history")
    public ResponseEntity<List<Orders>> userOrderHistory(@RequestHeader("Authorization") String jwt) throws UserException{
        User user = userService.findUserProfileByJwt(jwt);

        List<Orders> orders = orderService.usersOrderHistory(user.getId());

        return new ResponseEntity<>(orders, HttpStatus.OK);
    }

    @GetMapping("/find/{id}")
    public ResponseEntity<Orders> findOrderById(@PathVariable("id") Long orderId, @RequestHeader("Authorization") String jwt) throws UserException, OrderException {
        User user = userService.findUserProfileByJwt(jwt);

        Orders order = orderService.findOrderById(orderId);

        return new ResponseEntity<>(order, HttpStatus.OK);
    }
}
