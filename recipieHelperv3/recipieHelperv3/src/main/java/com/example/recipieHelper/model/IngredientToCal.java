package com.example.recipieHelper.model;

import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.FieldType;

public class IngredientToCal {

    @Field(targetType = FieldType.OBJECT_ID)
    private String _id;
    private String name;
    private int calPer100g;

    public IngredientToCal(String name) {
        this.name = name;
    }

    public String get_id() {
        return _id;
    }

    public void set_id(String _id) {
        this._id = _id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getCalPer100g() {
        return calPer100g;
    }

    public void setCalPer100g(int calPer100g) {
        this.calPer100g = calPer100g;
    }
}
