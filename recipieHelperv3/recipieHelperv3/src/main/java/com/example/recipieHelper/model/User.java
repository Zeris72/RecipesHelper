package com.example.recipieHelper.model;

import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.FieldType;

@Document("users")
public class User{

    @Field(targetType = FieldType.OBJECT_ID)
    private String id;
    private String name;
    private String userName;
    private String userRole;

    public User(String id, String name, String userName,String userRole) {
        this.id = id;
        this.name = name;
        this.userName = userName;
        this.userRole = userRole;
    }
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getUserRole() {
        return userRole;
    }

    public void setUserRole(String userRole) {
        this.userRole = userRole;
    }
}
