package com.reuseu.services;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

import com.reuseu.repository.*;
import com.reuseu.model.*;

@Service
public class UserService {
    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User register(String name, String email, String password) {
        if (userRepository.findByEmail(email).isPresent()) {
            throw new RuntimeException("Email already in use");
        }

        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

        User user = new User(name, email, encoder.encode(password));
        return userRepository.save(user);
    }

    public Optional<User> findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public Optional<User> findById(Long id) {
        return userRepository.findById(id);
    }

    public List<User> getLeaderboard() {
        return userRepository.findAll()
                .stream()
                .sorted((a, b) -> b.getGreenScore() - a.getGreenScore())
                .toList();
    }

    public void incrementGreenScore(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        user.setGreenScore(user.getGreenScore() + 1);
        user.setDonatedCount(user.getDonatedCount() + 1);
        userRepository.save(user);
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

}
