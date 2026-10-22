import classes from "../components/user/LoginForm.module.css"
import { useState,useContext } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import LoginForm from "../components/user/LoginForm";
import Context from "../store/context";

function LoginPage(){

    const [loginError,setLoginError] = useState("");
    const navigate = useNavigate();
    const userCtx = useContext(Context);

    function onLoginHandler(loginData){
        fetch(
            "/api/user/signIn",
            {
                method:"POST",
                body:JSON.stringify(loginData),
                headers:{
                    "content-type": "application/json"
                } 
            }
        ).then(response=>{
            return response.json();
        }).then(data=>{
            if(data!=0){
                var inOneHour = new Date(new Date().getTime()+60*60*1000);
                Cookies.set("userId",data.userId, {expires:inOneHour});
                Cookies.set("userName",data.userName, {expires:inOneHour});
                Cookies.set("userRole",data.userRole, {expires:inOneHour});
                navigate(-1)
            }else{
                setLoginError("Login lub hasło niepoprawny");
            }
        }
        )
    }

    return <section className={classes.section}>
        <h1 className={classes.header}>Podaj dane logowania</h1>
        <LoginForm onLogin={onLoginHandler}/>
        <p>{loginError}</p>
    </section>
}

export default LoginPage;