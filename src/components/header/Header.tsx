import React, { useState } from "react";
import logo from "../../imgs/logo.svg";
import userIcon from "../../imgs/user.svg";
import "./Header.css";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/types";
import { getStringFromImg } from "../../utils/fileService";
import {
  fetchLogOut,
  fetchSetUserPicture,
  setUser,
} from "../../redux/reducers/user";

export default function Header({
  logoOnly,
  additionalElement,
}: {
  logoOnly?: boolean;
  additionalElement: JSX.Element | null;
}) {
  return (
    <div className="header">
      {additionalElement || <div className="header__icon" />}
      <img className="header__logo" src={logo}></img>
      {logoOnly ? <div className="header__icon" /> : <UserIcon />}
    </div>
  );
}

function UserIcon() {
  const [isProfileShown, toggleProfileShown] = useState(false);
  const userPicture = useSelector((state: RootState) => state.user.userPicture);
  return (
    <React.Fragment>
      <ProfileMenu
        isPopupShown={isProfileShown}
        togglePopupShown={toggleProfileShown}
      />
      <div
        className="user-icon"
        style={{ backgroundImage: `url("${userPicture || userIcon}")` }}
        onClick={() => toggleProfileShown(!isProfileShown)}
      ></div>
    </React.Fragment>
  );
}

function ProfileMenu({
  isPopupShown,
  togglePopupShown,
}: {
  isPopupShown: boolean;
  togglePopupShown: (status: boolean) => void;
}) {
  const user = useSelector((state: RootState) => state.user);
  const disptach = useDispatch();
  const togglePopup = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    isPopupShown && event.target === event.currentTarget
      ? togglePopupShown(!isPopupShown)
      : null;
  };
  const uploadPicture = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || !files[0]) return;
    const file = files[0];
    getStringFromImg(file).then((img) => {
      disptach(fetchSetUserPicture(img));
    });
  };

  return (
    <div
      className={`menu-container ${isPopupShown ? "menu-container_shown" : ""}`}
      onClick={togglePopup}
    >
      <div className={`menu ${isPopupShown ? "menu_shown" : ""}`}>
        <div
          className="menu__icon-container"
          style={{ backgroundImage: `url("${user.userPicture || userIcon}")` }}
        >
          <div className="plus-button">
            <input
            className="plus-button__input"
              type="file"
              id="uploadUserPicture"
              onChange={(event) => uploadPicture(event)}
            />
            <label htmlFor="uploadUserPicture">
              <p className="plus-button__icon">+</p>
            </label>
          </div>
        </div>
        <div className="menu__info-container">
          <h2 className="menu__mail-header">{user.mail}</h2>
        </div>
        <div className="menu__buttons-list">
          <button
            className="btn"
            onClick={() => disptach(setUser({ ...user, needChanges: true }))}
          >
            Параметры тела
          </button>
          <a
            className="btn"
            href={
              "https://checkout.bepaid.by/v2/confirm_order/prd_80f5ad55842f6bbf/15111"
            }
          >
            Подписка
          </a>
          <button className="btn" onClick={() => disptach(fetchLogOut())}>
            Выйти
          </button>
        </div>
      </div>
    </div>
  );
}
