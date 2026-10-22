import { useContext,useRef,useEffect,useState } from "react";

import {Link, useNavigate} from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faKitchenSet } from "@fortawesome/free-solid-svg-icons";
import classes from "./MainNavigation.module.css";
import Context from "../../store/context";
import Cookies from "js-cookie";

function MainNavigation(){
    const navigate = useNavigate();
    const searchbarInput = useRef();
    const selectInput = useRef();
    const [accessToAdminOptions,setAccessToAdminOptions] = useState(false);

    const searchCtx = useContext(Context);
    var currentText = "";
    const [logText,setLogText] = useState("Zaloguj");
    const [logLink,setLogLink] = useState("/login");

    useEffect(()=>{
        searchbarInput.current.value = searchCtx.ingredientsText
    },[searchCtx.ingredientsText])
    currentText = searchCtx.ingredientsText;

    useEffect(()=>{
        if(Cookies.get("userId")!==undefined){
            setLogText("Wyloguj");
            setLogLink("/logout");
        }else{
            setLogText("Zaloguj");
            setLogLink("/login");
        }
    },[Cookies.get("userId")])

    useEffect(()=>{
        if(Cookies.get("userRole")==="admin"){
            setAccessToAdminOptions(true);
        }else{
            setAccessToAdminOptions(false);
        }
    },[Cookies.get("userRole")])

    function searchHandler(){
        const enteredSearchbarInput = searchbarInput.current.value;
        var searchInputRegex = /^[a-zA-Z.,-_ ĄąĆćĘęŁłŚśŃśÓóŹźŻż]+$/
        if(searchInputRegex.test(enteredSearchbarInput)){
            if(enteredSearchbarInput!==""){
                searchCtx.addIngredientText(enteredSearchbarInput);
                searchCtx.addDiet(selectInput.current.value);
                searchCtx.setRefreshResultPageContext();
                navigate("/result",{replace:true});
            }
        }
    }

    function changeInput(){
        const enteredSearchbarInput = searchbarInput.current.value;
        searchCtx.addIngredientText(enteredSearchbarInput);
        currentText=enteredSearchbarInput;
    }

    function adminOptions(){
        navigate("/admin");
    }
    
    return(
        <header className={classes.header}>
            <div className={classes.logo}>
                <FontAwesomeIcon icon={faKitchenSet} size="3x"/>
            </div>
            <div>
                <input type="text" id="text" defaultValue={currentText} ref={searchbarInput} onChange={changeInput} className={classes.searchBox}/>
                <button onClick={searchHandler} className={classes.button}>Szukaj</button>
            </div>
            <div>
                <p className={classes.dietType}>Rodzaj diety:</p>
                <select ref={selectInput} className={classes.select}>
                    <option value="none">Brak</option>
                    <option value="vegan">Wegańska</option>
                    <option value="vegeterian">Wegetariańska</option>
                </select>

            </div>
            <nav>
                <ul>
                    <li><Link to="/">Strona główna</Link></li>
                    <li><Link to="/favorites">Ulubione</Link></li>
                    <li><Link to={logLink}>{logText}</Link></li>
                    <li><Link to="/suggestrecipe">Dodaj przepis</Link></li>
                    <li><Link to="/cal">Kalkulator kalorii</Link></li>
                </ul>
            </nav>
            {accessToAdminOptions?<button onClick={adminOptions} className={classes.button}>Administracja</button>:null}
        </header>
    );
}

export default MainNavigation;