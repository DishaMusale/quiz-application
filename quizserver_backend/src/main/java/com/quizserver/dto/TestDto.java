package com.quizserver.dto;

import lombok.Data;

@Data
public class TestDto {

    private Long id;

    private String title;

    private String description;

    private Long time;

    private String level;   
    private String topic;   
}

