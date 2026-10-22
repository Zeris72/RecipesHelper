package com.example.recipieHelper.repository.user;

import com.example.recipieHelper.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface UserRepository extends MongoRepository<User,String>,UserRepositoryCustom {
}
