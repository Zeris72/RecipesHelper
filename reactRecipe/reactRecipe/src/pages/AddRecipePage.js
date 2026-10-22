import classes from "../components/recipies/ConfirmRecipeForm.module.css"
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom"
import ConfirmRecipeForm from "../components/recipies/ConfirmRecipeForm";

function AddRecipePage(){
    const location = useLocation();
    const [suggestsedTitle,setSuggestedTitle] = useState();
    const [suggestedContent,setSuggestedContent] = useState();
    const [suggestedIngredients,setSuggestedIngredients] = useState();
    const [suggestedUrl,setSuggestedUrl] = useState();
    const [suggestedAuthorId,setSuggestedAuthorId] = useState();

    useEffect(()=>{
        fetch(
            "/api/admin/suggestedRecipe/"+location.state.id
        ).then(response=>{
            return response.json()
        }).then(
            data=>{
                setSuggestedTitle(data.title)
                setSuggestedContent(data.content)
                setSuggestedIngredients(data.ingredients)
                setSuggestedUrl(data.url)
                setSuggestedAuthorId(data.userId)
            }
        )
    },[])


    return (
        <div className={classes.section}>
            <h2>Sugestia przepisu</h2>
            <p>Tytuł: {suggestsedTitle}</p>
            <p>Opis przygotowania: {suggestedContent}</p>
            <p>Składniki: {suggestedIngredients}</p>
            <p>Adres strony: {suggestedUrl}</p>
            <p>Identyfikator autora: {suggestedAuthorId}</p>
            <h2>Wprowadź sprawdzone dane</h2>
            <ConfirmRecipeForm/>
        </div>
    )
}

export default AddRecipePage