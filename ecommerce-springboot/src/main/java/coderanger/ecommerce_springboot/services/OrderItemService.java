package coderanger.ecommerce_springboot.services;

import coderanger.ecommerce_springboot.entity.OrderItem;

public interface OrderItemService {
    OrderItem createOrderItem(OrderItem orderItem);
}
