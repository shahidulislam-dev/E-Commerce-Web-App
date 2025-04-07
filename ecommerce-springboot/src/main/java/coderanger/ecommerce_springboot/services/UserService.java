package coderanger.ecommerce_springboot.services;

import coderanger.ecommerce_springboot.entity.User;
import coderanger.ecommerce_springboot.exception.UserException;


public interface UserService {
    User findUserById(Long userId) throws UserException;

    User findUserProfileByJwt(String jwt) throws UserException;
}
