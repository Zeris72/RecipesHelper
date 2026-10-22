package com.example.recipieHelper.controller;


import com.example.recipieHelper.model.IngredientToCal;
import com.example.recipieHelper.repository.ingredients.IngredientsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/ingredients")
public class IngredientsController {

    @Autowired
    private IngredientsRepository repository;

    @GetMapping("")
    public List<IngredientToCal> findAllIngredients(){
        return repository.findAllIngredients();
    }

    @GetMapping("/getNames")
    public List<String> getNames(){return repository.getIngredientsNames();};

    /*@PostMapping("/names")
    public List<Ingredient> findByNames(@RequestBody List<String> names){
        return repository.findByNames(names);
    }*/

    @PostMapping("/calculateCal")
    public double calCount(@RequestBody List<Map<String,String>> ingredients){
        return repository.calCount(ingredients);
    }
}
