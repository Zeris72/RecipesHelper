package com.example.recipieHelper.controller;

import com.example.recipieHelper.model.*;
import com.example.recipieHelper.repository.recipe.RecipeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/recipe")
public class RecipeController {

    @Autowired
    private RecipeRepository repository;

    @GetMapping("")
    public List<Recipe> findAll(){return repository.findAll();}

    @GetMapping("/{recipeId}")
    public Optional<Recipe> findById(@PathVariable String recipeId){
        return repository.findById(recipeId);
    }

    @PostMapping("/{recipeId}/addComment")
    public void addComment(@PathVariable String recipeId,@RequestBody Comment comment){
        repository.addComment(recipeId,comment);
    }

    @PostMapping("/{recipeId}/addRating/{mode}")
    public RatingData addRating(@PathVariable String recipeId,@RequestBody Rating rating,@PathVariable int mode){
        return repository.addRating(recipeId,rating,mode);
    }

    @PostMapping("/{recipeId}/getRating")
    public Number[] basicRatingData(@PathVariable String recipeId,@RequestBody String userId){
        Number[] data = new Number[3];
        RatingData ratingData = repository.getRatingData(recipeId);
        data[0] = ratingData.getAverage();
        data[1] = ratingData.getQuantityOfRatings();
        data[2] = repository.getRatingByUserName(recipeId,userId);

        return data;
    }

    /*@GetMapping("/diet/{dietType}")
    public List<Recipe> filterByDiet(@PathVariable String dietType){
        return repository.filterByDiet(dietType);
    }*/

    @PostMapping("/searchByIngredient/{dietType}")
    public List<Recipe> findByIngredients(@PathVariable String dietType,@RequestBody String ingredients){
        if(ingredients.equals("")){
            return new ArrayList<>();
        }
        ingredients = ingredients.replace("\""," ");
        ingredients = ingredients.toLowerCase();
        String[] temp = ingredients.split("[,+;:.]+");
        List<IngredientToCal> ingredientsList = new ArrayList<>();
        for(int i =0;i<temp.length;i++){
            if(!temp[i].isBlank()){
                ingredientsList.add(new IngredientToCal(temp[i].trim()));
            }
        }
        return repository.findByIngredients(ingredientsList,dietType);
    }
}
