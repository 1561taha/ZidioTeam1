package com.ZidioConnect.ZidioConnect.Config;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.Map;

@Configuration
@ConfigurationProperties(prefix = "cloudinary")
public class CloudinaryConfig {
    private String cloudName;
    private String apiKey;
    private String apiSecret;

    // setters for binding
    public void setCloudName(String cloudName) { this.cloudName = cloudName; }
    public void setApiKey(String apiKey)       { this.apiKey = apiKey; }
    public void setApiSecret(String apiSecret) { this.apiSecret = apiSecret; }

    @Bean
    public Cloudinary cloudinary() {
        Map<String, String> config = ObjectUtils.asMap(
                "cloud_name", cloudName,
                "api_key",    apiKey,
                "api_secret", apiSecret
        );
        return new Cloudinary(config);
    }
}

