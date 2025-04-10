package coderanger.ecommerce_springboot.services;

import coderanger.ecommerce_springboot.entity.Reviews;
import coderanger.ecommerce_springboot.entity.User;
import coderanger.ecommerce_springboot.exception.ProductException;
import coderanger.ecommerce_springboot.request.ReviewRequest;

import java.util.List;

public interface ReviewService {

    Reviews createReviews(ReviewRequest req, User user) throws ProductException;

    List<Reviews> getAllReviews(Long productId);
}
