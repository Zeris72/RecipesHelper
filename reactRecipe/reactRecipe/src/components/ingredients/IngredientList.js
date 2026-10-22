import IngredientItem from "./IngredientItem";
import classes from "./IngredientList.module.css"

function IngredientList(props){
    return <ul className={classes.table}>
        {props.ingredients.map(ingredient => <IngredientItem key={ingredient.id} name={ingredient.name} image={ingredient.image}/>)}
    </ul>
}

export default IngredientList;