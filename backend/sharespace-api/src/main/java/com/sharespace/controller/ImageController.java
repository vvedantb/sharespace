package com.sharespace.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Profile;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/images")
public class ImageController {

    @Autowired(required = false)
    private com.sharespace.service.S3Service s3Service;

    @Autowired(required = false)
    private com.sharespace.service.DevS3Service devS3Service;

    @PostMapping("/upload")
    @ResponseStatus(HttpStatus.CREATED)
    public List<String> uploadImages(@RequestParam("files") List<MultipartFile> files) throws IOException {
        List<String> urls = new ArrayList<>();
        for (MultipartFile file : files) {
            String url = s3Service != null ? s3Service.uploadFile(file) : devS3Service.uploadFile(file);
            urls.add(url);
        }
        return urls;
    }

    @DeleteMapping
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteImage(@RequestParam String url) {
        if (s3Service != null) {
            s3Service.deleteFile(url);
        } else if (devS3Service != null) {
            devS3Service.deleteFile(url);
        }
    }
}
