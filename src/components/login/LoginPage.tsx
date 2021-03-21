import React, { useRef, useState } from "react";
import logo from "../../imgs/logo.svg";
import ForgotPassword from "./ForgotPass";
import "./LoginPage.css";
import "./DesktopLoginPage.css";
import LazyContainer from "../LazyContainer/LazyContainer";

const Login = React.lazy(() => import("./Login"));
const Create = React.lazy(() => import("./Create"));

function LoginPage() {
  const [pageStatus, changeStatus] = useState("");

  const createRef = useRef(null);
  const loginRef = useRef(null);

  const clickBtn = (ref: React.RefObject<HTMLButtonElement>) => {
    ref.current?.classList.add("clicked");
  };

  const validate = (
    value: string,
    classList: DOMTokenList | undefined,
    validateFunc?: (value: string) => boolean
  ) => {
    if (!classList) return;
    if (validateFunc && validateFunc(value)) {
      classList.add("valid");
      classList.remove("invalid");
    } else {
      classList.remove("valid");
      classList.add("invalid");
    }

    if (!value) {
      classList.remove("valid");
      classList.remove("invalid");
    }
  };

  return (
    <div className="loginPage">
      <img src={logo}></img>
      {!pageStatus ? (
        <>
          <div className="form">
            <button
              className="btn"
              onClick={() => {
                clickBtn(createRef);
              }}
              ref={createRef}
              onAnimationEnd={() => {
                changeStatus("create");
              }}
            >
              Создать аккаунт
            </button>
            <p>или</p>
            <button
              className="btn"
              onClick={() => {
                clickBtn(loginRef);
              }}
              ref={loginRef}
              onAnimationEnd={() => {
                changeStatus("login");
              }}
            >
              Войти
            </button>
            <p
              onClick={() => {
                changeStatus("forgot");
              }}
            >
              забыли пароль?
            </p>
          </div>
          <a href="/info.html">О нас</a>
        </>
      ) : pageStatus === "create" ? (
        <LazyContainer>
          <Create validate={validate}></Create>
        </LazyContainer>
      ) : pageStatus !== "forgot" ? (
        <LazyContainer>
          <Login validate={validate}></Login>
        </LazyContainer>
      ) : (
        <LazyContainer>
          <ForgotPassword validate={validate} />
        </LazyContainer>
      )}
    </div>
  );
}

export default LoginPage;
