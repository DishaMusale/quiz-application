package com.quizserver.Service.test;

import com.quizserver.dto.*;
import java.util.List;

public interface TestService {

    TestDto createTest(TestDto dto);

    QuestionDto addQuestionInTest(QuestionDto dto);

    List<TestDto> getAllTests();

    TestDetailsDto getAllQuestionsByTest(Long id);

    TestResultDto submitTest(SubmitTestDto request);

    List<TestResultDto> getAllTestResults();

    List<TestResultDto> getAllTestResultsOfUser(Long userId);

    
    List<TestDto> getTestsByTopic(String topic);

    List<TestDto> getTestsByLevelAndTopic(String level, String topic);

}
