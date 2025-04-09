package coderanger.ecommerce_springboot.repositoris;

import coderanger.ecommerce_springboot.entity.Cart;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CartRepository extends JpaRepository<Cart, Long> {

}
