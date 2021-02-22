import React, { useState } from "react";
import Header from "../header/Header";
import "./ClothPage.css";
import plusIcon from "../../imgs/plus.svg";
import { clothChoosedType, clothList, RootState } from "../../redux/types";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import CreateCloth from "./CreateCloth";
import ClothFilters from "./ClothFilters";
import { clothObjectToList } from "../../utils/clothsService";
import { toggleChoosedCloth } from "../../redux/reducers/cloth";

function ClothPage() {
  const [isClothCreating, changeClothCreating] = useState(false);
  const cloths = useSelector((state: RootState) => state.cloth);
  const [filterCloth, changeFilter] = useState("");
  return (
    <>
      <Header />
      {isClothCreating ? (
        <CreateCloth
          closeEvent={() => {
            changeClothCreating(false);
          }}
        />
      ) : null}

      <div className="clothPageContainer">
        <ClothFilters
          createCloth={() => changeClothCreating(true)}
          changeFilter={changeFilter}
          filterCloth={filterCloth}
        />
        {Object.keys(cloths) ? (
        
          <ClothList filterCloth={filterCloth}/>
        ) : (
          <div
            className="addClothButton"
            onClick={() => changeClothCreating(true)}
          >
            <img src={plusIcon} alt="" />
            <p className="addClothText">
              Добавьте фотографии <br /> Вашей одежды
            </p>
          </div>
        )}
      </div>
    </>
  );
}

export default ClothPage;

function ClothList(
  {filterCloth}: {filterCloth: string}
) {
  const cloths = useSelector((state: RootState) => state.cloth);
  const dispatch = useDispatch();
  const getClothsList = (): clothList => {
    return clothObjectToList(cloths).filter((cloth: clothChoosedType) => {
      return (cloth.type === filterCloth || !filterCloth) || cloth.choosed
    });
  };
  return (
    <div className="clothList">
      {getClothsList().map((cloth: clothChoosedType) => {
        return (
          <img
            className={`clothItem ${cloth.choosed ? "choosed" : ""}`}
            onClick={() => dispatch(toggleChoosedCloth(cloth.id))}
            key={cloth.id}
            src={cloth.img}
          ></img>
        );
      })}
    </div>
  );
}

ClothList.propTypes = {
  filterCloth: PropTypes.string.isRequired,
};