import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/types";
import Footer from "../footer/Footer";
import LazyContainer from "../LazyContainer/LazyContainer";
const UserForm = React.lazy(() => import("../userForm/UserForm"));
const ClothPage = React.lazy(() => import("../ClothPage/ClothPage"));
const LookPage = React.lazy(() => import("../LookPage/LookPage"));
const AdminPage = React.lazy(() => import("../adminPage/AdminPage"));

function AppContainer() {
  const user = useSelector((store: RootState) => store.user);

  const [currentPage, changeCurrentPage] = useState<Pages>(Pages.ClothPage);

  return (
    <>
      {user.needChanges || !user.isInfoSetted ? (
        <LazyContainer>
          <UserForm />
        </LazyContainer>
      ) : (
        <>
          <LazyContainer>
            <>
              {currentPage === Pages.ClothPage ? <ClothPage /> : null}
              {currentPage === Pages.LookPage ? <LookPage /> : null}
              {currentPage === Pages.AdminPage ? <AdminPage /> : null}
            </>
          </LazyContainer>
          <Footer navigate={changeCurrentPage} currentPage={Pages[currentPage]} />
        </>
      )}
    </>
  );
}

export default AppContainer;

export enum Pages {
  AdminPage,
  ClothPage,
  LookPage,
}