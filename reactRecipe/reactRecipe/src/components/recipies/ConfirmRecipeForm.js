import classes from "./ConfirmRecipeForm.module.css"
import { useRef,useState,useEffect } from "react";
import AddIngredientToCal from "../ingredientsToCal/AddIngredientToCal";

function ConfirmRecipeForm(){
    const titleInput = useRef();
    const contentInput = useRef();
    const dietTypeInput = useRef();
    const [ingredientCount,setIngredientCount] = useState(0);
    const [amountOfIngredient,setAmountOfIngredient] = useState([]);
    const [ingredients,setIngredients] = useState([]);
    const [content,setContent] = useState([]);

    useEffect(()=>{
        fetch(
            "api/ingredients",
        ).then(
            response => {return response.json()}
        ).then(data=>{
            setIngredients(data)
        })
    },[])

    function addIngredientToCal(){
        setIngredientCount(ingredientCount+1)
        setAmountOfIngredient([...amountOfIngredient,{name: null,amount:0}])
        setContent([...content,<AddIngredientToCal ingredientCount={ingredientCount} addAmount={addAmount} ingredients={ingredients}/>])
    }
    
    function addAmount(id,ingredientAmount,ingredientName){
        var newArr = [...amountOfIngredient]
        newArr[id]={name: ingredientName, amount: ingredientAmount}
        setAmountOfIngredient(newArr);
    }

    function addRecipeHandler(){

        const newRecipe = {
            title: titleInput.current.value,
            recipeInstructions: contentInput.current.value,
            dietType: dietTypeInput.current.value,
            ingredients: amountOfIngredient,
            comments:[],
            rating:[]
        }

        fetch(
            "/api/admin/addNewRecipe",
            {
                method:"POST",
                body:JSON.stringify(newRecipe),
                headers:{
                    "content-type": "application/json"
                } 
            }
        )
    }

    return(
        <div>
            <div>
                <label className={classes.label}>Nazwa przepisu</label>
                <input type="text" ref={titleInput} id="title" required className={classes.input}/>
            </div>
            <div>
                {content}
                <button onClick={addIngredientToCal} className={classes.button}>Dodaj składnik</button>
            </div>
            <div className={classes.div}>
                <label className={classes.label}>Opis przygotowania</label>
                <textarea ref={contentInput} id="content" required rows={5} cols={30} className={classes.inputArea}/>
            </div>
            <div>
                <label className={classes.label}>Typ diety</label>
                <input type="text" ref={dietTypeInput} id="dietType" required className={classes.input}/>
            </div>
            <button onClick={addRecipeHandler} className={classes.button}>Zapisz</button>
        </div>
    )
}

export default ConfirmRecipeForm