import React from "react";

function Login() {
  return (
    <div className="form">
      <h2>Войдите в аккаунт</h2>
      <input className="inp" placeholder="Адресс эл. почты"></input>
      <input className="inp" placeholder="Пароль"></input>
      <button className="btn">Войти</button>
    </div>
  );
}

export default Login;
