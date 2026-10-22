package com.example.recipieHelper.model;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.FieldType;

public class Rating{

    @Field(targetType = FieldType.OBJECT_ID)
    private String userId;
    private int rating;

    public Rating(String userId, int rating) {
        this.userId = userId;
        this.rating = rating;
    }
    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public int getRating() {
        return rating;
    }

    public void setRating(int rating) {
        this.rating = rating;
    }
}
