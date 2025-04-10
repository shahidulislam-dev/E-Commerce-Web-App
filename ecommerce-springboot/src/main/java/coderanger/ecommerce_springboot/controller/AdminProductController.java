package coderanger.ecommerce_springboot.controller;

import coderanger.ecommerce_springboot.entity.Product;
import coderanger.ecommerce_springboot.exception.ProductException;
import coderanger.ecommerce_springboot.request.CreateProductRequest;
import coderanger.ecommerce_springboot.response.ApiResponse;
import coderanger.ecommerce_springboot.services.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/admin/products")
public class AdminProductController {

    private ProductService productService;

    @Autowired
    public AdminProductController(ProductService productService) {
        this.productService = productService;
    }

    @PostMapping("/create")
    public ResponseEntity<Product> createProduct(@RequestBody CreateProductRequest req){
        Product product = productService.createProduct(req);
        return new ResponseEntity<Product>(product, HttpStatus.CREATED);
    }

    @DeleteMapping("/{productId}/delete")
    public ResponseEntity<ApiResponse> deleteProducts(@PathVariable Long productId) throws ProductException{

        productService.deleteProduct(productId);
        ApiResponse res = new ApiResponse();
        res.setMessage("Product Deleted Successfully");
        res.setStatus(true);
        return new ResponseEntity<>(res, HttpStatus.OK);
    }

    @GetMapping("/all")
    public ResponseEntity<Page<Product>> getAllProducts(
            @RequestParam(required = false) String category,
            @RequestParam(required = false) List<String> colors,
            @RequestParam(required = false) List<String> size,
            @RequestParam(required = false) Integer minPrice,
            @RequestParam(required = false) Integer maxPrice,
            @RequestParam(required = false) Integer minDiscount,
            @RequestParam(required = false) String stock,
            @RequestParam(required = false, defaultValue = "price_asc") String sort,
            @RequestParam(required = false, defaultValue = "0") Integer pageNumber,
            @RequestParam(required = false, defaultValue = "10") Integer pageSize
    ) {
        Page<Product> products = productService.getAllProducts(
                category, colors, size, minPrice, maxPrice,
                minDiscount, stock, sort, pageNumber, pageSize
        );
        return new ResponseEntity<>(products, HttpStatus.OK);
    }


    @PutMapping("/{productId}/update")
    public ResponseEntity<Product> updateProduct(@RequestBody Product req, @PathVariable Long productId) throws ProductException{
        Product product = productService.updateProduct(productId, req);
        return new ResponseEntity<>(product, HttpStatus.CREATED);
    }

    @PostMapping("/create-multiple")
    public ResponseEntity<ApiResponse> createMultipleProduct(@RequestBody CreateProductRequest[] req){
        for (CreateProductRequest product : req){
            productService.createProduct(product);
        }
        ApiResponse res = new ApiResponse();
        res.setMessage("Multiple Products Created Successfully");
        res.setStatus(true);

        return new ResponseEntity<>(res, HttpStatus.CREATED);
    }
}
