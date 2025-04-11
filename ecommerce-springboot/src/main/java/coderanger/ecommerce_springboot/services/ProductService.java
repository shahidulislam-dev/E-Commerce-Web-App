package coderanger.ecommerce_springboot.services;

import coderanger.ecommerce_springboot.entity.Product;
import coderanger.ecommerce_springboot.exception.ProductException;
import coderanger.ecommerce_springboot.request.CreateProductRequest;
import org.springframework.data.domain.Page;

import java.util.List;

public interface ProductService {
    public Product createProduct(CreateProductRequest createProductRequest);

    public String deleteProduct(Long productId) throws ProductException;

    public Product updateProduct(Long productId, Product req) throws ProductException;

    public Product findProductById(Long id) throws ProductException;

    public List<Product> findProductByCategory(String category);

    public Page<Product> getAllProducts(String category, List<String> colors, List<String> size, Integer minPrice, Integer maxPrice,
                                        Integer minDiscount, String stock, String sort, Integer pageNUmber, Integer pageSize);

    public List<Product> findAllProducts();
}
