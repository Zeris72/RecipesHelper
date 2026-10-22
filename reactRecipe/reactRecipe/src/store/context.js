import { createContext, useState } from "react";

const Context = createContext({
    ingredients: [],
    addIngredient: (ingredient)=>{},
    ingredientsText:"",
    addIngredientText: (text)=>{},
    addDiet: (diet)=>{},
    userId:"",
    userName:""
});

export function ContextProvider(props){
    const [pageRefresher, setPageRefresher] = useState(true);
    const [pickedIngredientsText, setPickedIngredientsText] = useState("");
    const [dietType,setDietType] = useState("");
    const [userIdState,setUserIdState] = useState("");
    const [userNameState,setUserNameState] = useState("");

    function addIngredientHandler(ingredient){
        /*const ingredientName = {
            name:ingredient
        }*/

        /*if(!pickedIngredients.includes(ingredient)){
            setPickedIngredients((prevIngredients)=>{
                return prevIngredients.concat(ingredient);
            });
        }*/
        if(!pickedIngredientsText.includes(ingredient)){
            setPickedIngredientsText(pickedIngredientsText+ingredient+", ");
        }
    }

    function setRefresh(){
        setPageRefresher(!pageRefresher)
    }

    function addTextIngredientHandler(text){
        setPickedIngredientsText(text);
    }

    function addDiet(diet){
        setDietType(diet)
    }

    function logInUser(userId,userName){
        setUserIdState(userId);
        setUserNameState(userName);
    }

    function logOutUser(){
        setUserIdState("");
        setUserNameState("");
    }

    const context = {
        refreshResultPageContext: pageRefresher,
        setRefreshResultPageContext: setRefresh,
        addIngredient: addIngredientHandler,
        ingredientsText: pickedIngredientsText,
        addIngredientText: addTextIngredientHandler,
        dietType: dietType,
        addDiet: addDiet,
        logInUser: logInUser,
        logOutUser: logOutUser,
        getUserName: userNameState,
        getUserId: userIdState
    };

    return <Context.Provider value={context}>
        {props.children}
    </Context.Provider>
}

export default Context;