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

  return (
    <footer className="footer">
      <button
        className={`btn ${currentPage === "clothPage" ? "clicked" : ""}`}
        onClick={() => navigate(Pages.ClothPage)}
      >
        Одежда
      </button>
      <button
        className={`btn ${currentPage === "lookPage" ? "clicked" : ""}`}
        onClick={() => navigate(Pages.LookPage)}
      >
        Образы
      </button>
      <button className={`btn soon`}>Календарь</button>
      {isAdmin ? (
        <button className={`btn`} onClick={()=>navigate(Pages.AdminPage)}>
          admin
        </button>
      ) : null}
    </footer>
  );
}

export default Footer;
