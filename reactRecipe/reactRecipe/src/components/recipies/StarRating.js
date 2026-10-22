import { useState,useContext } from "react";
import classes from "./StarRating.module.css"
import Context from "../../store/context";
import Cookies from "js-cookie";

function StarRating(props){
    const [rating,setRating] = useState(props.userRating);
    const userCtx = useContext(Context);

    function onRatingHandler(index){
        setRating(index)
        const mark = {
            //userId: userCtx.getUserId,
            userId: Cookies.get("userId"),
            rating: index
        }
        props.onAddRating(mark);
    }

    
    return <div className="starRating">
        {[...Array(5)].map((star,index)=>{
            index+=1;
            return <button
            type="button"
            key={index}
            className={index <= rating ? classes.on : classes.off}
            onClick={()=>onRatingHandler(index)}>
                <span>&#9733;</span>
            </button>
        })}
    </div>
}

export default StarRating;