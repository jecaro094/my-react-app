package com.pluralsight.conference_demo.repositories;

import com.pluralsight.conference_demo.models.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, String> {
}
