package com.sharespace.studentservice.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.sharespace.studentservice.model.Student;
import java.util.UUID;

@Repository
public interface StudentRepository extends JpaRepository<Student, UUID> {

}
