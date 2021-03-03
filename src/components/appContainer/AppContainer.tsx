import React, { Suspense, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/types";
import Footer from "../footer/Footer";
import UserForm from "../userForm/UserForm";
import { Pages } from "../../redux/types";
import Roller from "../Roller/Roller";
const ClothPage = React.lazy(() => import("../ClothPage/ClothPage"));
const LookPage = React.lazy(() => import("../LookPage/LookPage"));
const AdminPage = React.lazy(() => import("../adminPage/AdminPage"));

function AppContainer() {
  const user = useSelector((store: RootState) => store.user);

  const [currentPage, changeCurrentPage] = useState<Pages>("clothPage");

  return (
    <>
      {user.needChanges || !user.isInfoSetted ? (
        <UserForm></UserForm>
      ) : (
        <>
          <Suspense fallback={<Roller />}>
            {currentPage === "clothPage" ? <ClothPage /> : null}
            {currentPage === "lookPage" ? <LookPage /> : null}
            {currentPage === "admin" ? <AdminPage /> : null}
          </Suspense>
          <Footer navigate={changeCurrentPage} currentPage={currentPage} />
        </>
      )}
    </>
  );
}

export default AppContainer;
