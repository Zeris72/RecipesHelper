package com.example.recipieHelper.repository.favoriteRecipe;


import com.example.recipieHelper.model.Recipe;

import java.util.List;

public interface FavoriteRecipeRepositoryCustom {

    List<Recipe> findAll(String userId);

    void addRecipeToFavorite(String userId,String recipeId);

    boolean recipeIsFavorite(String userId,String recipeId);

    void removeRecipeFromFavorite(String userId,String recipeId);
}
