import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/types";
import UserForm from "../userForm/UserForm";

function AppContainer () {
    const user = useSelector((store: RootState) => store.user)

    return (
        <React.Fragment>
            {
                user.needChanges || !user.isInfoSetted ? 
                <UserForm></UserForm>: 
                <div>main app</div>
            }
           
        </React.Fragment>
    )
} 

export default AppContainer