package com.example.recipieHelper.model;

import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.FieldType;

public class RecipeSuggestion {

    @Field(targetType = FieldType.OBJECT_ID)
    private String _id;
    private String title;
    private String content;
    private String ingredients;
    private String url;
    private String userId;

    public RecipeSuggestion(String _id,String title, String content, String ingredients, String url,String userId) {
        this._id = _id;
        this.title = title;
        this.content = content;
        this.ingredients = ingredients;
        this.url = url;
        this.userId = userId;
    }

    public String get_id() {
        return _id;
    }

    public void set_id(String _id) {
        this._id = _id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getIngredients() {
        return ingredients;
    }

    public void setIngredients(String ingredients) {
        this.ingredients = ingredients;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }
}
