import {useState, useEffect} from "react";
import {useLocation} from "react-router-dom";
import ShowRecipeItem from "../components/recipies/ShowRecipeItem";

function ShowRecipePage(){

    const location = useLocation();
    const [isLoading,setLoading] = useState(true);
    const [recipeData,setRecipieData] = useState();
    const [reset,setReset] = useState(true);

    useEffect(()=>{
        setLoading(true);
        fetch(
            "api/recipe/"+location.state.id
        ).then(response=>{
            return response.json();
        }).then(data=>{
            const recipeData = {
                id: location.state.id,
                title: data.title,
                content: data.recipeInstructions,
                ingredients: data.ingredients,
                comments: data.comments
            }
            console.log(recipeData)
            setLoading(false)
            setRecipieData(recipeData)
        }   
        )
    },[reset]);

    if(isLoading){
        return <p>loading</p>
    }

    return <ShowRecipeItem recipieData={recipeData} reset={reset} setReset={setReset}/>
}

export default ShowRecipePage;