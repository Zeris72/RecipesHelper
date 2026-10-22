import { useContext } from "react";

import classes from "./IngredientItem.module.css";
import SearchBarContext from "../../store/context";


function IngredientItem(props){
    const searchCtx = useContext(SearchBarContext);

    function clickHandler(){
        searchCtx.addIngredient(props.name);
        //console.log(searchCtx.ingredients)
    }
    //<img className={classes.image} src={props.image} alt={props.name}/>
    return(
        <div className={classes.article} onClick={clickHandler}>
            <h1 className={classes.header}>{props.name}</h1>
        </div>
    );
}

export default IngredientItem;