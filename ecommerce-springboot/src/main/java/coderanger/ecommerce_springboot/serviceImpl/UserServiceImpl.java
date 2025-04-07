package coderanger.ecommerce_springboot.serviceImpl;

import coderanger.ecommerce_springboot.entity.User;
import coderanger.ecommerce_springboot.exception.UserException;
import coderanger.ecommerce_springboot.repositoris.UserRepository;
import coderanger.ecommerce_springboot.services.UserService;
import coderanger.ecommerce_springboot.utils.JwtUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtUtils jwtUtils;


    @Override
    public User findUserById(Long userId) throws UserException {
        Optional<User> user = userRepository.findById(userId);
        if(user.isPresent()){
            return user.get();
        }
        throw new UserException("User No Found With This Id - "+userId);
    }

    @Override
    public User findUserProfileByJwt(String jwt) throws UserException {
        String email = jwtUtils.getEmailFromToken(jwt);

        User user = userRepository.findByEmail((email));

        if(user == null){
            throw  new UserException("User Not Found With This Email - "+email);
        }
        return user;
    }
}
