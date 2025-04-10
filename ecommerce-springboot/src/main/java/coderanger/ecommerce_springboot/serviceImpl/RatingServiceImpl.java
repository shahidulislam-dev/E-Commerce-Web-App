package coderanger.ecommerce_springboot.serviceImpl;

import coderanger.ecommerce_springboot.entity.Product;
import coderanger.ecommerce_springboot.entity.Ratings;
import coderanger.ecommerce_springboot.entity.User;
import coderanger.ecommerce_springboot.exception.ProductException;
import coderanger.ecommerce_springboot.repositoris.RatingRepository;
import coderanger.ecommerce_springboot.request.RatingRequest;
import coderanger.ecommerce_springboot.services.ProductService;
import coderanger.ecommerce_springboot.services.RatingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class RatingServiceImpl implements RatingService {


    private RatingRepository ratingRepository;
    private ProductService productService;

    @Autowired
    public RatingServiceImpl(RatingRepository ratingRepository, ProductService productService) {
        this.ratingRepository = ratingRepository;
        this.productService = productService;
    }

    @Override
    public Ratings createRating(RatingRequest req, User user) throws ProductException {
        Product product = productService.findProductById(req.getProductId());

        Ratings rating = new Ratings();
        rating.setProduct(product);
        rating.setUser(user);
        rating.setRating(req.getRating());
        rating.setCreatedAt(LocalDateTime.now());
        return ratingRepository.save(rating);
    }

    @Override
    public List<Ratings> getProductsRating(Long productId) {

        return ratingRepository.getAllProductsRating(productId);
    }
}
