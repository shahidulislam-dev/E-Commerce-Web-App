package coderanger.ecommerce_springboot.repositoris;

import coderanger.ecommerce_springboot.entity.Reviews;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;


public interface ReviewRepository extends JpaRepository<Reviews, Long> {

    @Query("SELECT r FROM Reviews r WHERE r.product.id = :productId")
    List<Reviews> getAllProductsReview(@Param("productId") Long productId);

}
