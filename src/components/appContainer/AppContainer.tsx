import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/types";
import ClothPage from "../ClothPage/ClothPage";
import Footer from "../footer/Footer";
import UserForm from "../userForm/UserForm";

import { Pages } from "../../redux/types";
import LookPage from "../LookPage/LookPage";

function AppContainer() {
  const user = useSelector((store: RootState) => store.user);

  const [currentPage, changeCurrentPage] = useState<Pages>("clothPage");

  return (
    <>
      {user.needChanges || !user.isInfoSetted ? (
        <UserForm></UserForm>
      ) : (
        <>
          {currentPage === "clothPage" ? <ClothPage /> : null}
          {currentPage === "lookPage" ? <LookPage /> : null}
          <Footer navigate={changeCurrentPage} currentPage={currentPage} />
        </>
      )}
    </>
  );
}

export default AppContainer;
