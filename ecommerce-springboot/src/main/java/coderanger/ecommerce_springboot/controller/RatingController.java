package coderanger.ecommerce_springboot.controller;

import coderanger.ecommerce_springboot.entity.Ratings;
import coderanger.ecommerce_springboot.entity.User;
import coderanger.ecommerce_springboot.exception.ProductException;
import coderanger.ecommerce_springboot.exception.UserException;
import coderanger.ecommerce_springboot.request.RatingRequest;
import coderanger.ecommerce_springboot.services.RatingService;
import coderanger.ecommerce_springboot.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/ratings")
public class RatingController {

    private UserService userService;
    private RatingService ratingService;

    @Autowired
    public RatingController(UserService userService, RatingService ratingService) {
        this.userService = userService;
        this.ratingService = ratingService;
    }

    @PostMapping("/create")
    public ResponseEntity<Ratings> createRating(@RequestBody RatingRequest req, @RequestHeader("Authorization") String jwt) throws UserException, ProductException{
        User user = userService.findUserProfileByJwt(jwt);

        Ratings ratings = ratingService.createRating(req, user);

        return new ResponseEntity<Ratings>(ratings, HttpStatus.CREATED);
    }

    @GetMapping("/product/{productId}")
    public ResponseEntity<List<Ratings>> getProductRatings(@PathVariable Long productId, @RequestHeader("Authorization") String jwt) throws UserException, ProductException{
        User user = userService.findUserProfileByJwt(jwt);

        List<Ratings> ratings = ratingService.getProductsRating(productId);

        return new ResponseEntity<>(ratings, HttpStatus.OK);
    }
}
