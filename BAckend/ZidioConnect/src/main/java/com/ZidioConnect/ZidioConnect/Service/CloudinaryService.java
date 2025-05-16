package com.ZidioConnect.ZidioConnect.Service;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;

@Service
public class CloudinaryService {
    private final Cloudinary cloudinary;
    public CloudinaryService(Cloudinary cloudinary){ this.cloudinary = cloudinary; }

    /** Uploads a single file to Cloudinary under the given folder and returns its URL. */
    public String upload(MultipartFile file, String folder) {
        try {
            Map<?,?> result = cloudinary.uploader()
                    .upload(file.getBytes(),
                            ObjectUtils.asMap("folder", folder));
            return result.get("secure_url").toString();
        } catch (IOException e) {
            throw new RuntimeException("Cloudinary upload failed", e);
        }
    }
}

