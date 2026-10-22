package com.example.recipieHelper.repository.user;

import com.example.recipieHelper.model.User;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class UserRepositoryImpl implements UserRepositoryCustom{

    private final MongoTemplate mongoTemplate;

    PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public UserRepositoryImpl(MongoTemplate mongoTemplate) {
        this.mongoTemplate = mongoTemplate;
    }

    @Override
    public List<User> findAll(){
        Query query = new Query();
        query.fields().exclude("password");
        return mongoTemplate.find(query,User.class,"users");
    }

    @Override
    public Map<String,String> findByUserName(String userName){
        Map<String,String> result = new HashMap<>();
        Query query = new Query();
        query.addCriteria(Criteria.where("userName").is(userName));
        query.fields().exclude("password");
        User user = mongoTemplate.findOne(query,User.class,"users");

        result.put("userId",user.getId());
        result.put("userName",user.getUserName());
        result.put("userRole",user.getUserRole());
        return result;
    };

    @Override
    public boolean checkPassword(Map<String,String> signInData){
        String userName = signInData.get("userName");
        String rawPassword = signInData.get("password");
        Query query = new Query();
        query.addCriteria(Criteria.where("userName").is(userName));
        query.fields().include("password");
        query.fields().exclude("_id");

        Map<String,String> encodedPassword = mongoTemplate.findOne(query, Map.class,"users");

        if(passwordEncoder.matches(rawPassword,encodedPassword.get("password"))){
            return true;
        }else{
            return false;
        }
    }

    @Override
    public void saveUser(Map<String,String> newUser){
        String rawPassword = newUser.get("password");
        String encodedPassword = passwordEncoder.encode(rawPassword);
        newUser.replace("password",encodedPassword);

        mongoTemplate.save(newUser,"users");
    };

    @Override
    public boolean containsUserName(String userName){
        Query query = new Query();
        query.addCriteria(Criteria.where("userName").is(userName));
        query.fields().exclude("password");

        User user = mongoTemplate.findOne(query,User.class);

        if(user==null){
            return false;
        }else{
            return true;
        }
    };

    @Override
    public void removeUser(String userId){
        Query query = new Query();
        query.addCriteria(Criteria.where("_id").is(userId));
        mongoTemplate.remove(query,"users");
    }
}
