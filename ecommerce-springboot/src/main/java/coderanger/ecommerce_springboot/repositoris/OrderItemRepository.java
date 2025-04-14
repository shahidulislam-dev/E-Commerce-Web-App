package coderanger.ecommerce_springboot.repositoris;

import coderanger.ecommerce_springboot.entity.OrderItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderItemRepository extends JpaRepository<OrderItem, Long> {
}
