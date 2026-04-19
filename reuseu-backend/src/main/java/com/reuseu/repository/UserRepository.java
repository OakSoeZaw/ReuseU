package com.reuseu.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;
import com.reuseu.model.*;

public interface UserRepository extends JpaRepository<User, Long>{
    Optional<User> findByEmail(String email);
}
