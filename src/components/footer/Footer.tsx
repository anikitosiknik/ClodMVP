import React from "react";
import { RootState } from "../../redux/types";

import "./Footer.css";
import "./DesktopFooter.css";
import { useSelector } from "react-redux";
import { Pages } from "../appContainer/AppContainer";

function Footer({
  navigate,
  currentPage,
}: {
  navigate: (target: Pages) => void;
  currentPage: Pages;
}) {
  const isAdmin = useSelector((state: RootState) => state.user.isAdmin);

  return (
    <footer className="footer">
      <button
        className={`footer__button btn ${currentPage === Pages.ClothPage ? "clicked" : ""}`}
        onClick={() => navigate(Pages.ClothPage)}
      >
        Одежда
      </button>
      <button
        className={`footer__button btn ${currentPage === Pages.LookPage? "clicked" : ""}`}
        onClick={() => navigate(Pages.LookPage)}
      >
        Образы
      </button>
      <button className={`footer__button btn soon`}>Календарь</button>
      {isAdmin ? (
        <button className={`footer__button btn ${currentPage === Pages.AdminPage? "clicked" : ""}`} onClick={()=>navigate(Pages.AdminPage)}>
          admin
        </button>
      ) : null}
    </footer>
  );
}

export default Footer;
