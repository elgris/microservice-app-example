package com.elgris.usersapi.repository;

import com.elgris.usersapi.models.User;
import org.springframework.data.repository.CrudRepository;

public interface UserRepository extends CrudRepository<User, Long> {

}
