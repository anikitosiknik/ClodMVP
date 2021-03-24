import React, { useRef } from "react";
import { emailValidation, passwordValidation } from "../../utils/validation";
import { useDispatch } from "react-redux";
import { fetchLogin } from "../../redux/reducers/user";

export default function Login({
  validate,
  forgotPass,
}: {
  validate: (
    value: string,
    classList: DOMTokenList | undefined,
    validateFunc?: (value: string) => boolean
  ) => void;
  forgotPass: () => void;
}) {
  const mailRef: React.RefObject<HTMLInputElement> = useRef(null);
  const passRef: React.RefObject<HTMLInputElement> = useRef(null);

  const inputRefs = [mailRef, passRef];

  const dispatch = useDispatch();

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
    dispatch(
      fetchLogin({
        mail: mailRef.current?.value || "",
        password: passRef.current?.value || "",
      })
    );
  };

  return (
    <div className="form">
      <h2>Войдите в аккаунт</h2>
      <input
        className="inp"
        autoComplete="email"
        type="email"
        ref={mailRef}
        placeholder="Адресс эл. почты"
        onChange={(event) =>
          validate(
            event.target.value,
            mailRef.current?.classList,
            emailValidation
          )
        }
      ></input>
      <input
        className="inp"
        type="password"
        ref={passRef}
        placeholder="Пароль"
        onChange={(event) =>
          validate(
            event.target.value,
            passRef.current?.classList,
            passwordValidation
          )
        }
      ></input>
      <button className="btn" onClick={() => register()}>
        Войти
      </button>

      <p
        onClick={() => {
          forgotPass();
        }}
      >
        забыли пароль?
      </p>
    </div>
  );
}
