package coderanger.ecommerce_springboot.serviceImpl;

import coderanger.ecommerce_springboot.entity.OrderItem;
import coderanger.ecommerce_springboot.repositoris.OrderItemRepository;
import coderanger.ecommerce_springboot.services.OrderItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class OrderItemServiceImpl implements OrderItemService {

    private OrderItemRepository orderItemRepository;

    @Autowired
    public OrderItemServiceImpl(OrderItemRepository orderItemRepository) {
        this.orderItemRepository = orderItemRepository;
    }

    @Override
    public OrderItem createOrderItem(OrderItem orderItem) {

        return orderItemRepository.save(orderItem);
    }
}
