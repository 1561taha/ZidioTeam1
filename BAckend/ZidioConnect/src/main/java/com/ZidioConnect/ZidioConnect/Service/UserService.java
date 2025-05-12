package com.ZidioConnect.ZidioConnect.Service;

import com.ZidioConnect.ZidioConnect.Model.LoginDto;
import com.ZidioConnect.ZidioConnect.Model.RegisterDto;
import com.ZidioConnect.ZidioConnect.Model.User;
import com.ZidioConnect.ZidioConnect.Repo.UserRepo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    @Autowired
    private UserRepo userRepo;
    private  BCryptPasswordEncoder bCryptPasswordEncoder= new BCryptPasswordEncoder();

//     @Autowired
//    private AuthenticationManager authenticationManager;

   
   public User adduser(RegisterDto dto) {
    if (userRepo.existsByUsername(dto.getUsername()) || userRepo.existsByEmail(dto.getEmail())) {
        throw new RuntimeException("Username or email already exists");
    }
    User user=new User();
    user.setEmail(dto.getEmail());
    user.setUsername(dto.getUsername());
    user.setRole(dto.getRole());

    user.setPassword(bCryptPasswordEncoder.encode(dto.getPassword()));
    return userRepo.save(user);
    
}

//   public String login(LoginDto dto) {
//    User user = userRepo.findByUsername(dto.getUsername());
//    if (user == null) {
//        throw new RuntimeException("User not found with username: " + dto.getUsername());
//    }
//    if (!bCryptPasswordEncoder.matches(dto.getPassword(), user.getPassword())) {
//        throw new RuntimeException("Invalid password");
//    }
//    Authentication auth= authenticationManager.
//                authenticate(new UsernamePasswordAuthenticationToken
//                        (user.getUsername(),user.getPassword()));
//
//    return "Login successful";
//
//    }
}
