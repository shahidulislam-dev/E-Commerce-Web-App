package coderanger.ecommerce_springboot.serviceImpl;

import coderanger.ecommerce_springboot.entity.Product;
import coderanger.ecommerce_springboot.entity.Ratings;
import coderanger.ecommerce_springboot.entity.Reviews;
import coderanger.ecommerce_springboot.entity.User;
import coderanger.ecommerce_springboot.exception.ProductException;
import coderanger.ecommerce_springboot.repositoris.ReviewRepository;
import coderanger.ecommerce_springboot.request.ReviewRequest;
import coderanger.ecommerce_springboot.services.ProductService;
import coderanger.ecommerce_springboot.services.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class ReviewServiceImpl implements ReviewService {

    private ReviewRepository reviewRepository;
    private ProductService productService;

    @Autowired
    public ReviewServiceImpl(ReviewRepository reviewRepository, ProductService productService) {
        this.reviewRepository = reviewRepository;
        this.productService = productService;
    }

    @Override
    public Reviews createReviews(ReviewRequest req, User user) throws ProductException {
        Product product = productService.findProductById(req.getProductId());

        Reviews reviews = new Reviews();
        reviews.setProduct(product);
        reviews.setUser(user);
        reviews.setReview(req.getReview());
        reviews.setCreatedAt(LocalDateTime.now());
        return reviewRepository.save(reviews);
    }

    @Override
    public List<Reviews> getAllReviews(Long productId) {
        return reviewRepository.getAllProductsReview(productId);
    }
}
