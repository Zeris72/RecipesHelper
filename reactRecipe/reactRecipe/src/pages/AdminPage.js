import classes from "../components/user/UserList.module.css"
import { useState,useEffect } from "react";
import UserList from "../components/user/UserList"
import SuggestedRecipesList from "../components/recipies/SuggestedRecipesList";

function AdminPage(){
    const [isLoading,setIsLoading] = useState(true);
    const [loadedUsers,setLoadedUsers] = useState([]);
    const [userRemoved,setUserRemoved] = useState(false);
    const [loadedRecipes,setLoadedRecipes] = useState([]);
    const [userListSeed,setUserListSeed] = useState(1);

    useEffect(()=>{
        setIsLoading(true);
        fetch(
            "/api/admin/users"
        ).then(
            response=>{
                return response.json();
            }
        ).then(
            data=>{
                const users=[];
                for(const key in data){
                    const user={
                        id:key,
                        ...data[key]
                    };
                    users.push(user)
                }
                setIsLoading(false);
                setLoadedUsers(users);
            }
        )
        if(loadedRecipes.length===0){
            setIsLoading(true);
            fetch(
                "/api/admin/suggested"
            ).then(
                response=>{
                    return response.json();
                }
            ).then(
                data=>{
                    const recipes=[];
                    for(const key in data){
                        const recipe={
                            id:key,
                            ...data[key]
                        };
                        recipes.push(recipe)
                    }
                    setIsLoading(false);
                    setLoadedRecipes(recipes);
                }
            )
        }
    },[userRemoved])

    if(isLoading){
        return <p>Loading...</p>
    }
    

    //<SuggestedRecipesList recipes={loadedRecipes}/>
    return (
        <div className={classes.section}>
            <div>
                <h3>Nowe przepisy</h3>
                <SuggestedRecipesList recipes={loadedRecipes}/>
            </div>
            <div>
                <h3>Użytkownicy</h3>
                <UserList key={userListSeed} users={loadedUsers} setUserRemoved={setUserRemoved} userRemoved={userRemoved} setUserListSeed={setUserListSeed}/>
            </div>
        </div>
    )
}

export default AdminPage