package com.quizserver.entities;

import com.quizserver.dto.TestResultDto;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class TestResult {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private int totalQuestions;
    private int correctAnswers;
    private double percentage;

    @ManyToOne
    private Test test;

    @ManyToOne
    private User user;

    // Convert entity -> DTO
    public TestResultDto getDto() {
        TestResultDto dto = new TestResultDto();
        dto.setId(id);
        dto.setTotalQuestions(totalQuestions);
        dto.setCorrectAnswers(correctAnswers);
        dto.setPercentage(percentage);
        dto.setTestName(test != null ? test.getTitle() : null);
        dto.setUserName(user != null ? user.getName() : null); // ✅ use getName()
        return dto;
    }
}
