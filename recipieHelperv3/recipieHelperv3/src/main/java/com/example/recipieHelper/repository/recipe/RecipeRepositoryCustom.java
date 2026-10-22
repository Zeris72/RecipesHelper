package com.example.recipieHelper.repository.recipe;

import com.example.recipieHelper.model.*;

import java.util.List;

public interface RecipeRepositoryCustom {

    int getRatingByUserName(String recipeId,String userId);
    RatingData getRatingData(String recipeId);

    //List<Recipe> filterByDiet(String diet);

    void addComment(String recipeId, Comment comment);

    RatingData addRating(String recipeId, Rating rating,int mode);

    List<Recipe> findByIngredients(List<IngredientToCal> ingredients, String dietType);

    void removeComment(String recipeId,int commentId);

    void addNewRecipe(Recipe newRecipe);

    void saveEditRecipe(Recipe editedRecipe);
}
