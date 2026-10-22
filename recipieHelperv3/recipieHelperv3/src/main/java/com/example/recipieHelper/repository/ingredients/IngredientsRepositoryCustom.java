package com.example.recipieHelper.repository.ingredients;

import com.example.recipieHelper.model.Ingredient;
import com.example.recipieHelper.model.IngredientToCal;

import java.util.List;
import java.util.Map;

public interface IngredientsRepositoryCustom {

    List<IngredientToCal> findAllIngredients();

    //List<Ingredient> findByNames(List<String> names);

    double calCount(List<Map<String,String>> ingredients);

    List<String> getIngredientsNames();
}
