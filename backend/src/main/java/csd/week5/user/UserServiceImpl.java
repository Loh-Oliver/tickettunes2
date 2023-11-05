package csd.week5.user;

import java.util.List;
import java.util.Optional;

import javax.validation.Valid;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import csd.week5.user.*;

@Service
public class UserServiceImpl implements UserService {

    private UserRepository userRepository;
    private BCryptPasswordEncoder encoder;

    public UserServiceImpl(UserRepository userRepository,BCryptPasswordEncoder encoder) {
        this.userRepository = userRepository;
        this.encoder = encoder;
    }

    @Override
    public List<User> listUsers() {
        return userRepository.findAll();
    }

    @Override
    public User addUser(User newUser) {
        // Create a new user using the values from newUserInfo
        String username = newUser.getUsername();
        String password = encoder.encode(newUser.getPassword());
        String email = newUser.getEmail();
        String address = newUser.getAddress();
        String phone_num = newUser.getPhone_num();
     
        User user = new User(username, password, email, address, phone_num);

        // Save the new user to the repository
        return userRepository.save(user);
    }

    @Override
    public User updateUsers(Long id, User newUserInfo) {
        return userRepository.findById(id).map(existingUser -> {
            // Update the user fields directly with the values from newUserInfo
            existingUser.setUsername(newUserInfo.getUsername());
            existingUser.setPassword(newUserInfo.getPassword());
            existingUser.setEmail(newUserInfo.getEmail());
            existingUser.setAddress(newUserInfo.getAddress());
            existingUser.setPhone_num(newUserInfo.getPhone_num());
            return userRepository.save(existingUser);
        }).orElse(null);
    }

    /**
     * Remove a user with the given id
     * Spring Data JPA does not return a value for delete operation
     */
    @Override
    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }

    @Override
    public Optional<User> getUser(Long id) {
        return userRepository.findById(id);
    }
    
    

    // @Override
    // public User addUsers(User user) {
    // // TODO Auto-generated method stub
    // throw new UnsupportedOperationException("Unimplemented method 'addUsers'");
    // }
}