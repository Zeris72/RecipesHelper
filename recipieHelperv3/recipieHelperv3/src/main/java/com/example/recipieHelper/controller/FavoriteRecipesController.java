package com.example.recipieHelper.controller;

import com.example.recipieHelper.model.Recipe;
import com.example.recipieHelper.repository.favoriteRecipe.FavoriteRecipeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/favorites")
public class FavoriteRecipesController {

    @Autowired
    private FavoriteRecipeRepository repository;

    @GetMapping("/{userId}")
    public List<Recipe> findAll(@PathVariable String userId){
        return repository.findAll(userId);
    }

    @PostMapping("/isFavorite")
    public boolean recipeIsFavorite(@RequestBody Map<String,String> data){
        String userId = data.get("userId");
        String recipeId = data.get("recipeId");
        return repository.recipeIsFavorite(userId,recipeId);
    }

    @PostMapping("/add/{userId}")
    public void addRecipeToFavorite(@PathVariable String userId,@RequestBody String recipeId){
        repository.addRecipeToFavorite(userId,recipeId);
    }

    @DeleteMapping("/remove")
    public void removeRecipeFromFavorite(@RequestBody Map<String,String> data){
        String userId = data.get("userId");
        String recipeId = data.get("recipeId");
        repository.removeRecipeFromFavorite(userId,recipeId);
    }

}
