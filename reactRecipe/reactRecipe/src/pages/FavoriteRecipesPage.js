import RecipeList from "../components/recipies/RecipeList";
import classes from "../components/display/MainPageDisplay.module.css"
import { useState,useEffect,useContext } from "react";
import { useNavigate } from "react-router-dom";
import Context from "../store/context";
import Cookies from "js-cookie";

function FavoriteRecipesPage(){
    const [isLoading,setIsLoading] = useState(true);
    const [loadedRecipes,setLoadedRecipes] = useState([]);
    const navigate = useNavigate();
    const userCtx = useContext(Context)

    
    useEffect(
        ()=>{
            if(Cookies.get("userName")===undefined){
                navigate("/login");
            }else{
                setIsLoading(true);
                fetch(
                    "api/favorites/"+Cookies.get("userId"),
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
                        setLoadedRecipes(recipies);
                    }
                );
            }
        },[]
    );
    

    if(isLoading){
        return <p>Loading...</p>
    }

    return <div className={classes.foreground}>
        <RecipeList recipies={loadedRecipes}/>
    </div>
}

export default FavoriteRecipesPage;