import React, { useState } from "react";
import PropTypes, { InferProps } from "prop-types";
import logo from "../../imgs/logo.svg";
import userIcon from "../../imgs/user.svg";
import "./Header.css";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/types";

function Header({
  logoOnly,
  additionalElement,
}: InferProps<typeof Header.propTypes>) {
  return (
    <div className="header">
      {additionalElement || <div className="emptyIcon" />}
      <img className="header-logo" src={logo}></img>
      {logoOnly ? <div className="emptyIcon" /> : <UserIcon />}
    </div>
  );
}

Header.propTypes = {
  logoOnly: PropTypes.bool,
  additionalElement: PropTypes.element,
};

export default Header;

function UserIcon() {
  const [isPopupShown, togglePopupShown] = useState(false);

  return (
    <React.Fragment>
      <UserPopup isPopupShown={isPopupShown} togglePopupShown={togglePopupShown} />
      <img
        className="userIcon"
        src={userIcon}
        onClick={() => togglePopupShown(!isPopupShown)}
      ></img>
    </React.Fragment>
  );
}

function UserPopup({
  isPopupShown,
  togglePopupShown,
}: InferProps<typeof UserPopup.propTypes>) {

    const user = useSelector((state: RootState) => state.user)
    const togglePopup = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        isPopupShown && event.target === event.currentTarget ? togglePopupShown(!isPopupShown): null
    }

  return (
    <div
      className={`userPopupContainer ${isPopupShown ? "shown" : ""}`}
      onClick={togglePopup}
    >
      <div className={`userPopup ${isPopupShown ? "shown" : ""}`}>
          <div className="userPopup-iconContainer">
          <img src={userIcon} className="userPopup-icon"/>
            <div className="userPopup-plus"><p>+</p></div>
          </div>
          <div className="userPopup-infoContainer">
              <h2>{user.name}</h2>
              <p>{user.mail}</p>
          </div>
          <div className="userPopup-buttons">
          <button className="btn">Параметры тела</button>
          <button className="btn">Подписка</button>
          <button className="btn">Выйти</button>
          </div>
      </div>
    </div>
  );
}

UserPopup.propTypes = {
  isPopupShown: PropTypes.bool.isRequired,
  togglePopupShown: PropTypes.func.isRequired,
};
