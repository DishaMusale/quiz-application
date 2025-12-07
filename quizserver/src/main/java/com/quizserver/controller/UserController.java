package com.quizserver.controller;

import com.quizserver.Service.user.UserService;
import com.quizserver.entities.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("api/auth")
@CrossOrigin("*")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/sign-up")
    public ResponseEntity<?> signupUser(@RequestBody User user) {
        // Check if email already exists
        if (userService.hasUserWithEmail(user.getEmail())) {
            return new ResponseEntity<>("User already exists", HttpStatus.NOT_ACCEPTABLE);
        }

        // Create new user
        User createdUser = userService.createUser(user);

        if (createdUser == null) {
            return new ResponseEntity<>("User not created, please try again later", HttpStatus.NOT_ACCEPTABLE);
        }

        return new ResponseEntity<>(createdUser, HttpStatus.OK);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User user) {
        User dbUser=userService.login(user);

        if(dbUser==null){
            return new ResponseEntity<>("Wrong Credentials",HttpStatus.NOT_ACCEPTABLE);
        }

        // return only role + username (not password etc.)
        return ResponseEntity.ok(
                Map.of(
                        "id", dbUser.getId(),
                        "username", dbUser.getName(),
                        "role", dbUser.getRole()
                )
        );
    }

}
