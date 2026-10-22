import classes from "./MainPageDisplay.module.css"
import IngredientList from "../ingredients/IngredientList";
import { useState,useEffect } from "react";


function MainPageDisplay(){

    const [ingredientsList,setIngredientsList] = useState([]);
    const [isLoading,setIsLoading] = useState(true);

    useEffect(
        ()=>{
            setIsLoading(true);
            fetch(
                "/api/ingredients",
        
            ).then(
                response=>{
                    return response.json();          
                }
            ).then(
                data=>{
                    const ingredients=[];
                    for(const key in data){
                        const ingredient={
                                id:data[key]._id,
                                name:data[key].name
                        }
                        ingredients.push(ingredient)
                    }
                    setIngredientsList(ingredients);
                    setIsLoading(false);
                } 
            )
        },[]
    );

        return (
                <div className={classes.foreground}>
                    <IngredientList ingredients={ingredientsList}/>
                </div>
        )
}

export default MainPageDisplay;