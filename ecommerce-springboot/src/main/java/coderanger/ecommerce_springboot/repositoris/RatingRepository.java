package coderanger.ecommerce_springboot.repositoris;

import coderanger.ecommerce_springboot.entity.Ratings;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface RatingRepository extends JpaRepository<Ratings, Long> {

    @Query("SELECT r FROM Ratings r WHERE r.product.id =:productId")
    List<Ratings> getAllProductsRating(@Param("productId") Long productId);
}
