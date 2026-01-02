package com.sharespace.controller;

import com.sharespace.dto.CreateMentorRequest;
import com.sharespace.dto.MentorDto;
import com.sharespace.service.MentorService;
import com.sharespace.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/mentors")
public class MentorController {

    private final MentorService mentorService;
    private final UserService userService;

    public MentorController(MentorService mentorService, UserService userService) {
        this.mentorService = mentorService;
        this.userService = userService;
    }

    @GetMapping
    public List<MentorDto> getMentors(@RequestParam(required = false) String search) {
        return mentorService.getMentors(search);
    }

    @GetMapping("/{id}")
    public MentorDto getMentor(@PathVariable UUID id) {
        return mentorService.getMentor(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public MentorDto createMentor(@RequestBody CreateMentorRequest request,
                                   @AuthenticationPrincipal Jwt jwt) {
        UUID userId = UUID.fromString(userService.getUserByCognitoId(jwt.getSubject()).id());
        return mentorService.createMentor(userId, request);
    }

    @PutMapping("/{id}")
    public MentorDto updateMentor(@PathVariable UUID id, @RequestBody CreateMentorRequest request,
                                   @AuthenticationPrincipal Jwt jwt) {
        UUID userId = UUID.fromString(userService.getUserByCognitoId(jwt.getSubject()).id());
        return mentorService.updateMentor(id, userId, request);
    }
}
