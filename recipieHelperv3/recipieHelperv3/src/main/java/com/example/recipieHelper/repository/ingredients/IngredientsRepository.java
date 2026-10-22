package com.example.recipieHelper.repository.ingredients;

import com.example.recipieHelper.model.Ingredient;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface IngredientsRepository extends MongoRepository<Ingredient,String>,IngredientsRepositoryCustom {
}
