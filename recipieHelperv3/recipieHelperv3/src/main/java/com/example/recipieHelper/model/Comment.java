package com.example.recipieHelper.model;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.FieldType;


public class Comment{

    @Field(targetType = FieldType.OBJECT_ID)
    private String userId;
    private String authorUserName;
    private String content;

    public Comment(String userId, String authorUserName, String content) {
        this.userId = userId;
        this.authorUserName = authorUserName;
        this.content = content;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getAuthorUserName() {
        return authorUserName;
    }

    public void setAuthorUserName(String authorUserName) {
        this.authorUserName = authorUserName;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }
}
