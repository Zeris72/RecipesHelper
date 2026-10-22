import classes from "./ShowRecipeItem.module.css"
import { useNavigate } from "react-router-dom";
import StarRating from "./StarRating";
import Cookies from "js-cookie";
import { useState,useEffect,useRef } from "react";

function ShowRecipeItem(props){
    const navigate = useNavigate();
    const recipeData = props.recipieData;
    const [averageRating,setAverageRating] = useState();
    const [quantityOfRatings,setQuantityOfRatings] = useState();
    const [userRating,setUserRating] = useState();
    const [loading,setLoading] = useState(true);
    const [showAddButton,setShowAddButton] = useState(true);
    const [showRemoveButton,setShowRemoveButton] = useState(false);
    const buttonAddFavorite = useRef();
    const buttonRemoveFavorite = useRef();
    const selectInput = useRef();
    
    var userId = null;

    if(Cookies.get("userId")!==undefined){
        userId = Cookies.get("userId")
    }else{
        userId = null
    }

    useEffect(()=>{
        setLoading(true);
        fetch(
            "api/recipe/"+recipeData.id+"/getRating",
            {
                method:"POST",
                body: JSON.stringify(userId),
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
                setAverageRating(data[0]);
                setQuantityOfRatings(data[1]);
                setUserRating(data[2]);
                setLoading(false)
            } 
        )
    },[]);

    useEffect(()=>{
        const favoriteData = {"userId":userId,"recipeId":recipeData.id}
        fetch(
            "api/favorites/isFavorite",
            {
                method:"POST",
                body: JSON.stringify(favoriteData),
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
                if(data){
                    setShowAddButton(false);
                    setShowRemoveButton(true);
                }else{
                    setShowAddButton(true);
                    setShowRemoveButton(false);
                }
            }
        )
    })

    function addToFavorites(){
        if(userId!=="0"){
            fetch(
                "/api/favorites/add/"+userId,
                {
                    method:"POST",
                    body: recipeData.id,
                    headers:{
                        "content-type": "application/json"
                    }
                }
            )
            buttonAddFavorite.current.hidden = true;
            buttonRemoveFavorite.current.hidden = false;
        }else{
            navigate("/login");
        }   
    }

    function removeFromFavorites(){
        const favoriteData = {"userId":userId,"recipeId":recipeData.id}
        fetch(
            "/api/favorites/remove",
            {
                method:"DELETE",
                body: JSON.stringify(favoriteData),
                headers:{
                    "content-type": "application/json"
                }
            }
        )
        buttonAddFavorite.current.hidden = false;
        buttonRemoveFavorite.current.hidden = true;
    }

    function onAddRating(rating){
        var mode = 0;
        if(Cookies.get("userId")===undefined){
            navigate("/login",{replace:true})
        }
        if(userRating===0){
            mode = 0;
            setUserRating(rating)
        }else{
            mode = 1;
        }
        fetch(
            "api/recipe/"+recipeData.id+"/addRating/"+mode,
            {
                method:"POST",
                body: JSON.stringify(rating),
                headers:{
                    "content-type": "application/json"
                }
            }
        ).then(
            response=>{return response.json();}
        ).then(  
            data=>{
                setAverageRating(data.average);
                setQuantityOfRatings(data.quantityOfRatings);
            }
        )
    }
    
    function addComment(){
        if(Cookies.get("userId")===undefined){
            navigate("/login");
        }else{
            navigate("/addcomment",{state:{id:props.recipieData.id}})
        }
    }

    function removeComment(event){
        fetch(
            "/api/admin/removeComment/"+recipeData.id,
            {
                method:"DELETE",
                body:JSON.stringify(event.target.id),
                headers:{
                    "content-type": "application/json"
                }
            }
        )
        props.setReset(!props.reset)
    }

    function showIngredients(){
        //const portions = selectInput.current.value
        return  recipeData.ingredients.map(({id,name,amount})=>{
            return <p>{name}: {amount} g</p>
        })
    }
    
    const showComments = ()=>{
        if(Cookies.get("userRole")==="admin"){
            var i=-1;
            return recipeData.comments.map(({userId,content,authorUserName})=>{
                i++
                return <div>
                    <p>{content}</p>
                    <p>Autor: {authorUserName}</p>
                    <button onClick={removeComment} id={i} className={classes.button}>Usuń</button>
                </div>
            })
        }else{
            return recipeData.comments.map(({userId,content,authorUserName})=>{
                return <div>
                    <p>{content}</p>
                    <p>Autor: {authorUserName}</p>
                </div>
            })
        }
    }
    /*
    <div className={classes.ingredients}>
            <label>Skladniki:</label>
            {showIngredients()}
        </div>
        */

        /*<div>
            <p>Wybierz ilość porcji: </p>
            <select ref={selectInput}>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                    </select>
        </div>*/

    if(loading){

    }else{
        return (<div className={classes.section}>
        <h2>{recipeData.title}</h2>
        {showAddButton ? <button onClick={addToFavorites} ref={buttonAddFavorite} className={classes.button}>Dodaj do ulubionych</button>:<button onClick={addToFavorites} ref={buttonAddFavorite} hidden className={classes.button}>Dodaj do ulubionych</button>}
        {showRemoveButton ? <button onClick={removeFromFavorites} ref={buttonRemoveFavorite} className={classes.button}>Usuń z ulubionych</button>:<button onClick={removeFromFavorites} ref={buttonRemoveFavorite} hidden className={classes.button}>Usuń z ulubionych</button>}
        
        <div className={classes.ingredients}>
            <label>Składniki:</label>
            {showIngredients()}
        </div>
        <p className={classes.content}>{recipeData.content}</p>
        <div className={classes.comments}>
            <label className={classes.label}>Komentarze</label>
            {showComments()}
            <button onClick={addComment} className={classes.button}>Dodaj nowy komentarz</button>
        </div>
        <StarRating onAddRating={onAddRating} userRating={userRating}/>
        <p>Średnia ocen: {averageRating}</p>
        <p>Liczba ocen: {quantityOfRatings}</p>
        </div>)
    }
    
}

export default ShowRecipeItem;