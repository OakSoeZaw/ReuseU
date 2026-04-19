package com.reuseu.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.reuseu.services.*;
import com.reuseu.model.*;
import java.util.Optional;
import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {
    
    private final UserService userService;

    public UserController(UserService userService){
        this.userService = userService;
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getUser(@PathVariable Long id){
        Optional<User> userOpt = userService.findById(id);

        if(userOpt.isEmpty()){
            return ResponseEntity.notFound().build();
        }else{
            return ResponseEntity.ok(userOpt.get());
        }
    }

    @GetMapping("/leaderboard")
    public ResponseEntity<?> getLeaderboard(){
        List<User> leaderboard = userService.getLeaderboard();
        return ResponseEntity.ok(leaderboard);
    }
}
