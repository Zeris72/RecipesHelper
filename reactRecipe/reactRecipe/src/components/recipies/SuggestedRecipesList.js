import classes from "./SuggestedRecipesList.module.css"
import { useNavigate } from "react-router-dom"

function SuggestedRecipesList(props){
    const navigate = useNavigate();

    function addNewRecipe(recipeId){
        navigate("/addrecipe",{state:{id:recipeId}});
    }

    return(
    <ul>
        {props.recipes.map(recipe => (<div className={classes.div}><label className={classes.label}>{recipe.title}</label><button onClick={()=>addNewRecipe(recipe._id)} className={classes.button}>Dodaj</button></div>))}
    </ul>
    )
}

export default SuggestedRecipesList