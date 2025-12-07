package com.quizserver.dto;

import lombok.Data;

@Data
public class QuestionDto {
    private Long id;

    private String questionText;

    private String optionA;
    private String optionB;
    private String optionC;
    private String optionD;

    private String correctOption;

    private Long testId;   // ✅ Option 1: reference test directly by ID
    private String level;  // ✅ Option 2: reference test by level
    private String topic;  // ✅ Option 2: reference test by topic
}
