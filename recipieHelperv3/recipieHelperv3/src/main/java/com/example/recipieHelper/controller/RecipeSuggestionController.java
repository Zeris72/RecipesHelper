package com.example.recipieHelper.controller;


import com.example.recipieHelper.model.RecipeSuggestion;
import com.example.recipieHelper.repository.recipeSuggestion.RecipeSuggestionsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/recipeSuggestion")
public class RecipeSuggestionController {

    @Autowired
    private RecipeSuggestionsRepository repository;

    @PostMapping("/add")
    public void addSuggestion(@RequestBody RecipeSuggestion recipe){
        repository.addRecipeSuggestion(recipe);
    }
}
