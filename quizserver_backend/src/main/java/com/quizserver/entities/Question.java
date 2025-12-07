package com.quizserver.entities;

import com.quizserver.dto.QuestionDto;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Question {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String questionText;

    private String optionA;
    private String optionB;
    private String optionC;
    private String optionD;

    private String correctOption;

    @ManyToOne
    @JoinColumn(name = "test_id")
    private Test test;

    // Conversion method
    public QuestionDto getDto() {
        QuestionDto dto = new QuestionDto();
        dto.setId(this.id);
        dto.setQuestionText(this.questionText);
        dto.setOptionA(this.optionA);
        dto.setOptionB(this.optionB);
        dto.setOptionC(this.optionC);
        dto.setOptionD(this.optionD);
        dto.setCorrectOption(this.correctOption);
        if (this.test != null) {
            dto.setTestId(this.test.getId());
        }
        return dto;
    }
}
