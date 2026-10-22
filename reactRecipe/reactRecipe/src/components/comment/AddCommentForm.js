import classes from "./AddCommentForm.module.css"
import { useRef,useContext,useState } from "react";
import Context from "../../store/context";
import Cookies from "js-cookie";

function AddCommentForm(props){
    const commentContentInput = useRef();
    const userCtx = useContext(Context);
    const [commentSize,setCommentSize] = useState();

    function addCommentHandler(event){
        event.preventDefault(props);

        const enteredContent = commentContentInput.current.value;

        const commentRegex = /^[a-zA-Z0-9.,:_ ĄąĆćĘęŁłŚśŃśÓóŹźŻż"]+$/;

        if(commentRegex.test(enteredContent)){
            const comment = {
                /*userId: window.sessionStorage.getItem("userId"),
                authorUserName: window.sessionStorage.getItem("userName"),*/
                /*userId: userCtx.getUserId,
                authorUserName: userCtx.getUserName,*/
                userId: Cookies.get("userId"),
                authorUserName: Cookies.get("userName"),
                content: enteredContent
            }
    
            props.onAddComment(comment);
        }
    }

    function charactersLeft(){
        var limit = 600 - commentContentInput.current.value.length
        setCommentSize("Pozostało: "+limit+" znaków.")
    }

    return <form onSubmit={addCommentHandler}>
        <textarea required rows={8} cols={50} autoFocus ref={commentContentInput} onChange={charactersLeft} maxLength={600} className={classes.inputArea}/>
        <p>{commentSize}</p>
        <button className={classes.button}>Dodaj</button>
    </form>
}

export default AddCommentForm;