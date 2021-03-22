import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  emailValidation,
  nicklValidation,
  passwordValidation,
} from "../../utils/validation";
import {
  fetchCheckMailCode,
  fetchSetMailCode,
} from "../../redux/reducers/user";
import { RootState } from "../../redux/types";
import Modal from "../Modal/Modal";
import { InputErrorWrapper } from "../InputErrorWrapper/InputErrorWrapper";

export default function Create({
  validate,
}: {
  validate: (
    value: string,
    classList: DOMTokenList | undefined,
    validateFunc?: (value: string) => boolean
  ) => void;
}) {
  const userNameRef: React.RefObject<HTMLInputElement> = useRef(null);
  const userMailRef: React.RefObject<HTMLInputElement> = useRef(null);
  const userPasswordRef: React.RefObject<HTMLInputElement> = useRef(null);
  const repeatPasswordRef: React.RefObject<HTMLInputElement> = useRef(null);

  const [isSubmitted, changeSubmitted] = useState(false);

  const [isNameValid, changeNameValid] = useState(true);
  const [isMailValid, changeMailValid] = useState(true);
  const [isPassValid, changePassVaild] = useState(true);
  const [isSecondPassValid, changeSecondPassValid] = useState(true);

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
        if (!isInputValid(inputRef)) {
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
        code: code,
      })
    );
  };

  const isClassContains = (
    ref: React.RefObject<HTMLInputElement>,
    className: string
  ) => {
    return ref.current?.classList.contains(className) || false;
  };

  const isInputValid = (ref: React.RefObject<HTMLInputElement>) => {
    return isClassContains(ref, "valid");
  };
  const isInputInvalid = (ref: React.RefObject<HTMLInputElement>) => {
    return isClassContains(ref, "invalid");
  };

  return (
    <div className="form">
      <h2>Создайте аккаунт</h2>
      <InputErrorWrapper
        isErrorShowed={!isNameValid && isSubmitted}
        errorMessage={"В имени могут быть только буквы и цфры"}
      >
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
            changeNameValid(!isInputInvalid(userNameRef));
          }}
        />
      </InputErrorWrapper>
      <InputErrorWrapper
        isErrorShowed={!isMailValid && isSubmitted}
        errorMessage={"Почта не соответствует формату"}
      >
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
            changeMailValid(!isInputInvalid(userMailRef));
          }}
        />
      </InputErrorWrapper>
      <InputErrorWrapper
        isErrorShowed={!isPassValid && isSubmitted}
        errorMessage={"Пароль должен содержать цифры и буквы"}
      >
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
            changePassVaild(!isInputInvalid(userPasswordRef));
          }}
        />
      </InputErrorWrapper>
      <InputErrorWrapper
        isErrorShowed={!isSecondPassValid && isSubmitted}
        errorMessage={"Пароли не совпадают"}
      >
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
            changeSecondPassValid(!isInputInvalid(repeatPasswordRef));
          }}
        />
      </InputErrorWrapper>

      {isMailCodeReady ? <MailCodeModal register={register} /> : null}

      <button
        className="btn"
        onClick={() => {
          changeSubmitted(true);
          sendCode();
        }}
      >
        Создать аккаунт
      </button>
    </div>
  );
}

function MailCodeModal({ register }: { register: Function }) {
  const codeRef: React.RefObject<HTMLInputElement> = useRef(null);
  return (
    <Modal closeEvent={() => {}}>
      <div>
        <h2>Вам на почту отправленно письмо, пожалуйста введите код:</h2>
        <input className="inp" placeholder="код" ref={codeRef}></input>
        <button
          className="btn"
          onClick={() => register(codeRef.current?.value)}
        >
          Подтвердить
        </button>
      </div>
    </Modal>
  );
}
