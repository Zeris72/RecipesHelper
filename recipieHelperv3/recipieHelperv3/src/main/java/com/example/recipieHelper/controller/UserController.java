package com.example.recipieHelper.controller;

import com.example.recipieHelper.model.User;
import com.example.recipieHelper.repository.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/user")
public class UserController {

    @Autowired
    private UserRepository repository;

    @GetMapping("")
    public List<User> findAll(){
        return repository.findAll();
    }

    @PostMapping("/signIn")
    public Map<String,String> signIn(@RequestBody Map<String,String> signInData){
        String userName = signInData.get("userName");
        if(repository.checkPassword(signInData)){
            return repository.findByUserName(userName);
        }else{
            return null;
        }
    }

    @PostMapping("/register")
    public int register(@RequestBody Map<String,String> newUser){
        String userName = newUser.get("userName");
        if(repository.containsUserName(userName)){
            return 0;
        }else{
            repository.saveUser(newUser);
            return 1;
        }
    }
}
