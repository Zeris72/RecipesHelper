package com.example.recipieHelper.repository.recipeSuggestion;

import com.example.recipieHelper.model.Recipe;
import com.example.recipieHelper.model.RecipeSuggestion;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;

import java.util.List;

public class RecipeSuggestionsRepositoryImpl implements RecipeSuggestionsRepositoryCustom{

    private final MongoTemplate mongoTemplate;

    public RecipeSuggestionsRepositoryImpl(MongoTemplate mongoTemplate) {
        this.mongoTemplate = mongoTemplate;
    }

    @Override
    public void addRecipeSuggestion(RecipeSuggestion recipe){
        mongoTemplate.save(recipe,"suggestedRecipes");
    }

    @Override
    public List<RecipeSuggestion> findAll(){
        return mongoTemplate.findAll(RecipeSuggestion.class, "suggestedRecipes");
    }

    @Override
    public RecipeSuggestion findRecipeById(String recipeId){
        Query query = new Query();
        query.addCriteria(Criteria.where("_id").is(recipeId));

        return mongoTemplate.findOne(query,RecipeSuggestion.class,"suggestedRecipes");
    }

    @Override
    public void removeSuggestedRecipe(String recipeId){
        Query query = new Query();
        query.addCriteria(Criteria.where("_id").is(recipeId));

        mongoTemplate.remove(query,"suggestedRecipes");
    }


}
