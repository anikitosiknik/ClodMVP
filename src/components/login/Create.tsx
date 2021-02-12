import React from "react";

function Create() {
  return (
    <div className="form">
      <h2>Созтайте аккаунт</h2>
      <input className="inp" placeholder="Укажите имя пользователя"></input>
      <input className="inp" placeholder="Укажите эл. адрес"></input>
      <input className="inp" placeholder="Укажите пароль"></input>
      <input className="inp" placeholder="Повторите пароль"></input>
      <button className="btn">Создать аккаунт</button>
    </div>
  );
}

export default Create;
