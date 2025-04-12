package coderanger.ecommerce_springboot.controller;

import coderanger.ecommerce_springboot.entity.Reviews;
import coderanger.ecommerce_springboot.entity.User;
import coderanger.ecommerce_springboot.exception.ProductException;
import coderanger.ecommerce_springboot.exception.UserException;
import coderanger.ecommerce_springboot.request.ReviewRequest;
import coderanger.ecommerce_springboot.services.ReviewService;
import coderanger.ecommerce_springboot.services.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reviews")
public class ReviewController {

    private UserService userService;
    private ReviewService reviewService;

    public ReviewController(UserService userService, ReviewService reviewService) {
        this.userService = userService;
        this.reviewService = reviewService;
    }

    @PostMapping("/create")
    public ResponseEntity<Reviews> createReview(@RequestBody ReviewRequest req, @RequestHeader("Authorization") String jwt) throws UserException, ProductException {
        User user = userService.findUserProfileByJwt(jwt);

        Reviews reviews = reviewService.createReviews(req, user);

        return new ResponseEntity<Reviews>(reviews, HttpStatus.CREATED);
    }

    @GetMapping("/product/{productId}")
    public ResponseEntity<List<Reviews>> getProductReviews(@PathVariable Long productId, @RequestHeader("Authorization") String jwt) throws UserException, ProductException{
        User user = userService.findUserProfileByJwt(jwt);

        List<Reviews> reviews = reviewService.getAllReviews(productId);

        return new ResponseEntity<>(reviews, HttpStatus.OK);
    }
}
