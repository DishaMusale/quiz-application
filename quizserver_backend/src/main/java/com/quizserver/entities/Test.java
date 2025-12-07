package com.quizserver.entities;

import com.quizserver.dto.TestDto;
import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Entity
@Data
public class Test {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    private String description;

    private Long time;

    private String topic; 

    private String level; 

    @OneToMany(mappedBy = "test" ,cascade = CascadeType.ALL)
    private List<Question> questions;

    public TestDto getDto(){
        TestDto testDto=new TestDto();

        testDto.setId(id);
        testDto.setTitle(title);
        testDto.setDescription(description);
        testDto.setTime(time);
        testDto.setTopic(topic);
        testDto.setLevel(level);
        return testDto;

    }

}
