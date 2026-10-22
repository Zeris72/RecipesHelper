import classes from "../components/ingredientsToCal/AddIngredientToCal.module.css"
import { useEffect, useState } from "react"
import AddIngredientToCal from "../components/ingredientsToCal/AddIngredientToCal";

function CalCalculatorPage(){
    const [content,setContent] = useState([]);
    const [ingredientCount,setIngredientCount] = useState(0);
    const [amountOfIngredient,setAmountOfIngredient] = useState([]);
    const [ingredients,setIngredients] = useState([]);
    const [totalCal,setTotalCal] = useState();

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

    useEffect(()=>{
        fetch(
            "api/ingredients",
        ).then(
            response => {return response.json()}
        ).then(data=>{
            setIngredients(data)
        })
    },[])

    function calculateCal(){
        if(ingredientCount>0){
            fetch(
                "api/ingredients/calculateCal",
                {
                    method: "POST",
                    body:JSON.stringify(amountOfIngredient),
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
                    setTotalCal(data);
                } 
            )
        }
        
    }
    
    return (
    <div className={classes.section}>
        <h1>Podawaj ilośc składników w gramach</h1>
        <div>
            {content}
        </div>
        <div>
            <button onClick={addIngredientToCal} className={classes.button}>Dodaj składnik</button>
        </div>
        <button onClick={calculateCal} className={classes.button}>Oblicz kalorie</button>
        <br></br>
        <h2>Suma kalorii: {totalCal} kcal</h2>
    </div>)
}

export default CalCalculatorPage;