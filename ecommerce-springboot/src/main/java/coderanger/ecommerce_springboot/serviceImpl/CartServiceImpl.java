package coderanger.ecommerce_springboot.serviceImpl;

import coderanger.ecommerce_springboot.entity.Cart;
import coderanger.ecommerce_springboot.entity.CartItem;
import coderanger.ecommerce_springboot.entity.Product;
import coderanger.ecommerce_springboot.entity.User;
import coderanger.ecommerce_springboot.exception.CartItemException;
import coderanger.ecommerce_springboot.exception.ProductException;
import coderanger.ecommerce_springboot.exception.UserException;
import coderanger.ecommerce_springboot.repositoris.CartRepository;
import coderanger.ecommerce_springboot.request.AddItemRequest;
import coderanger.ecommerce_springboot.services.CartItemService;
import coderanger.ecommerce_springboot.services.CartService;
import coderanger.ecommerce_springboot.services.ProductService;
import coderanger.ecommerce_springboot.services.UserService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CartServiceImpl implements CartService {

    private final CartRepository cartRepository;
    private final CartItemService cartItemService;

    private final ProductService productService;

    private final UserService userService;



    @Autowired
    public CartServiceImpl(CartRepository cartRepository, CartItemService cartItemService, ProductService productService, UserService userService) {
        this.cartRepository = cartRepository;
        this.cartItemService = cartItemService;
        this.productService = productService;
        this.userService = userService;
    }

    @Override
    public Cart createCart(User user) {
        Cart cart = new Cart();
        cart.setUser(user);
        return cartRepository.save(cart);
    }

    @Override
    @Transactional
    public String addCartItem(Long userId, AddItemRequest req) throws ProductException {
        try {

            Cart cart = cartRepository.findByUserId(userId);
            if (cart == null) {
                User user = userService.findUserById(userId);
                cart = createCart(user);
            }

            Product product = productService.findProductById(req.getProductId());
            CartItem existingItem = cartItemService.isCartItemExist(cart, product, req.getSize(), userId);

            if (existingItem == null) {
                int quantity = req.getQuantity() > 0 ? req.getQuantity() : 1;

                CartItem cartItem = new CartItem();
                cartItem.setProduct(product);
                cartItem.setCart(cart);
                cartItem.setQuantity(quantity);
                cartItem.setUserId(userId);
                cartItem.setSize(req.getSize());
                cartItem.setPrice(product.getPrice() * quantity);
                cartItem.setDiscountPrice(product.getDiscountPrice() * quantity);

                cartItemService.createCartItem(cartItem);
                cart.getCartItems().add(cartItem);
            } else {
                int quantityToAdd = req.getQuantity() > 0 ? req.getQuantity() : 1;
                int newQuantity = existingItem.getQuantity() + quantityToAdd;

                existingItem.setQuantity(newQuantity);
                existingItem.setPrice(product.getPrice() * newQuantity);
                existingItem.setDiscountPrice(product.getDiscountPrice() * newQuantity);

                cartItemService.updateCartItem(userId, existingItem.getId(), existingItem);
            }

            cartRepository.save(cart);
            return "Item Added To Cart";
        } catch (CartItemException | UserException e) {
            throw new ProductException("Failed to add item to cart: " + e.getMessage());
        }
    }

    @Override
    public Cart findUserCart(Long userId) {
        Cart cart = cartRepository.findByUserId(userId);

        int totalPrice = 0;
        int totalDiscountPrice = 0;
        int totalItem = 0;

        for(CartItem cartItem : cart.getCartItems()){
            totalPrice = totalPrice + cartItem.getPrice();
            totalDiscountPrice = totalDiscountPrice + cartItem.getDiscountPrice();
            totalItem = totalItem + cartItem.getQuantity();
        }

        cart.setTotalDiscountPrice(totalDiscountPrice);
        cart.setTotalItem(totalItem);
        cart.setTotalPrice(totalPrice);
        cart.setDiscount(totalPrice - totalDiscountPrice);

        return cartRepository.save(cart);
    }
}
