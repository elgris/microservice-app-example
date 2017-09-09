package com.elgris.usersapi.repository;

import com.elgris.usersapi.models.User;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface UserRepository extends CrudRepository<User, Long> {
    User findOneByUsername(String username);
    User findByUsername(String username);
    User getByUsername(String username);
}
