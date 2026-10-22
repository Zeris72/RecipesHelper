import { useContext,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Context from "../store/context";
import Cookies from "js-cookie";

function LogoutPage(){
    const userCtx = useContext(Context);
    const navigate = useNavigate();

    useEffect(()=>{
        Cookies.remove("userId");
        Cookies.remove("userName");
        Cookies.remove("userRole");
        navigate(-1);
    },[])
    
}

export default LogoutPage;