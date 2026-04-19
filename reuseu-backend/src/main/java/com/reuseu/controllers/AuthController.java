package com.reuseu.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import com.reuseu.services.*;
import java.util.Map;
import java.util.Optional;
import com.reuseu.model.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    private final UserService userService;

    public AuthController(UserService userService){
        this.userService = userService;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody Map<String, String> body){
        String name = body.get("name");
        String email = body.get("email");
        String password = body.get("password");

        try{
            User user = userService.register(name, email, password);
            return ResponseEntity.ok(user);
        }catch(Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> body){
        String email = body.get("email");
        String password = body.get("password");

        Optional<User> userOpt = userService.findByEmail(email);

        if(userOpt.isEmpty()){
            return ResponseEntity.status(401).body("Invalid credentials");
        }
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        User user = userOpt.get();
        if(!encoder.matches(password, user.getPassword())){
            return ResponseEntity.status(401).body("Invalid credentials");
        }

        return ResponseEntity.ok(user);

    }


}
