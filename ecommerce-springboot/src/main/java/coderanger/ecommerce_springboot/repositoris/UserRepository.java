package coderanger.ecommerce_springboot.repositoris;

import coderanger.ecommerce_springboot.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByEmail(String email);

}
