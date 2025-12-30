package com.sharespace.studentservice.mapper;

import com.sharespace.studentservice.dto.StudentResponseDTO;
import com.sharespace.studentservice.model.Student;

public class StudentMapper {
    public static StudentResponseDTO toDTO(Student student) {
        StudentResponseDTO studentDTO = new StudentResponseDTO();
        studentDTO.setId(student.getId().toString());
        studentDTO.setFirstName(student.getFirstName());
        studentDTO.setLastName(student.getLastName());
        studentDTO.setEmail(student.getEmail());
        studentDTO.setAddress(student.getAddress());
        studentDTO.setDateOfBirth(student.getDateOfBirth().toString());
        return studentDTO;
    }
}
