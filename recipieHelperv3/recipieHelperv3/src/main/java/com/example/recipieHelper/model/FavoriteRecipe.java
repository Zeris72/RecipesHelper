package com.example.recipieHelper.model;

import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.FieldType;

import java.util.List;


// można to usunąć?
@Document("favoriteRecipies")
public class FavoriteRecipe {
    @Field(targetType = FieldType.OBJECT_ID)
    private String _id;
    private String title;
    private String recipeInstructions;
    private String dietType;
    private List<Ingredient> ingredients;
    private List<Comment> comments;
    private List<Rating> rating;

    public FavoriteRecipe(org.bson.Document document){
        this._id = document.getObjectId("_id").toString();
        this.title = document.getString("title");
        this.recipeInstructions = document.getString("recipeInstructions");
        this.dietType = document.getString("dietType");
        //this.ingredients = document.getList("ingredients", Ingredient.class);
        this.comments = document.getList("comments", Comment.class);
        this.rating = document.getList("rating", Rating.class);
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
        return "FavoriteRecipe{" +
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
