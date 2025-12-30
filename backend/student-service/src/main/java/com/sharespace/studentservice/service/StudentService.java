package com.sharespace.studentservice.service;

import com.sharespace.studentservice.model.Student;
import com.sharespace.studentservice.repository.StudentRepository;
import org.springframework.stereotype.Service;
import com.sharespace.studentservice.dto.StudentResponseDTO

import java.util.List;

@Service
public class StudentService {
    private StudentRepository studentRepository;

    public StudentService(StudentRepository studentRepository) {
        this.studentRepository = studentRepository;
    }

    public List<StudentResponseDTO> getStudents (){
        List<Student> students = studentRepository.findAll();
    }
}
