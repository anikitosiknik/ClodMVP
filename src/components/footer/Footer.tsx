import React from "react";
import PropTypes, { InferProps } from "prop-types";
import { Pages, RootState } from '../../redux/types';

import "./Footer.css";
import "./DesktopFooter.css";
import { useSelector } from "react-redux";

function Footer({ navigate, currentPage }: InferProps<typeof Footer.propTypes>) {
    const isAdmin = useSelector((state: RootState) => state.user.isAdmin)
    const navigateHandler = (target: Pages) => {
        navigate(target)
    }

  return (
    <footer className="footer">
      <button className={`btn ${currentPage === 'clothPage' ? 'clicked' : ''}`} onClick={() => navigateHandler('clothPage')}>Одежда</button>
      <button className={`btn ${currentPage === 'lookPage' ? 'clicked' : ''}`} onClick={() => navigateHandler('lookPage')}>Образы</button>
      <button className={`btn soon`}>Календарь</button>
      {isAdmin ? <button className={`btn`} onClick={() => navigateHandler('admin')}>admin</button> : null}
    </footer>
  );
}

Footer.propTypes = {
  navigate: PropTypes.func.isRequired,
  currentPage: PropTypes.string.isRequired
};

export default Footer;
