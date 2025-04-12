package coderanger.ecommerce_springboot.repositoris;

import coderanger.ecommerce_springboot.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface CategoryRepository extends JpaRepository<Category, Long> {
    Category findByName(String name);

    @Query("SELECT c FROM Category c WHERE c.name = :name AND c.parentCategory.name = :parentName")
    Category findByNameAndParent(@Param("name") String name, @Param("parentName") String parentName);
}
