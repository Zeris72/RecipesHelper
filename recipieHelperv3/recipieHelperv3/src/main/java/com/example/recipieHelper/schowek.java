package com.example.recipieHelper;

public class schowek {

    /*
    package com.example.recipieHelper.model;

    import org.springframework.data.mongodb.core.mapping.Document;

    import java.util.List;

    @Document("recipies")
    public record Recipie(
            Integer id,
            String title,
            String content,
            String dietType,
            List<Ingredient> ingredients,
            List<Comment> comments,
            List<Rating> rating
    ) {
    }
   */

    /*
    List<Document> test = new ArrayList<>();
        mongoTemplate.find(query, Document.class,"users").forEach(document -> test.add(document));

        System.out.println(test);

        List<String> test2 = new ArrayList<>();
        test.forEach(document -> test2.add(document.getObjectId("_id").toString()));
        System.out.println(test2);

        Query recipesQuery = new Query();
        test2.forEach(id ->{recipesQuery.addCriteria(Criteria.where("_id").is(id));});

        System.out.println(recipesQuery);

        List<Recipe> result = mongoTemplate.find(recipesQuery, Recipe.class,"recipes");
     */
}
