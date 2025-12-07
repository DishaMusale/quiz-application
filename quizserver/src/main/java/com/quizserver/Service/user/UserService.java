package com.quizserver.Service.user;

import com.quizserver.entities.User;

public interface UserService {
    User createUser(User user);

    boolean hasUserWithEmail(String email);

    User login(User user);
}
