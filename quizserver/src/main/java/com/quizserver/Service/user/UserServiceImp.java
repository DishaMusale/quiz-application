package com.quizserver.Service.user;

import com.quizserver.entities.User;
import com.quizserver.Repository.UserRepository;
import com.quizserver.enums.UserRole;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserServiceImp implements UserService {

    @Autowired
    private UserRepository userRepository;

    @PostConstruct
    private void createAdminUser() {
        // Directly return User instead of Optional
        User existingUser = userRepository.findByRole(UserRole.ADMIN);

        if (existingUser == null) {
            User user = new User();
            user.setName("Admin");
            user.setEmail("admin@gmail.com");
            user.setRole(UserRole.ADMIN);
            user.setPassword("admin");

            userRepository.save(user);
        }
    }

    public boolean hasUserWithEmail(String email) {
        return userRepository.findFirstByEmail(email) != null;
    }

    public User createUser(User user){
        user.setRole(UserRole.USER);

        return userRepository.save(user);
    }


    public User login(User user){
        Optional<User> optionalUser=userRepository.findByEmail(user.getEmail());
        if(optionalUser.isPresent() && user.getPassword().equals(optionalUser.get().getPassword())){
            return optionalUser.get();
        }
        return null;
    }
}
