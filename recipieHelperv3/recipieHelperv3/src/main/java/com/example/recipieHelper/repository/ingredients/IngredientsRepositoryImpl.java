package com.example.recipieHelper.repository.ingredients;

import com.example.recipieHelper.model.Ingredient;
import com.example.recipieHelper.model.IngredientToCal;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public class IngredientsRepositoryImpl implements IngredientsRepositoryCustom{

    private final MongoTemplate mongoTemplate;

    public IngredientsRepositoryImpl(MongoTemplate mongoTemplate) {
        this.mongoTemplate = mongoTemplate;
    }

    @Override
    public List<IngredientToCal> findAllIngredients(){
        Query query = new Query();
        List<IngredientToCal> result;

        result = mongoTemplate.find(query, IngredientToCal.class,"ingredients");

        return result;
    }

    @Override
    public List<String> getIngredientsNames(){
        Query query = new Query();
        query.fields().include("name");
        query.fields().exclude("_id");
        List<String> names;

        names = mongoTemplate.find(query, String.class,"ingredients");

        return names;
    }

    /*@Override
    public List<Ingredient> findByNames(List<String> names){
        Query query = new Query();
        List<Criteria> criteriaList = new ArrayList<>();
        names.forEach(name->criteriaList.add(Criteria.where("name").is(name)));

        query.addCriteria(new Criteria().orOperator(criteriaList.toArray(new Criteria[criteriaList.size()])));

        List<Ingredient> result;

        result = mongoTemplate.find(query,Ingredient.class,"ingredients");

        return result;
    }*/


    @Override
    public double calCount(List<Map<String,String>> ingredients){
        double result = 0;
        Query query = new Query();
        List<Criteria> criteriaList = new ArrayList<>();
        int i=0;

        ingredients.forEach(ingredient->criteriaList.add(Criteria.where("name").is(ingredient.get("name"))));
        query.addCriteria(new Criteria().orOperator(criteriaList.toArray(new Criteria[criteriaList.size()])));

        List<IngredientToCal> ingredientList;
        ingredientList = mongoTemplate.find(query, IngredientToCal.class,"ingredients");

        for(i=0;i<ingredients.size();i++){
            String name = ingredients.get(i).get("name");
            double amount = Double.valueOf(ingredients.get(i).get("amount"));
            for(int j=0;j<ingredientList.size();j++){
                if(ingredientList.get(j).getName().equals(name)){
                    result+=ingredientList.get(j).getCalPer100g()*amount;
                    ingredientList.remove(j);
                }
            }
        }

        return result/100;
    }
}
