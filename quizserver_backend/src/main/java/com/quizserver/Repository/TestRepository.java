package com.quizserver.Repository;
import java.util.List;


import com.quizserver.entities.Test;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TestRepository extends JpaRepository<Test,Long> {
    List<Test> findByTopic(String topic);

    List<Test> findByLevelAndTopic(String level, String topic);

}


