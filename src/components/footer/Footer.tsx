import React from "react";
import PropTypes, { InferProps } from "prop-types";
import { Pages } from '../../redux/types';

import "./Footer.css";

function Footer({ navigate, currentPage }: InferProps<typeof Footer.propTypes>) {

    const navigateHandler = (target: Pages) => {
        navigate(target)
    }

  return (
    <footer className="footer">
      <button className={`btn ${currentPage === 'clothPage' ? 'clicked' : ''}`} onClick={() => navigateHandler('clothPage')}>Одежда</button>
      <button className={`btn ${currentPage === 'lookPage' ? 'clicked' : ''}`} onClick={() => navigateHandler('lookPage')}>Образы</button>
      <button className={`btn soon`}>Календарь</button>
    </footer>
  );
}

Footer.propTypes = {
  navigate: PropTypes.func.isRequired,
  currentPage: PropTypes.string.isRequired
};

export default Footer;
