package coderanger.ecommerce_springboot.controller;

import coderanger.ecommerce_springboot.entity.Product;
import coderanger.ecommerce_springboot.exception.ProductException;
import coderanger.ecommerce_springboot.services.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class ProductController {

    private ProductService productService;

    @Autowired
    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping("/products")
    public ResponseEntity<Page<Product>> getAllProducts(
            @RequestParam String category,
            @RequestParam List<String> colors,
            @RequestParam List<String> size,
            @RequestParam Integer minPrice,
            @RequestParam Integer maxPrice,
            @RequestParam Integer minDiscount,
            @RequestParam String stock,
            @RequestParam String sort,
            @RequestParam Integer pageNumber,
            @RequestParam Integer pageSize
    ) {
        Page<Product> products = productService.getAllProducts(
                category, colors, size, minPrice, maxPrice,
                minDiscount, stock, sort, pageNumber, pageSize
        );
        return new ResponseEntity<>(products, HttpStatus.OK);
    }

    @GetMapping("/products/id/{productId}")
    public ResponseEntity<Product> findProductByIdHandler(@PathVariable Long productId) throws ProductException{
        Product product = productService.findProductById(productId);
        return new ResponseEntity<Product>(product, HttpStatus.OK);
    }

}
