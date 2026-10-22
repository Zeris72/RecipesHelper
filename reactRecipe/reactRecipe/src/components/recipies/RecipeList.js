import RecipeItem from "./RecipeItem";
import classes from "./RecipeList.module.css"

function RecipeList(props){
    if(props.recipies.length==0){
        return <h1 className={classes.header}>Brak wyników wyszukiwania</h1>
    }else{
        return <ul className={classes.table}>
            {props.recipies.map(recipie => <RecipeItem key={recipie._id} title={recipie.title} id={recipie._id}/>)}
        </ul>
    }
}

export default RecipeList;