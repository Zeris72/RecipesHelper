package com.example.recipieHelper.controller;

import com.example.recipieHelper.model.Recipe;
import com.example.recipieHelper.model.RecipeSuggestion;
import com.example.recipieHelper.model.User;
import com.example.recipieHelper.repository.recipe.RecipeRepository;
import com.example.recipieHelper.repository.recipeSuggestion.RecipeSuggestionsRepository;
import com.example.recipieHelper.repository.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RecipeRepository recipeRepository;

    @Autowired
    private RecipeSuggestionsRepository recipeSuggestionsRepository;


    @GetMapping("/users")
    public List<User> getAllUsers(){
        return userRepository.findAll();
    }

    @DeleteMapping("/removeUser/{userId}")
    public void removeUser(@PathVariable String userId){
        userRepository.removeUser(userId);
    }

    @DeleteMapping("/removeComment/{recipeId}")
    public void removeComment(@PathVariable String recipeId, @RequestBody int commentId){
        recipeRepository.removeComment(recipeId,commentId);
    }

    @PostMapping("/addNewRecipe")
    public void addNewRecipe(@RequestBody Recipe newRecipe){
        recipeRepository.addNewRecipe(newRecipe);
    }

    @PostMapping("/editRecipe")
    public void editRecipe(@RequestBody Recipe editedRecipe){
        recipeRepository.saveEditRecipe(editedRecipe);
    }

    @GetMapping("/suggested")
    public List<RecipeSuggestion> findAllSuggestedRecipes(){
        return recipeSuggestionsRepository.findAll();
    }

    @GetMapping("/suggestedRecipe/{recipeId}")
    public RecipeSuggestion findSuggestionById(@PathVariable String recipeId){
        return recipeSuggestionsRepository.findRecipeById(recipeId);
    }

    @DeleteMapping("/removeSuggestedRecipe/{recipeId}")
    public void removeSuggestedRecipe(@PathVariable String recipeId){
        recipeSuggestionsRepository.removeSuggestedRecipe(recipeId);
    }
}
