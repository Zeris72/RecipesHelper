package com.example.recipieHelper.repository.user;

import com.example.recipieHelper.model.User;

import java.util.List;
import java.util.Map;

public interface UserRepositoryCustom {

    List<User> findAll();

    Map<String,String> findByUserName(String userName);

    boolean checkPassword(Map<String,String> signInData);

    void saveUser(Map<String,String> newUser);

    boolean containsUserName(String userName);

    //Dodać do diagramu klas
    void removeUser(String userId);
}
