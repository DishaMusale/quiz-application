package com.quizserver.entities;

import com.quizserver.enums.UserRole;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String email;

    private String password;

    private String name;

    @Enumerated(EnumType.STRING)   // 👈 Important: store ADMIN/USER instead of 0/1
    private UserRole role;
}
