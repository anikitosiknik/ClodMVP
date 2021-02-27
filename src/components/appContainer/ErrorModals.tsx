import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../redux/reducers/user";
import { RootState } from "../../redux/types";
import Modal from "../Modal/Modal";

function ErrorModals() {
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  if (!user.error) return <></>;
  else
    return (
      <Modal closeEvent={() => dispatch(setUser({ ...user, error: "" }))}>
        {user.error === "wrongCode" ? (
          <WrongCodeModal />
        ) : user.error === "password or mail not found" ? (
          <WrongLogin />
        ) : user.error === "Duplicate Mail" ? <DuplicateMail/> : null}
      </Modal>
    );
}

export default ErrorModals;

function WrongCodeModal() {
  return (
    <div>
      <h2>Вы ввели неправильный код</h2>
    </div>
  );
}

function WrongLogin() {
    return (
      <div>
        <h2>Неправильный логин или пароль</h2>
      </div>
    );
  }

  function DuplicateMail() {
    return (
      <div>
        <h2>Данная почта уже занята</h2>
      </div>
    );
  }
