import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { emailValidation, passwordValidation } from "../../utils/validation";
import {
    fetchChangePassword,
  fetchSetMailCode,
} from "../../redux/reducers/user";
import PropTypes, { InferProps } from "prop-types";
import { RootState } from "../../redux/types";
import Modal from "../Modal/Modal";

function ForgotPassword({
  validate,
}: InferProps<typeof ForgotPassword.propTypes>) {
  const userMailRef: React.RefObject<HTMLInputElement> = useRef(null);
  const userPasswordRef: React.RefObject<HTMLInputElement> = useRef(null);
  const repeatPasswordRef: React.RefObject<HTMLInputElement> = useRef(null);
  const codeRef: React.RefObject<HTMLInputElement> = useRef(null);

  const isMailCodeReady = useSelector(
    (state: RootState) => state.user.isMailCodeReady
  );
  const dispatch = useDispatch();

  const inputRefs = [userMailRef, userPasswordRef, repeatPasswordRef];

  const secondPasswordValidation = (
    secondPassword: string | null | undefined
  ) => {
    return userPasswordRef.current?.value === secondPassword;
  };

  const resetSecondPassword = () => {
    repeatPasswordRef.current?.classList.remove("valid");
    repeatPasswordRef.current?.classList.remove("invalid");
  };

  const sendCode = () => {
    if (
        inputRefs.filter((inputRef) => {
          if (!inputRef.current?.classList.contains("valid")) {
            inputRef.current?.classList.toggle("shake");
            return false;
          }
          return true;
        }).length !== inputRefs.length
      )
        return;
    dispatch(
      fetchSetMailCode({
        name: "",
        mail: userMailRef.current?.value || "",
        password: "",
      })
    );
  };

  const register = (code: string) => {

    dispatch(
      fetchChangePassword({
        mail: userMailRef.current?.value || "",
        password: userPasswordRef.current?.value || "",
        code: code,
      })
    );
  };

  return (
    <div className="form">
      <h2>Укажите вашу почту</h2>

      <input
        className="inp"
        type="email"
        ref={userMailRef}
        placeholder="Укажите эл. адрес"
        onChange={(event) => {
          validate(
            event.target.value,
            userMailRef.current?.classList,
            emailValidation
          );
        }}
      ></input>
        <input
              className="inp"
              type="password"
              ref={userPasswordRef}
              placeholder="Новый пароль"
              onChange={(event) => {
                resetSecondPassword();
                validate(
                  event.target.value,
                  userPasswordRef.current?.classList,
                  passwordValidation
                );
              }}
            ></input>
            <input
              className="inp"
              type="password"
              ref={repeatPasswordRef}
              placeholder="Повторите новый пароль"
              autoComplete="current-password"
              onChange={(event) => {
                validate(
                  event.target.value,
                  repeatPasswordRef.current?.classList,
                  secondPasswordValidation
                );
              }}
            ></input>

      {isMailCodeReady ? (
        <Modal closeEvent={() => {}}>
          <div>
            <h2>Вам на почту отправленно письмо, пожалуйста введите код:</h2>
            <input className="inp" placeholder="код" ref={codeRef}></input>

          
            <button
              className="btn"
              onClick={() => register(codeRef.current?.value || "")}
            >
              Подтвердить
            </button>
          </div>
        </Modal>
      ) : null}

      <button className="btn" onClick={() => sendCode()}>
        Отправить код
      </button>
    </div>
  );
}

ForgotPassword.propTypes = {
  validate: PropTypes.func.isRequired,
};

export default ForgotPassword;
