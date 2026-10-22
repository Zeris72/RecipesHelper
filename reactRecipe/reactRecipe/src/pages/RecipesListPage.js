import RecipeList from "../components/recipies/RecipeList";
import { useEffect,useState,useContext } from "react";
import { useNavigate } from "react-router-dom";
import classes from "../components/display/MainPageDisplay.module.css"
import SearchBarContext from "../store/context";

function RecipesListPage(){
    const [isLoading,setIsLoading] = useState(true);
    const [loadedRecipes,setLoadedRecipies] = useState([]);
    const searchCtx = useContext(SearchBarContext);
    const navigate = useNavigate();
   
    useEffect(
        ()=>{
            if(searchCtx.ingredientsText===""){
                navigate("/",{replace:true})
            }else{
                setIsLoading(true);
                fetch(
                    "api/recipe/searchByIngredient/"+searchCtx.dietType,
                    {
                        method:"POST",
                        body: JSON.stringify(searchCtx.ingredientsText),
                        headers:{
                            "content-type": "application/json"
                        }
                    }
                ).then(
                    response=>{
                        return response.json();
                    }
                ).then(
                    data=>{
                        const recipies=[];
                        for(const key in data){
                            const recipie={
                                id:key,
                                ...data[key]
                            };
                            recipies.push(recipie)
                        }
                        setIsLoading(false);
                        setLoadedRecipies(recipies);
                    }
                );
            }
        },[searchCtx.dietType,searchCtx.refreshResultPageContext]
    );

    if(isLoading){
        return <p>Loading...</p>
    }

    return <div className={classes.foreground}>
        <RecipeList recipies={loadedRecipes}/>
    </div>
    
}

export default RecipesListPage;