import classes from "./UserList.module.css"
import {useState } from "react";

function UserList(props){
    const [openModal,setOpenModal] = useState(false)
    const [userId,setUserId] = useState();

    function showConfirmation(userId){
        if(!openModal){
            setOpenModal(true)
            setUserId(userId)
        }
    }

    function deleteUser(){
        props.setUserRemoved(!props.userRemoved)
        fetch(
            "/api/admin/removeUser/"+userId,
            {
                method:"DELETE",
                headers:{
                    "content-type": "application/json"
                }
            }
        )
        props.setUserListSeed(Math.random())
    }

    return <ul>
            {props.users.map(user => (<div className={classes.div}><label className={classes.label}>{user.userName}</label><button onClick={()=>showConfirmation(user.id)} className={classes.button}>Usuń</button><br></br></div>))}
            {openModal?<div><p>Czy na pewno chcesz usunąć tego użytkownika?</p>
            <button onClick={()=>(deleteUser(),setOpenModal(false))} className={classes.button}>Tak</button><button onClick={()=>(setOpenModal(false))} className={classes.button}>Nie</button></div>:null}
        </ul>
}

export default UserList;