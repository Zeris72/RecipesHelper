package com.example.recipieHelper.model;


import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.FieldType;

import java.util.List;

@Document(collection = "recipes")
public class Recipe {

    @Field(targetType = FieldType.OBJECT_ID)
    private String _id;
    private String title;
    private String recipeInstructions;
    private String dietType;
    private List<Ingredient> ingredients;
    private List<Comment> comments;
    private List<Rating> rating;

    public Recipe(String _id, String title, String recipeInstructions, String dietType, List<Ingredient> ingredients, List<Comment> comments, List<Rating> rating) {
        this._id = _id;
        this.title = title;
        this.recipeInstructions = recipeInstructions;
        this.dietType = dietType;
        this.ingredients = ingredients;
        this.comments = comments;
        this.rating = rating;
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

    public String getRecipeInstructions() {
        return recipeInstructions;
    }

    public void setRecipeInstructions(String recipeInstructions) {
        this.recipeInstructions = recipeInstructions;
    }

    public String getDietType() {
        return dietType;
    }

    public void setDietType(String dietType) {
        this.dietType = dietType;
    }

    public List<Ingredient> getIngredients() {
        return ingredients;
    }

    public void setIngredients(List<Ingredient> ingredients) {
        this.ingredients = ingredients;
    }

    public List<Comment> getComments() {
        return comments;
    }

    public void setComments(List<Comment> comments) {
        this.comments = comments;
    }

    public List<Rating> getRating() {
        return rating;
    }

    public void setRating(List<Rating> rating) {
        this.rating = rating;
    }

    @Override
    public String toString() {
        return "Recipe{" +
                "_id='" + _id + '\'' +
                ", title='" + title + '\'' +
                ", recipeInstructions='" + recipeInstructions + '\'' +
                ", dietType='" + dietType + '\'' +
                ", ingredients=" + ingredients +
                ", comments=" + comments +
                ", rating=" + rating +
                '}';
    }
}
