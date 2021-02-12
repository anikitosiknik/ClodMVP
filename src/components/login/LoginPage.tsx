import React, { useRef, useState } from "react";
import logo from "../../imgs/logo.svg";
import Create from "./Create";
import Login from "./Login";
import "./LoginPage.css";
import "./Button.css";
import "./Input.css";

function LoginPage() {
  const [pageStatus, changeStatus] = useState("");

  const createRef = useRef(null);
  const loginRef =useRef(null);

  const clickBtn = (ref: React.RefObject<HTMLButtonElement>) => {
    ref.current?.classList.add("clicked");
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
            Созтать аккаунт
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
        <Create></Create>
      ) : (
        <Login></Login>
      )}
    </div>
  );
}

export default LoginPage;
