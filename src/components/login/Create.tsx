import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  emailValidation,
  nicklValidation,
  passwordValidation,
} from "../../utils/validation";
import { fetchCheckMailCode, fetchSetMailCode } from "../../redux/reducers/user";
import PropTypes, { InferProps } from "prop-types";
import { RootState } from "../../redux/types";
import Modal from "../Modal/Modal";

function Create({ validate }: InferProps<typeof Create.propTypes>) {
  const userNameRef: React.RefObject<HTMLInputElement> = useRef(null);
  const userMailRef: React.RefObject<HTMLInputElement> = useRef(null);
  const userPasswordRef: React.RefObject<HTMLInputElement> = useRef(null);
  const repeatPasswordRef: React.RefObject<HTMLInputElement> = useRef(null);

  const isMailCodeReady = useSelector(
    (state: RootState) => state.user.isMailCodeReady
  );
  const dispatch = useDispatch();

  const inputRefs = [
    userNameRef,
    userMailRef,
    userPasswordRef,
    repeatPasswordRef,
  ];

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
        name: userNameRef.current?.value || "",
        mail: userMailRef.current?.value || "",
        password: userPasswordRef.current?.value || "",
      })
    );
  };

  const register = (code: string) => {
    dispatch(
      fetchCheckMailCode({
        name: userNameRef.current?.value || "",
        mail: userMailRef.current?.value || "",
        password: userPasswordRef.current?.value || "",
        code: code
      })
    );
  }


  return (
    <div className="form">
      <h2>Создайте аккаунт</h2>
      <input
        className="inp"
        ref={userNameRef}
        type="text"
        placeholder="Укажите имя пользователя"
        onChange={(event) => {
          validate(
            event.target.value,
            userNameRef.current?.classList,
            nicklValidation
          );
        }}
      ></input>
      <input
        className="inp"
        type="email"
        autoComplete="email"
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
        placeholder="Укажите пароль"
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
        placeholder="Повторите пароль"
        autoComplete="current-password"
        onChange={(event) => {
          validate(
            event.target.value,
            repeatPasswordRef.current?.classList,
            secondPasswordValidation
          );
        }}
      ></input>
      {isMailCodeReady ? <MailCodeModal register={register}/> : null}

      <button className="btn" onClick={() => sendCode()}>
        Создать аккаунт
      </button>
    </div>
  );
}

Create.propTypes = {
  validate: PropTypes.func.isRequired,
};

export default Create;

function MailCodeModal({register} : {register: Function}) {
  const codeRef: React.RefObject<HTMLInputElement> = useRef(null);
  return (
    <Modal closeEvent={() => {}}>
      <div>
        <h2>Вам на почту отправленно письмо, пожалуйста введите код:</h2>
        <input className="inp" placeholder="код" ref={codeRef}></input>
        <button className="btn" onClick={() => register(codeRef.current?.value)}>Подтвердить</button>
      </div>
    </Modal>
  );
}
