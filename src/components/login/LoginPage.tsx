import React, { useRef, useState } from "react";
import logo from "../../imgs/logo.svg";
import Create from "./Create";
import Login from "./Login";
import "./LoginPage.css";

function LoginPage() {
  const [pageStatus, changeStatus] = useState("");

  const createRef = useRef(null);
  const loginRef =useRef(null);

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
        <div className="form">
          <button className="btn"
            onClick={() => {
              clickBtn(createRef);
            }}
            ref={createRef}
            onAnimationEnd={()=>{changeStatus("create")}}
          >
            Создать аккаунт
          </button>
          <p>или</p>
          <button className="btn"
            onClick={() => {
              clickBtn(loginRef);
            }}
            ref={loginRef}
            onAnimationEnd={()=>{changeStatus("login")}}
          >
            Войти
          </button>
        </div>
      ) : pageStatus === "create" ? (
        <Create validate={validate}></Create>
      ) : (
        <Login validate={validate}></Login>
      )}
    </div>
  );
}


export default LoginPage;
