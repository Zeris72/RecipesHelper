import classes from "./RecipeItem.module.css"
import {useNavigate} from "react-router-dom";

function RecipeItem(props){
    const navigate = useNavigate();

    function showRecipeHandler(){
        navigate("/recipe",{state:{id:props.id}});
    }

    return (
        <div className={classes.article} onClick={showRecipeHandler}>
            <h1 className={classes.header}>{props.title}</h1>
        </div>
    )
}

export default RecipeItem;