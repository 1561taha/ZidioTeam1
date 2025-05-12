package com.ZidioConnect.ZidioConnect.Service;




import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import com.ZidioConnect.ZidioConnect.Model.User;
import com.ZidioConnect.ZidioConnect.Model.UserPrincipal;
import com.ZidioConnect.ZidioConnect.Repo.UserRepo;
import org.springframework.stereotype.Service;

@Service
public class MyUserDetailservice implements UserDetailsService {
    @Autowired
    private UserRepo userRepo;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepo.findByUsername(username);
        if (user == null) {
            throw new UsernameNotFoundException("User not found with username: " + username);
        }
        return  new UserPrincipal(user);
    }
}
