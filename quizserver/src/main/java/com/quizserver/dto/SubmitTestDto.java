package com.quizserver.dto;

import lombok.Data;
import java.util.List;

@Data
public class SubmitTestDto {
    private Long testId;
    private Long userId;
    private List<QuestionResponse> responses;
}
