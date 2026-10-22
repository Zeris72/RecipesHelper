import classes from "./LoginForm.module.css"
import { useRef,useState } from "react";
import { useNavigate } from "react-router-dom";

function LoginForm(props){
    
    const userNameInput = useRef();
    const userPasswordInput = useRef();
    const navigate = useNavigate();
    const [errorLoging,setErrorLoging] = useState();

    function submitHandler(event){
        setErrorLoging("");
        event.preventDefault(props);

        const enteredUserName = userNameInput.current.value;
        const enteredUserPassword = userPasswordInput.current.value;

        var loginRegex = /^(?=.*[A-Za-z0-9]$)[A-Za-z][A-Za-z\d.-]{0,10}$/;
        var passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,14}$/

        if(loginRegex.test(enteredUserName)&&passwordRegex.test(enteredUserPassword)){
            const userData={
                userName: enteredUserName,
                password: enteredUserPassword
            }
    
            props.onLogin(userData);
        }else{
            setErrorLoging("Błedny login lub hasło")
        }
    }

    return <form onSubmit={submitHandler}>
        <div>
            <label className={classes.lable}>Login:</label>
            <input type="text" required maxLength={10} id="userName" ref={userNameInput} className={classes.input}/>
        </div>
        <div>
            <label className={classes.lable}>Hasło:</label>
            <input type="text" required maxLength={14} minLength={8} id="userPassword" ref={userPasswordInput} className={classes.input}/>
        </div>
        <p className={classes.error}>{errorLoging}</p>
        <button className={classes.button}>Zaloguj</button>
        <div onClick={()=>navigate("/signin")} className={classes.linkBorder}>
            <p className={classes.link}>Nie masz konta? Zarejestruj się!</p>
        </div>
        
    </form>
}

export default LoginForm;