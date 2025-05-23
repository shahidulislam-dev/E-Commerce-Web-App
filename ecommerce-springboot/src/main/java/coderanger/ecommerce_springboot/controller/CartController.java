package coderanger.ecommerce_springboot.controller;

import coderanger.ecommerce_springboot.entity.Cart;
import coderanger.ecommerce_springboot.entity.CartItem;
import coderanger.ecommerce_springboot.entity.User;
import coderanger.ecommerce_springboot.exception.CartItemException;
import coderanger.ecommerce_springboot.exception.ProductException;
import coderanger.ecommerce_springboot.exception.UserException;
import coderanger.ecommerce_springboot.request.AddItemRequest;
import coderanger.ecommerce_springboot.response.ApiResponse;
import coderanger.ecommerce_springboot.services.CartItemService;
import coderanger.ecommerce_springboot.services.CartService;
import coderanger.ecommerce_springboot.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/cart")
public class CartController {

    private final CartService cartService;
    private final UserService userService;
    private final CartItemService cartItemService;

    @Autowired
    public CartController(CartService cartService, UserService userService, CartItemService cartItemService) {
        this.cartService = cartService;
        this.userService = userService;
        this.cartItemService = cartItemService;
    }

    @GetMapping("/")
    public ResponseEntity<Cart> findUserCart(@RequestHeader("Authorization") String jwt) throws UserException{
        User user = userService.findUserProfileByJwt(jwt);
        Cart cart = cartService.findUserCart(user.getId());

        return new ResponseEntity<>(cart, HttpStatus.OK);
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

    @DeleteMapping("/remove/item/{id}")
    public ResponseEntity<ApiResponse> removeCartItem(@PathVariable("id") Long cartItemId,
                                                      @RequestHeader("Authorization") String jwt)
            throws UserException, CartItemException {

        User user = userService.findUserProfileByJwt(jwt);
        cartItemService.removeCartItem(user.getId(), cartItemId);

        ApiResponse res = new ApiResponse();
        res.setMessage("Item Removed From Cart");
        res.setStatus(true);

        return new ResponseEntity<>(res, HttpStatus.OK);
    }

    @PutMapping("/update/item/{id}")
    public ResponseEntity<CartItem> updateCartItem(@PathVariable("id") Long cartItemId,
                                                   @RequestBody CartItem cartItem,
                                                   @RequestHeader("Authorization") String jwt)
            throws UserException, CartItemException {

        User user = userService.findUserProfileByJwt(jwt);
        CartItem updated = cartItemService.updateCartItem(user.getId(), cartItemId, cartItem);

        return new ResponseEntity<>(updated, HttpStatus.OK);
    }

    @GetMapping("/find/item/{id}")
    public ResponseEntity<CartItem> getCartItemById(@PathVariable("id") Long cartItemId,
                                                    @RequestHeader("Authorization") String jwt)
            throws CartItemException, UserException {

        User user = userService.findUserProfileByJwt(jwt);
        CartItem cartItem = cartItemService.findCartItemById(cartItemId);

        if (!cartItem.getUserId().equals(user.getId())) {
            throw new UserException("Unauthorized access to cart item");
        }

        return new ResponseEntity<>(cartItem, HttpStatus.OK);
    }



}
