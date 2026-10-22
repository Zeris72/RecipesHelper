package com.example.recipieHelper.repository.recipe;

import com.example.recipieHelper.model.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import java.text.DecimalFormat;

import java.util.ArrayList;
import java.util.List;

public class RecipeRepositoryImpl implements RecipeRepositoryCustom{

    private final MongoTemplate mongoTemplate;

    @Autowired
    public RecipeRepositoryImpl(MongoTemplate mongoTemplate) {
        this.mongoTemplate = mongoTemplate;
    }

    @Override
    public int getRatingByUserName(String recipeId,String userId){
        final int[] userRating = new int[1];
        Recipe recipe;
        final String user = userId.replace("\"","");
        if(user.contains("null")){
            userRating[0]=0;
            return userRating[0];
        }

        Query query = new Query();
        query.addCriteria(Criteria.where("_id").is(recipeId).and("rating").elemMatch(Criteria.where("userId").is(user)));

        recipe = mongoTemplate.findOne(query,Recipe.class,"recipes");

        try{
            recipe.getRating().forEach(rating-> {if(rating.getUserId().equals(user)){userRating[0] = rating.getRating();}});
        }catch(NullPointerException e){
            userRating[0]=0;
            return userRating[0];
        }

        return userRating[0];
    };

    @Override
    public RatingData getRatingData(String recipeId){
        Recipe recipie = mongoTemplate.findById(recipeId, Recipe.class);
        DecimalFormat decfor = new DecimalFormat("0.00");

        int ratingSize = recipie.getRating().size();
        double avgRating = 0;

        for(int i=0;i<ratingSize;i++){
            avgRating+=recipie.getRating().get(i).getRating();
        }

        avgRating/=ratingSize;

        String formattedAvgRating = decfor.format(avgRating).replace(",",".");

        return new RatingData(Double.parseDouble(formattedAvgRating),ratingSize);
    }

    /*@Override
    public List<Recipe> filterByDiet(String diet){

        Query query = new Query();
        query.addCriteria(Criteria.where("dietType").is(diet));

        List<Recipe> result = mongoTemplate.find(query,Recipe.class);

        return result;
    };*/

    @Override
    public void addComment(String recipeId, Comment comment){
        Query query = new Query();
        query.addCriteria(Criteria.where("_id").is(recipeId));

        mongoTemplate.updateFirst(query,new Update().push("comments",comment),Recipe.class);
    };

    @Override
    public RatingData addRating(String recipeId, Rating rating,int mode){
        Query query = new Query();
        query.addCriteria(Criteria.where("_id").is(recipeId));
        if(mode==0){
            mongoTemplate.updateFirst(query,new Update().push("rating",rating), Recipe.class);
        }else if(mode==1){
            query.addCriteria(Criteria.where("rating.userId").is(rating.getUserId()));
            mongoTemplate.updateFirst(query,Update.update("rating.$.rating",rating.getRating()),Recipe.class);
        }

        return getRatingData(recipeId);
    }

    @Override
    public List<Recipe> findByIngredients(List<IngredientToCal> ingredients, String dietType){
        Query query = new Query();
        List<Recipe> result = new ArrayList<>();

        List<Criteria> criteriaList = new ArrayList<>();
        //ingredients.forEach(ingredient->criteriaList.add(Criteria.where("ingredients").elemMatch(Criteria.where("name").is(ingredient.getName()))));

        ingredients.forEach(ingredient -> criteriaList.add(Criteria.where("ingredients.name").is(ingredient.getName())));

        query.addCriteria(new Criteria().orOperator(criteriaList.toArray(new Criteria[criteriaList.size()])));

        //query.addCriteria(Criteria.where("ingredients").elemMatch(new Criteria().orOperator(criteriaList.toArray(new Criteria[criteriaList.size()]))));

        if(!dietType.equals("none")){
            query.addCriteria(Criteria.where("dietType").is(dietType));
        }

        System.out.println(query);
        result = mongoTemplate.find(query,Recipe.class,"recipes");
        System.out.println(result);
        return result;
    }

    @Override
    public void removeComment(String recipeId,int commentId){
        Query query = new Query();
        query.addCriteria(Criteria.where("_id").is(recipeId));

        Update update = new Update().unset("comments."+commentId);
        mongoTemplate.updateFirst(query,update,"recipes");

        update = new Update().pull("comments",null);
        mongoTemplate.updateFirst(query,update,"recipes");
    }

    @Override
    public void addNewRecipe(Recipe newRecipe){
        mongoTemplate.save(newRecipe,"recipes");
    }

    @Override
    public void saveEditRecipe(Recipe editedRecipe){
        Query query = new Query();
        query.addCriteria(Criteria.where("_id").is(editedRecipe.get_id()));

        Update update = new Update().set("title",editedRecipe.getTitle());
        update.set("recipeInstructions",editedRecipe.getRecipeInstructions());
        update.set("dietType",editedRecipe.getDietType());
        update.set("ingredients",editedRecipe.getIngredients());

        mongoTemplate.updateFirst(query,update,"recipes");
    }
}
