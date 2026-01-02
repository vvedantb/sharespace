package com.sharespace.service;

import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

@Service
@Profile("dev")
public class DevS3Service {

    private static final String UPLOAD_DIR = "uploads";

    public String uploadFile(MultipartFile file) throws IOException {
        Path uploadPath = Paths.get(UPLOAD_DIR);
        if (!Files.exists(uploadPath)) {
            Files.createDirectories(uploadPath);
        }

        String filename = UUID.randomUUID() + "-" + file.getOriginalFilename();
        Path filePath = uploadPath.resolve(filename);
        Files.copy(file.getInputStream(), filePath);

        return "/uploads/" + filename;
    }

    public void deleteFile(String fileUrl) {
        if (fileUrl.startsWith("/uploads/")) {
            try {
                Path filePath = Paths.get(UPLOAD_DIR, fileUrl.substring("/uploads/".length()));
                Files.deleteIfExists(filePath);
            } catch (IOException ignored) {
            }
        }
    }
}
