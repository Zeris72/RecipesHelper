package com.example.recipieHelper.repository.favoriteRecipe;

import com.example.recipieHelper.model.Recipe;
import com.mongodb.client.model.Updates;
import org.bson.Document;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;

import java.util.ArrayList;
import java.util.List;

public class FavoriteRecipeRepositoryImpl implements FavoriteRecipeRepositoryCustom{

    private final MongoTemplate mongoTemplate;

    public FavoriteRecipeRepositoryImpl(MongoTemplate mongoTemplate) {
        this.mongoTemplate = mongoTemplate;
    }

    @Override
    public List<Recipe> findAll(String userId){
        Query query = new Query();
        Query recipesQuery = new Query();
        List<Recipe> result = new ArrayList<>();
        List<Criteria> criteriaList = new ArrayList<>();
        String[] test;
        query.addCriteria(Criteria.where("_id").is(userId));
        query.fields().exclude("_id");
        query.fields().include("favoriteRecipes");

        //Document favoriteRecipesDocument = mongoTemplate.findOne(query, Document.class,"users");

        List<String> favoriteRecipesDocument = mongoTemplate.find(query, String.class,"users");

        //to może jakoś się da zamienić
        if (favoriteRecipesDocument.get(0).equals("{\"favoriteRecipes\": []}")){
            return result;
        }

        test= favoriteRecipesDocument.get(0).split("\"");
        /*System.out.println(favoriteRecipesDocument);
        System.out.println(test[5]);*/

        for(int i=3;i< test.length;i+=2){
            //recipesQuery.addCriteria(Criteria.where("_id").is(test[i]));
            criteriaList.add(Criteria.where("_id").is(test[i]));
        }
        try {
            //List<Document> favoriteRecipes = favoriteRecipesDocument.getList("favoriteRecipes", Document.class);
            //favoriteRecipesDocument.forEach(recipe->{recipesQuery.addCriteria(Criteria.where("_id").is(recipe));
                //System.out.println(recipe);});
            //favoriteRecipes.forEach(id ->{recipesQuery.addCriteria(Criteria.where("_id").is(id.getObjectId("_id").toString()));});
        }catch (NullPointerException ignored){

        }
        recipesQuery.addCriteria(new Criteria().orOperator(criteriaList.toArray(new Criteria[criteriaList.size()])));
        result = mongoTemplate.find(recipesQuery, Recipe.class,"recipes");

        return result;
    }

    @Override
    public void addRecipeToFavorite(String userId,String recipeId){
        Query query = new Query();
        query.addCriteria(Criteria.where("_id").is(userId));

        mongoTemplate.updateFirst(query,new Update().push("favoriteRecipes",recipeId),"users");
    }

    @Override
    public boolean recipeIsFavorite(String userId,String recipeId){
        Query query = new Query();
        query.addCriteria(Criteria.where("_id").is(userId));
        query.addCriteria(Criteria.where("favoriteRecipes").is(recipeId));

        Recipe favorite = mongoTemplate.findOne(query,Recipe.class,"users");

        if(favorite==null){
            return false;
        }else{
            return true;
        }
    }

    @Override
    public void removeRecipeFromFavorite(String userId,String recipeId){
        Query query = new Query();
        query.addCriteria(Criteria.where("_id").is(userId));
        Update update = new Update().pull("favoriteRecipes",recipeId);

        mongoTemplate.updateFirst(query,update,"users");
    }

}
