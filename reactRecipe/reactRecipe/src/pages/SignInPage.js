import classes from "../components/user/SignInForm.module.css"
import {useState} from "react";
import { useNavigate } from "react-router-dom";
import SignInForm from "../components/user/SignInForm";

function SignInPage(){

    const [signInError,setSignInError] = useState();
    const navigate = useNavigate();

    function onSignInHanlder(signInData){
        fetch(
            "/api/user/register",
            {
                method:"POST",
                body: JSON.stringify(signInData),
                headers:{
                    "content-type": "application/json"
                }
            }
        ).then(response=>{
            return response.json();
        }).then(data=>{
            if(data===1){
                navigate(-1)
            }else{
                setSignInError("Podaj inny login");
            }
        }
        )
    }

    return <section className={classes.section}>
        <h1 className={classes.header}>Podaj dane</h1>
        <SignInForm onSignIn={onSignInHanlder}/>
        <p>{signInError}</p>
    </section>
}

export default SignInPage;