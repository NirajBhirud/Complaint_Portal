package com.portal.complaint.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

@Service
public class FileStorageService {

    @Value("${file.upload-dir}")
    private String uploadDir;

    // saves the file to disk and gives back a relative url we can store on the complaint row
    public String storeFile(MultipartFile file) {
        if (file == null || file.isEmpty()) {
            throw new IllegalArgumentException("no file uploaded, cant procede");
        }

        try {
            Path uploadPath = Paths.get(uploadDir);
            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath);
            }

            String origName = StringUtils.cleanPath(file.getOriginalFilename());
            String ext = origName.contains(".") ? origName.substring(origName.lastIndexOf(".")) : "";
            String newFileName = UUID.randomUUID() + ext;

            Path targetPath = uploadPath.resolve(newFileName);
            Files.copy(file.getInputStream(), targetPath);

            return "/uploads/" + newFileName;
        } catch (IOException e) {
            throw new RuntimeException("failed to store file: " + e.getMessage(), e);
        }
    }
}
