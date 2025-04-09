package coderanger.ecommerce_springboot.exception;

public class CartItemException extends Exception{
    public CartItemException(String message){
        super(message);
    }
}
