package coderanger.ecommerce_springboot.exception;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ProductException extends Exception{
    public ProductException(String message) {
        super(message);
    }
}
