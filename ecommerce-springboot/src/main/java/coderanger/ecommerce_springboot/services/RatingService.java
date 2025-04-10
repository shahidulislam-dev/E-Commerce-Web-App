package coderanger.ecommerce_springboot.services;

import coderanger.ecommerce_springboot.entity.Ratings;
import coderanger.ecommerce_springboot.entity.User;
import coderanger.ecommerce_springboot.exception.ProductException;
import coderanger.ecommerce_springboot.request.RatingRequest;

import java.util.List;

public interface RatingService {

    Ratings createRating(RatingRequest req, User user) throws ProductException;

    List<Ratings> getProductsRating(Long productId);
}
