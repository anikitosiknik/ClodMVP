import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/types";
import Header from "../header/Header";
import UserForm from "../userForm/UserForm";

function AppContainer() {
  const user = useSelector((store: RootState) => store.user);

  return (
    <React.Fragment>
      {user.needChanges || !user.isInfoSetted ? (
        <UserForm></UserForm>
      ) : (
        <React.Fragment>
            <Header 
            // logoOnly
            />
          <div>main app</div>
        </React.Fragment>
      )}
    </React.Fragment>
  );
}

export default AppContainer;
