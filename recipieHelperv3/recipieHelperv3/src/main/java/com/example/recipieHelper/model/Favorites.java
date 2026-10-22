package com.example.recipieHelper.model;

import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.FieldType;

import java.util.List;


// można to usunąć?
public class Favorites {

    @Field(targetType = FieldType.OBJECT_ID)
    String userId;
    List<Recipe> recipeList;

    public Favorites(String userId, List<Recipe> recipeList) {
        this.userId = userId;
        this.recipeList = recipeList;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public List<Recipe> getRecipeList() {
        return recipeList;
    }

    public void setRecipeList(List<Recipe> recipeList) {
        this.recipeList = recipeList;
    }

    @Override
    public String toString() {
        return "Favorites{" +
                "userId='" + userId + '\'' +
                ", recipeList=" + recipeList +
                '}';
    }
}
