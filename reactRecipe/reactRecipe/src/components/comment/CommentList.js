import { useState } from "react"

function CommentList(props){
    var [test,setTest] = useState(0);
    
    function removeComment(i){
        console.log(i)
    }
    
    return <ul>
            {props.comments.map(comment => (<div><p>{comment.content}</p><p>Autor: {comment.authorUserName}</p>
            <button onClick={()=>(removeComment(test),setTest(test+1))} >Usuń</button></div>))}
        </ul>
}

export default CommentList