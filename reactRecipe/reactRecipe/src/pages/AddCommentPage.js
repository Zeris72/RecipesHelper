import clasess from "../components/comment/AddCommentForm.module.css"
import AddCommentForm from "../components/comment/AddCommentForm";
import { useLocation,useNavigate } from "react-router-dom";

function AddCommentPage(){
    const location = useLocation();
    const navigate = useNavigate();

    function onAddComment(comment){
        fetch(
            "/api/recipe/"+location.state.id+"/addComment",
            {
                method:"POST",
                body: JSON.stringify(comment),
                headers:{
                    "content-type": "application/json"
                }
            }
        )
        //navigate(-1)
        navigate("/recipe",{state:{id:location.state.id}})
    }

    return <div className={clasess.section}>
        <h1>Dodaj komentarz</h1>
        <AddCommentForm onAddComment={onAddComment}/>
    </div>
}

export default AddCommentPage;