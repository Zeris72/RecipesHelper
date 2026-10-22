import classes from "./SignInForm.module.css"
import { useRef,useState } from "react";

function SignInForm(props){

    const nameInput = useRef();
    const userNameInput = useRef();
    const userPasswordInput = useRef();
    const userPasswordMatchInput = useRef();
    const emailInput = useRef();
    

    const [userNameError,setUserNameError] = useState();
    const [passwordError,setPasswordError] = useState();
    const [emailError, setEmailError] = useState();

    function submitHandler(event){
        event.preventDefault(props);
        setUserNameError("");
        setPasswordError("");
        setEmailError("");

        const nameEntered = nameInput.current.value;
        const userNameEntered = userNameInput.current.value;
        const userPasswordEntered = userPasswordInput.current.value;
        const userPasswordMacthEntered = userPasswordMatchInput.current.value;
        const emailEntered = emailInput.current.value;

        var loginRegex = /^(?=.*[A-Za-z0-9]$)[A-Za-z][A-Za-z\d.-]{0,10}$/;
        var passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,14}$/
        var emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/

        if(!loginRegex.test(userNameEntered)){
            setUserNameError("Nazwa użytkownika powinna zwierać tylko litery oraz cyfry");
        }else if(!passwordRegex.test(userPasswordEntered)){
            setPasswordError("Hasło powinno składać się z przynajmniej 8 znaków, maks 14, wielkich i małych liter oraz co najmniej jednego znaku specjalnego")
        }else if(!emailRegex.test(emailEntered)){
            setEmailError("Niepoprawny email")
        }else if(!userPasswordEntered===userPasswordMacthEntered){
            setPasswordError("Hasła się nie pokrywają")
        }else{
            const signInUserData={
                name: nameEntered,
                userName: userNameEntered,
                email : emailEntered,
                password: userPasswordEntered,
                userRole: "user"
            }

            props.onSignIn(signInUserData);
        }
    }

    return <form onSubmit={submitHandler}>
        <div className={classes.div}>
            <pre className={classes.label}>Podaj imie       </pre>
            <input type="text" required id="name"  ref={nameInput} className={classes.input}/>
        </div>
        <div className={classes.div}>
            <pre className={classes.label}>Podaj login      </pre>
            <input type="text" required maxLength={10} id="userName" ref={userNameInput} className={classes.input}/>
        </div>
        <div className={classes.div}>
            <pre className={classes.label}>Podaj email      </pre>
            <input type="text" required  id="email" ref={emailInput} className={classes.input}/>
        </div>
        <div className={classes.div}>
            <pre className={classes.label}>Podaj hasło      </pre>
            <input type="text" required maxLength={14} minLength={8} id="userPassword" ref={userPasswordInput} className={classes.input}/>
        </div>
        <div className={classes.div}>
            <pre className={classes.label}>Powtórz hasło    </pre>
            <input type="text" required maxLength={14} minLength={8} id="userPasswordMatch" ref={userPasswordMatchInput} className={classes.input}/>
        </div>
        <p className={classes.error}>{userNameError}</p>
        <p className={classes.error}>{passwordError}</p>
        <p className={classes.error}>{emailError}</p>
        <button className={classes.button}>Zarejestruj się</button>
    </form>
}

export default SignInForm;