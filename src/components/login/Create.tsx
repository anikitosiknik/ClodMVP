import React, { useRef } from "react";
import {
  emailValidation,
  nicklValidation,
  passwordValidation,
} from "../../utils/validation";

function Create() {
  const userNameRef: React.RefObject<HTMLInputElement> = useRef(null);
  const userMailRef: React.RefObject<HTMLInputElement> = useRef(null);
  const userPasswordRef: React.RefObject<HTMLInputElement> = useRef(null);
  const repeatPasswordRef: React.RefObject<HTMLInputElement> = useRef(null);

  const inputRefs = [userNameRef, userMailRef, userPasswordRef, repeatPasswordRef];

  const validate = (
    event: React.ChangeEvent<HTMLInputElement>,
    ref: React.RefObject<HTMLInputElement>,
    validateFunc?: Function
  ) => {
    if (validateFunc && validateFunc(event.target.value)) {
      ref.current?.classList.add("valid");
      ref.current?.classList.remove("invalid");
    } else {
      ref.current?.classList.remove("valid");
      ref.current?.classList.add("invalid");
    }

    if (!event.target.value) {
      ref.current?.classList.remove("valid");
      ref.current?.classList.remove("invalid");
    }
  };

  const secondPasswordValidation = (secondPassword: string | null | undefined) => {
      return userPasswordRef.current?.value === secondPassword;
  };

  const resetSecondPassword = () => {
    repeatPasswordRef.current?.classList.remove("valid");
    repeatPasswordRef.current?.classList.remove("invalid");
  }

  const register = () => {
    if(inputRefs.filter(inputRef=>{
      if (!inputRef.current?.classList.contains("valid")) 
      {
        inputRef.current?.classList.toggle("shake")
        return false; 
      }
      return true;
    }).length !== 4) return;
    
    console.log('send')
   
  }



  return (
    <div className="form">
      <h2>Созтайте аккаунт</h2>
      <input
        className="inp"
        ref={userNameRef}
        type="text"
        placeholder="Укажите имя пользователя"
        onChange={(event) => {
          validate(event, userNameRef, nicklValidation);
        }}
      ></input>
      <input
        className="inp"
        type="email"
        ref={userMailRef}
        placeholder="Укажите эл. адрес"
        onChange={(event) => {
          validate(event, userMailRef, emailValidation);
        }}
      ></input>
      <input
        className="inp"
        type="password"
        ref={userPasswordRef}
        placeholder="Укажите пароль"
        onChange={(event) => {
          resetSecondPassword();
          validate(event, userPasswordRef, passwordValidation);
        }}
      ></input>
      <input
        className="inp"
        type="password"
        ref={repeatPasswordRef}
        placeholder="Повторите пароль"
        onChange={(event) => {
          validate(
            event,
            repeatPasswordRef,
            secondPasswordValidation
          );
        }}
      ></input>
      <button className="btn" onClick={() => register()}>Создать аккаунт</button>
    </div>
  );
}

export default Create;
