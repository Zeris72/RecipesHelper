package com.example.recipieHelper.repository.recipeSuggestion;

import com.example.recipieHelper.model.RecipeSuggestion;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface RecipeSuggestionsRepository extends MongoRepository<RecipeSuggestion,String>,RecipeSuggestionsRepositoryCustom {
}
