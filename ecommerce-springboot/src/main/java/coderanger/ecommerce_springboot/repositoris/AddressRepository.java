package coderanger.ecommerce_springboot.repositoris;

import coderanger.ecommerce_springboot.entity.Address;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AddressRepository extends JpaRepository<Address, Long> {
}
