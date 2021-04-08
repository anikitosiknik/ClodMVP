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
  currentPage: string;
}) {
  const isAdmin = useSelector((state: RootState) => state.user.isAdmin);
  const navigateHandler = (target: Pages) => {
    navigate(target);
  };

  return (
    <footer className="footer">
      <button
        className={`btn ${currentPage === "clothPage" ? "clicked" : ""}`}
        onClick={() => navigateHandler(Pages.ClothPage)}
      >
        Одежда
      </button>
      <button
        className={`btn ${currentPage === "lookPage" ? "clicked" : ""}`}
        onClick={() => navigateHandler(Pages.LookPage)}
      >
        Образы
      </button>
      <button className={`btn soon`}>Календарь</button>
      {isAdmin ? (
        <button className={`btn`} onClick={() => navigateHandler(Pages.AdminPage)}>
          admin
        </button>
      ) : null}
    </footer>
  );
}

export default Footer;
