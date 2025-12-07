package com.quizserver.Service.test;

import com.quizserver.Repository.QuestionRepository;
import com.quizserver.Repository.TestRepository;
import com.quizserver.Repository.TestResultRepository;
import com.quizserver.Repository.UserRepository;
import com.quizserver.dto.*;
import com.quizserver.entities.Question;
import com.quizserver.entities.Test;
import com.quizserver.entities.TestResult;
import com.quizserver.entities.User;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class TestServiceImp implements TestService {

    @Autowired
    private TestRepository testRepository;

    @Autowired
    private QuestionRepository questionRepository;

    @Autowired
    private TestResultRepository testResultRepository;

    @Autowired
    private UserRepository userRepository;

    // Create a new test
    @Override
    public TestDto createTest(TestDto dto) {
        Test test = new Test();
        test.setTitle(dto.getTitle());
        test.setDescription(dto.getDescription());
        test.setTime(dto.getTime());
        test.setTopic(dto.getTopic());
        test.setLevel(dto.getLevel());
        return testRepository.save(test).getDto();
    }

    // Add a question to a specific test
    @Override
public QuestionDto addQuestionInTest(QuestionDto dto) {
    Optional<Test> optionalTest;

    if (dto.getTestId() != null) {
        // ✅ Case 1: Use testId directly
        optionalTest = testRepository.findById(dto.getTestId());
    } else if (dto.getLevel() != null && dto.getTopic() != null) {
        // ✅ Case 2: Find test by level + topic
        optionalTest = testRepository.findByLevelAndTopic(dto.getLevel(), dto.getTopic())
                                     .stream()
                                     .findFirst(); // assume one test per level+topic
    } else {
        throw new IllegalArgumentException("Either testId or level+topic must be provided");
    }

    if (optionalTest.isPresent()) {
        Test test = optionalTest.get();

        Question question = new Question();
        question.setTest(test);
        question.setQuestionText(dto.getQuestionText());
        question.setOptionA(dto.getOptionA());
        question.setOptionB(dto.getOptionB());
        question.setOptionC(dto.getOptionC());
        question.setOptionD(dto.getOptionD());
        question.setCorrectOption(dto.getCorrectOption());

        return questionRepository.save(question).getDto();
    }

    throw new EntityNotFoundException("Test Not Found");
}


    // Get all tests
    @Override
    public List<TestDto> getAllTests() {
        return testRepository.findAll()
                .stream()
                .peek(test -> test.setTime(test.getQuestions().size() * test.getTime()))
                .map(Test::getDto)
                .collect(Collectors.toList());
    }

    // Get all questions for a specific test
    @Override
    public TestDetailsDto getAllQuestionsByTest(Long id) {
        Optional<Test> optionalTest = testRepository.findById(id);
        TestDetailsDto testDetailsDto = new TestDetailsDto();

        if (optionalTest.isPresent()) {
            Test test = optionalTest.get();
            TestDto testDto = test.getDto();
            // Multiply test time by number of questions if needed
            testDto.setTime(test.getTime() * test.getQuestions().size());

            testDetailsDto.setTestDto(testDto);
            testDetailsDto.setQuestions(
                    test.getQuestions()
                            .stream()
                            .map(Question::getDto)
                            .collect(Collectors.toList())
            );
        }

        return testDetailsDto;
    }

    // Submit test and calculate result
    @Override
    public TestResultDto submitTest(SubmitTestDto request) {
        // Find the test
        Test test = testRepository.findById(request.getTestId())
                .orElseThrow(() -> new EntityNotFoundException("Test Not Found"));

        // Find the user
        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new EntityNotFoundException("User Not Found"));

        int correctAnswers = 0;

        // Evaluate submitted answers
        for (QuestionResponse response : request.getResponses()) {
            Question question = questionRepository.findById(response.getQuestionId())
                    .orElseThrow(() -> new EntityNotFoundException("Question Not Found"));

            if (question.getCorrectOption().equals(response.getSelectedOption())) {
                correctAnswers++;
            }
        }

        int totalQuestions = test.getQuestions().size();
        double percentage = ((double) correctAnswers / totalQuestions) * 100;

        TestResult testResult = new TestResult();
        testResult.setTest(test);
        testResult.setUser(user);
        testResult.setTotalQuestions(totalQuestions);
        testResult.setCorrectAnswers(correctAnswers);
        testResult.setPercentage(percentage);

        return testResultRepository.save(testResult).getDto();
    }

    public List<TestResultDto> getAllTestResults(){
        return testResultRepository.findAll().stream().map(TestResult::getDto).collect(Collectors.toList());
    }

    public List<TestResultDto> getAllTestResultsOfUser(Long userId){
        return testResultRepository.findAllByUserId(userId).stream().map(TestResult::getDto).collect(Collectors.toList());
    }

    @Override
    public List<TestDto> getTestsByTopic(String topic) {
    return testRepository.findByTopic(topic)
            .stream()
            .map(Test::getDto)
            .collect(Collectors.toList());
    }

    @Override
    public List<TestDto> getTestsByLevelAndTopic(String level, String topic) {
    return testRepository.findByLevelAndTopic(level, topic)
            .stream()
            .map(Test::getDto)
            .collect(Collectors.toList());
}


}
