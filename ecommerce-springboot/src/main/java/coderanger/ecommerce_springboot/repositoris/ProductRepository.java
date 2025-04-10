package coderanger.ecommerce_springboot.repositoris;

import coderanger.ecommerce_springboot.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {



//    @Query("SELECT p FROM Products p "+
//    "WHERE (p.category.name = :category OR :category = '')"+
//    "AND ((:minPrice IS NULL AND :maxPrice IS NULL) OR (p.discountPrice BETWEEN :minPrice AND :maxPrice))"+
//    "AND (:minDiscount IS NULL OR p.discountPercent >= :minDiscount)"+
//    "ORDER BY "+
//    "CASE WHEN :sort = 'price_low' THEN p.discountPrice END ASC ,"+
//    "CASE when :sort = 'price_high' THEN p.discountPrice END DESC ")

    @Query(value = "SELECT p.* " +
            "FROM products p " +
            "JOIN category c ON p.category_id = c.id " +
            "WHERE (c.name = :category OR :category = '') " +
            "AND ((:minPrice IS NULL AND :maxPrice IS NULL) OR (p.discount_price BETWEEN :minPrice AND :maxPrice)) " +
            "AND (:minDiscount IS NULL OR p.discount_percent >= :minDiscount) " +
            "ORDER BY " +
            "CASE WHEN :sort = 'price_low' THEN p.discount_price END ASC, " +
            "CASE WHEN :sort = 'price_high' THEN p.discount_price END DESC",
            nativeQuery = true)
    List<Product> filterProducts(@Param("category") String category, @Param("minPrice") Integer minPrice,
                                 @Param("maxPrice") Integer maxPrice, @Param("minDiscount") Integer minDiscount,
                                 @Param("sort") String sort);
}
