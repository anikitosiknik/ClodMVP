import React, { useState } from "react";
import logo from "../../imgs/logo.svg";
import userIcon from "../../imgs/user.svg";
import "./Header.css";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/types";
import { getImgFromFile } from "../../utils/fileService";
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
      {additionalElement || <div className="emptyIcon" />}
      <img className="header-logo" src={logo}></img>
      {logoOnly ? <div className="emptyIcon" /> : <UserIcon />}
    </div>
  );
}

function UserIcon() {
  const [isPopupShown, togglePopupShown] = useState(false);
  const userPicture = useSelector((state: RootState) => state.user.userPicture);
  return (
    <React.Fragment>
      <UserPopup
        isPopupShown={isPopupShown}
        togglePopupShown={togglePopupShown}
      />
      <div
        className="userIcon"
        style={{ backgroundImage: `url("${userPicture || userIcon}")` }}
        onClick={() => togglePopupShown(!isPopupShown)}
      ></div>
    </React.Fragment>
  );
}

function UserPopup({
  isPopupShown,
  togglePopupShown,
}: {
  isPopupShown: boolean;
  togglePopupShown: (status: boolean) => void;
}) {
  const user = useSelector((state: RootState) => state.user);
  const togglePopup = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    isPopupShown && event.target === event.currentTarget
      ? togglePopupShown(!isPopupShown)
      : null;
  };
  const disptach = useDispatch();
  const uploadPicture = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || !files[0]) return;
    const file = files[0];
    getImgFromFile(file).then((img) => {
      disptach(fetchSetUserPicture(img));
    });
  };

  return (
    <div
      className={`userPopupContainer ${isPopupShown ? "shown" : ""}`}
      onClick={togglePopup}
    >
      <div className={`userPopup ${isPopupShown ? "shown" : ""}`}>
        <div
          className="userPopup-iconContainer"
          style={{ backgroundImage: `url("${user.userPicture || userIcon}")` }}
        >
          <div className="userPopup-plus">
            <input
              type="file"
              id="uploadUserPicture"
              onChange={(event) => uploadPicture(event)}
            />
            <label htmlFor="uploadUserPicture">
              <p>+</p>
            </label>
          </div>
        </div>
        <div className="userPopup-infoContainer">
          <h2>{user.mail}</h2>
        </div>
        <div className="userPopup-buttons">
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
