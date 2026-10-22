import classes from "./AddIngredientToCal.module.css"
import { useRef } from "react";

function AddIngredientToCal(props){

    const id = props.ingredientCount
    const inputAmount = useRef();
    const ingredientName = useRef();
    const options = [];

    function verifyInput(){
        const regex = /^[0-9]+$/;
        const inputValue = inputAmount.current.value;
        if(!regex.test(inputValue)){
            inputAmount.current.value=inputValue.substring(0,inputValue.length-1)
        }
    }

    function onAmountChange(){
        props.addAmount(id,inputAmount.current.value,ingredientName.current.value)
    }

    for(let i=0;i<props.ingredients.length;i++){
        options.push(<option value={props.ingredients[i].name}>{props.ingredients[i].name}</option>)
    }
    
    return <div className={classes.ingredientDiv}>
        <select ref={ingredientName} className={classes.select}>
            {options}
        </select>
        <input onBlur={onAmountChange} ref={inputAmount} onChange={verifyInput} className={classes.input}></input>
    </div>
}

export default AddIngredientToCal;