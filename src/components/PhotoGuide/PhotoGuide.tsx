import React, { useState } from "react";
import "./PhotoGuide.css";

import backIcon from "../../imgs/backIcon.svg";
import badCloth0 from "../../imgs/badCloth0.png";
import badCloth1 from "../../imgs/badCloth1.png";
import badCloth2 from "../../imgs/badCloth2.png";
import rightCloth from "../../imgs/rightCloth.png";

export default function PhotoGuide({closeEvent}: {closeEvent: ()=>void}) {
  const [pageNumber, changePageNumber] = useState(0);

  return (
    <div className="photoGuide">
      {pageNumber === 0 ? (
        <div>
          <h1>Следуйте некоторым правилам, чтобы сделать хорошее фото</h1>
          <ol>
            <li>Используйте однотонный фон, отличающийся цветом от одежды</li>
            <li> Фотографируйте при хорошем освещенни</li>
            <li>Держите телефон параллельно поверхности и прямо над вещью</li>
            <li>В кадре должна быть целая вещь</li>
          </ol>
          <div className="imgContainer">
            <img src={rightCloth} alt="" />
            <p>Пример удачной фотографии</p>
          </div>
          <img  className="arrow"  src={backIcon} alt="" onClick={() => changePageNumber(1)} />
        </div>
      ) : (
        <div className="secondPage">
          <h1>Примеры, как не стоит фотографировать</h1>
          <div className="imgContainer">
            <img src={badCloth0} alt="" />
            <img src={badCloth1} alt="" />
            <img src={badCloth2} alt="" />
          </div>
          <img className="arrow" src={backIcon} alt="" onClick={() => closeEvent()} />
        </div>
      )}
    </div>
  );
}
