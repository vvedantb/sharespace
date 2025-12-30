package com.sharespace.studentservice.controller;

import com.sharespace.studentservice.dto.StudentResponseDTO;
import com.sharespace.studentservice.service.StudentService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/students")
public class StudentController {
    private final StudentService studentService;

    public StudentController(StudentService studentService) {
        this.studentService = studentService;
    }

    @GetMapping
    public ResponseEntity<List<StudentResponseDTO>> getStudents () {
        List<StudentResponseDTO> students = studentService.getStudents();
        return ResponseEntity.ok().body(students);
    }
}
