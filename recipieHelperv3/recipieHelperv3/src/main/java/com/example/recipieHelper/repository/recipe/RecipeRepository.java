package com.example.recipieHelper.repository.recipe;

import com.example.recipieHelper.model.Recipe;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface RecipeRepository extends MongoRepository<Recipe, String>, RecipeRepositoryCustom {

    List<Recipe> findAll();
}
