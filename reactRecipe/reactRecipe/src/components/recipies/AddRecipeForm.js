import classes from "./AddRecipeForm.module.css"
import Cookies from "js-cookie";
import { useRef } from "react";

function AddRecipeForm(props){

    const titleInput = useRef();
    const ingredientsInput = useRef();
    const contentInput = useRef();
    const urlInput = useRef();

    function addRecipeHandler(event){
        event.preventDefault();

        const recipieSuggegstion = {
            title: titleInput.current.value,
            content: contentInput.current.value,
            ingredients: ingredientsInput.current.value,
            url: urlInput.current.value,
            userId: Cookies.get("userId")
        }

        props.onAddRecipie(recipieSuggegstion)
    }

    function setRequiredUrl(){
        if(titleInput.current.value !==""){
            urlInput.current.required = false;
        }else{
            urlInput.current.required = true;
        }
    }

    function setRequiredRecipe(){
        if(urlInput.current.value !== ""){
            titleInput.current.required = false;
            contentInput.current.required = false;
            ingredientsInput.current.required = false;
        }else{
            titleInput.current.required = true;
            contentInput.current.required = true;
            ingredientsInput.current.required = true;
        }
       
        
    }



    return <form onSubmit={addRecipeHandler}>
        <div className={classes.div}>
            <pre className={classes.label}>Nazwa przepisu               </pre>
            <input type="text" ref={titleInput} id="title" onInput={setRequiredUrl} required className={classes.input}/>
        </div>
        <div className={classes.div}>
            <pre className={classes.label}>Składniki                    </pre>
            <textarea ref={ingredientsInput} id="ingredients" required className={classes.inputArea} rows={5} cols={30}/>
        </div>
        <div className={classes.div}>
            <pre className={classes.label}>Opis przygotowania           </pre>
            <textarea ref={contentInput} id="content" required className={classes.inputArea} rows={5} cols={30}/>
        </div>
        <h2>LUB</h2>
        <div className={classes.div}>
            <pre className={classes.label}>Link do strony z przepisem   </pre>
            <input type="url" ref={urlInput} required onInput={setRequiredRecipe} className={classes.input}/>
        </div>
        <button className={classes.button}>Dodaj</button>
    </form>
}

export default AddRecipeForm;