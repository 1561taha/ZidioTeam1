package com.ZidioConnect.ZidioConnect.Model;

import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class RegisterDto {

    @NotBlank
    @Size(min = 3, max = 20)
    private String username;

    @Email
    @NotBlank
    private String email;

    @NotBlank @Size(min = 6, max = 100)
    private String password;

    @Enumerated(EnumType.STRING)
    @NotNull
    private Role role;
}
