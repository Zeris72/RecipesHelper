import classes from "../components/recipies/AddRecipeForm.module.css"
import AddRecipeFrom from "../components/recipies/AddRecipeForm";
import { useNavigate } from "react-router-dom";

function SuggestRecipePage(){
    const navigate = useNavigate();

    function onAddRecipie(recipieData){
        fetch(
            "api/recipeSuggestion/add",
            {
                method: "POST",
                body:JSON.stringify(recipieData),
                headers:{
                    "content-type": "application/json"
                } 
            }
        )
        navigate(-1);
    }

    return <div className={classes.section}>
        <h1>Zasugeruj dodanie swojego przepisu</h1>
        <AddRecipeFrom onAddRecipie={onAddRecipie}/>
    </div>
}

export default SuggestRecipePage;