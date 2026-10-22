package com.example.recipieHelper.repository.favoriteRecipe;

import com.example.recipieHelper.model.Recipe;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface FavoriteRecipeRepository extends MongoRepository<Recipe,String>,FavoriteRecipeRepositoryCustom {
}
