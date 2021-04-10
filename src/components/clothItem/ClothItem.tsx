import React, { Suspense } from 'react';
import { ClothType } from '../../utils/clothRequestService';
import Roller from '../Roller/Roller';
import ChoosedIcon from "../../imgs/choosedIcon.svg";
import './ClothItem.css';

export default function ClothItem ({cloth}: {cloth: ClothType}) {
    return  <div
    className={`cloth-item ${cloth.choosed ? "cloth-item_choosed" : ""}`}
  >
    <img
      src={ChoosedIcon}
      alt=""
      className={`cloth-item__cheked-icon ${
        cloth.choosed ? "cloth-item__cheked-icon_choosed" : ""
      }`}
    />
    <Suspense fallback={<Roller/>}>
      <img className={"cloth-item__image"} src={`/api/imgs/${cloth.id}`} />
    </Suspense>
  </div>
}