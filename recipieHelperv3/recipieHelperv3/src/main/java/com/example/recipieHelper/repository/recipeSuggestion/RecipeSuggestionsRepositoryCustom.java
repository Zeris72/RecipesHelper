package com.example.recipieHelper.repository.recipeSuggestion;

import com.example.recipieHelper.model.RecipeSuggestion;

import java.util.List;

public interface RecipeSuggestionsRepositoryCustom {

    void addRecipeSuggestion(RecipeSuggestion recipe);

    List<RecipeSuggestion> findAll();

    RecipeSuggestion findRecipeById(String recipeId);

    void removeSuggestedRecipe(String recipeId);
}
