package coderanger.ecommerce_springboot.controller;

import coderanger.ecommerce_springboot.entity.Cart;
import coderanger.ecommerce_springboot.entity.User;
import coderanger.ecommerce_springboot.exception.ProductException;
import coderanger.ecommerce_springboot.exception.UserException;
import coderanger.ecommerce_springboot.request.AddItemRequest;
import coderanger.ecommerce_springboot.response.ApiResponse;
import coderanger.ecommerce_springboot.services.CartService;
import coderanger.ecommerce_springboot.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/cart")
public class CartController {

    private CartService cartService;
    private UserService userService;

    @Autowired
    public CartController(CartService cartService, UserService userService) {
        this.cartService = cartService;
        this.userService = userService;
    }

    @GetMapping("/")
    public ResponseEntity<Cart> findUserCart(@RequestHeader("Authorization") String jwt) throws UserException{
        User user = userService.findUserProfileByJwt(jwt);
        Cart cart = cartService.findUserCart(user.getId());

        return new ResponseEntity<Cart>(cart, HttpStatus.OK);
    }

    @PutMapping("/add")
    public ResponseEntity<ApiResponse> addItemToCart(@RequestBody AddItemRequest req, @RequestHeader("Authorization") String jwt) throws UserException, ProductException{
        User user = userService.findUserProfileByJwt(jwt);

        cartService.addCartItem(user.getId(), req);

        ApiResponse res = new ApiResponse();
        res.setMessage("Item Added To Cart");
        res.setStatus(true);

        return new ResponseEntity<>(res, HttpStatus.OK);
    }
}
