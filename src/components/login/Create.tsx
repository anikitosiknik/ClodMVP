import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import {
  emailValidation,
  nicklValidation,
  passwordValidation,
} from "../../utils/validation";
import { fetchRegister } from "../../redux/reducers/user";
import PropTypes, { InferProps } from "prop-types";

function Create({validate}: InferProps<typeof Create.propTypes>) {
  const userNameRef: React.RefObject<HTMLInputElement> = useRef(null);
  const userMailRef: React.RefObject<HTMLInputElement> = useRef(null);
  const userPasswordRef: React.RefObject<HTMLInputElement> = useRef(null);
  const repeatPasswordRef: React.RefObject<HTMLInputElement> = useRef(null);

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

  const register = () => {
    
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
      dispatch(fetchRegister({
        name: userNameRef.current?.value || '',
        mail: userMailRef.current?.value || '',
        password: userPasswordRef.current?.value || '',
      }))
  };

  return (
    <div className="form">
      <h2>Созтайте аккаунт</h2>
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
        ref={userMailRef}
        placeholder="Укажите эл. адрес"
        onChange={(event) => {
          validate(event.target.value, userMailRef.current?.classList, emailValidation);
        }}
      ></input>
      <input
        className="inp"
        type="password"
        ref={userPasswordRef}
        placeholder="Укажите пароль"
        onChange={(event) => {
          resetSecondPassword();
          validate(event.target.value, userPasswordRef.current?.classList, passwordValidation);
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
      <button className="btn" onClick={() => register()}>
        Создать аккаунт
      </button>
    </div>
  );
}


Create.propTypes = {
  validate: PropTypes.func.isRequired
}

export default Create;
