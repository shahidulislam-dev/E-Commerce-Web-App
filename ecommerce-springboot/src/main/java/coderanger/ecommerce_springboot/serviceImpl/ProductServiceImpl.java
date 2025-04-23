package coderanger.ecommerce_springboot.serviceImpl;

import coderanger.ecommerce_springboot.entity.Category;
import coderanger.ecommerce_springboot.entity.Product;
import coderanger.ecommerce_springboot.exception.ProductException;
import coderanger.ecommerce_springboot.repositoris.CategoryRepository;
import coderanger.ecommerce_springboot.repositoris.ProductRepository;
import coderanger.ecommerce_springboot.request.CreateProductRequest;
import coderanger.ecommerce_springboot.services.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ProductServiceImpl implements ProductService {


    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;
    @Autowired
    public ProductServiceImpl(ProductRepository productRepository,  CategoryRepository categoryRepository) {
        this.productRepository = productRepository;
        this.categoryRepository = categoryRepository;
    }


    @Override
    public Product createProduct(CreateProductRequest createProductRequest) {

        if (createProductRequest.getTopLevelCategory() == null || createProductRequest.getTopLevelCategory().isBlank()) {
            throw new IllegalArgumentException("Top-level category name must not be blank");
        }

        if (createProductRequest.getSecondLevelCategory() == null || createProductRequest.getSecondLevelCategory().isBlank()) {
            throw new IllegalArgumentException("Second-level category name must not be blank");
        }

        if (createProductRequest.getThirdLevelCategory() == null || createProductRequest.getThirdLevelCategory().isBlank()) {
            throw new IllegalArgumentException("Third-level category name must not be blank");
        }

        Category topLevel = categoryRepository.findByName(createProductRequest.getTopLevelCategory());
        if (topLevel == null) {
            Category topLevelCategory = new Category();
            topLevelCategory.setName(createProductRequest.getTopLevelCategory());
            topLevelCategory.setLevel(1);
            topLevel = categoryRepository.save(topLevelCategory);
        }

        Category secondLevel = categoryRepository.findByNameAndParent(
                createProductRequest.getSecondLevelCategory(), topLevel.getName());
        if (secondLevel == null) {
            Category secondLevelCategory = new Category();
            secondLevelCategory.setName(createProductRequest.getSecondLevelCategory());
            secondLevelCategory.setParentCategory(topLevel);
            secondLevelCategory.setLevel(2);
            secondLevel = categoryRepository.save(secondLevelCategory);
        }

        Category thirdLevel = categoryRepository.findByNameAndParent(
                createProductRequest.getThirdLevelCategory(), secondLevel.getName());
        if (thirdLevel == null) {
            Category thirdLevelCategory = new Category();
            thirdLevelCategory.setName(createProductRequest.getThirdLevelCategory());
            thirdLevelCategory.setParentCategory(secondLevel);
            thirdLevelCategory.setLevel(3);
            thirdLevel = categoryRepository.save(thirdLevelCategory);
        }

        Product product = new Product();
        product.setTitle(createProductRequest.getTitle());
        product.setColor(createProductRequest.getColor());
        product.setDescription(createProductRequest.getDescription());
        product.setDiscountPrice(createProductRequest.getDiscountPrice());
        product.setDiscountPercent(createProductRequest.getDiscountPercent());
        product.setImageUrl(createProductRequest.getImageUrl());
        product.setBrand(createProductRequest.getBrand());
        product.setPrice(createProductRequest.getPrice());
        product.setSizes(createProductRequest.getSize());
        product.setQuantity(createProductRequest.getQuantity());
        product.setCategory(thirdLevel);
        product.setCreatedAt(LocalDateTime.now());

        return productRepository.save(product);
    }


    @Override
    public String deleteProduct(Long productId) throws ProductException {
        Product product = findProductById(productId);
        product.getSizes().clear();
        productRepository.delete(product);
        return "Product Deleted Successfully";
    }

    @Override
    public Product updateProduct(Long productId, Product req) throws ProductException {
        Product product = findProductById(productId);
        if(req.getQuantity() != 0){
            product.setQuantity(req.getQuantity());
        }
        return productRepository.save(product);
    }

    @Override
    public Product findProductById(Long id) throws ProductException {
        Optional<Product> opt = productRepository.findById(id);

        if(opt.isPresent()){
            return opt.get();
        }
        throw new ProductException("Product Not Found With This Id - "+id);
    }

    @Override
    public List<Product> findProductByCategory(String category) {
        return null;
    }

    @Override
    public Page<Product> getAllProducts(String category, List<String> colors, List<String> size, Integer minPrice,
                                        Integer maxPrice, Integer minDiscount, String stock, String sort,
                                        Integer pageNUmber, Integer pageSize) {

        Pageable pageable = PageRequest.of(pageNUmber, pageSize);

        List<Product> products = productRepository.filterProducts(category, minPrice, maxPrice, minDiscount, sort);

        if (!colors.isEmpty()){
            products = products.stream().filter(p-> colors.stream().anyMatch(c-> c.equalsIgnoreCase(p.getColor()))).collect(Collectors.toList());
        }

        if(stock != null){
            if(stock.equals("in_stock")){
                products = products.stream().filter(p-> p.getQuantity() > 0).collect(Collectors.toList());
            }
            else if(stock.equals(("out_of_stock"))){
                products = products.stream().filter(p -> p.getQuantity() < 1).collect(Collectors.toList());
            }
        }

        int startIndex = (int) pageable.getOffset();
        int endIndex = Math.min(startIndex + pageable.getPageSize(), products.size());

        List<Product> pageContent = products.subList(startIndex, endIndex);

        return new PageImpl<>(pageContent, pageable, products.size());
    }

    @Override
    public List<Product> findAllProducts() {
        return productRepository.findAll();
    }
}