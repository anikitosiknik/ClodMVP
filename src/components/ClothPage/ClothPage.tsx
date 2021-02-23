import React, { useState } from "react";
import Header from "../header/Header";
import "./ClothPage.css";
import plusIcon from "../../imgs/plus.svg";
import ChoosedIcon from "../../imgs/choosedIcon.svg";
import BasketIcon from "../../imgs/basketIcon.svg";
import {
  clothChoosedType,
  clothList,
  lookType,
  RootState,
} from "../../redux/types";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import CreateCloth from "./CreateCloth";
import ClothFilters from "./ClothFilters";
import { clothObjectToList } from "../../utils/clothsService";
import {
  fetchDeleteCloth,
  toggleChoosedCloth,
} from "../../redux/reducers/cloth";
import { fetchCreateLook } from "../../redux/reducers/look";

function ClothPage() {
  const [isClothCreating, changeClothCreating] = useState(false);
  const cloths = useSelector((state: RootState) => state.cloth);
  const [filterCloth, changeFilter] = useState("");

  const getClothsList = (): clothList => {
    return clothObjectToList(cloths).filter((cloth: clothChoosedType) => {
      return cloth.type === filterCloth || !filterCloth || cloth.choosed;
    });
  };
  const getChoosedClothList = (): clothList => {
    return clothObjectToList(cloths).filter((cloth: clothChoosedType) => {
      return cloth.choosed;
    });
  };

  return (
    <>
      <Header
        additionalElement={
          getChoosedClothList().length ? (
            <ClothBusket choosedCloths={getChoosedClothList()} />
          ) : null
        }
      />
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
        {getChoosedClothList().length ? (
          <LookButtons choosedCloth={getChoosedClothList()} />
        ) : (
          <></>
        )}
        {Object.keys(cloths) ? (
          <ClothList clothList={getClothsList()} />
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

function ClothList({ clothList }: { clothList: clothList }) {
  const dispatch = useDispatch();

  return (
    <div className="clothList">
      {clothList.map((cloth: clothChoosedType) => {
        return (
          <div
            key={cloth.id}
            className={`clothItem ${cloth.choosed ? "choosed" : ""}`}
          >
            <img
              src={ChoosedIcon}
              alt=""
              className={`clothChoosed ${cloth.choosed ? "choosed" : ""}`}
            />
            <img
              className={"clothImage"}
              onClick={() => dispatch(toggleChoosedCloth(cloth.id))}
              src={cloth.img}
            />
          </div>
        );
      })}
    </div>
  );
}

ClothList.propTypes = {
  clothList: PropTypes.array.isRequired,
};

function LookButtons({ choosedCloth }: { choosedCloth: clothList }) {
  const dispatch = useDispatch();



  const createLookHandler = (type: lookType) => {
    dispatch(fetchCreateLook({
      ready: false,
      type: type,
      clothIds: choosedCloth.map(cloth=>cloth.id),
    }))
  };
  return (
    <div className="lookButtons">
      <button className="btn">Вручную</button>
      <button className="btn" onClick={() => createLookHandler("clod")}>
        clod
      </button>
      <button className="btn" onClick={() => createLookHandler("clod+")}>
        clod+
      </button>
    </div>
  );
}

LookButtons.propTypes = {
  choosedCloth: PropTypes.array.isRequired,
};

function ClothBusket({ choosedCloths }: { choosedCloths: clothList }) {
  const dispatch = useDispatch();
  const deleteClothHandler = () =>
    dispatch(fetchDeleteCloth(choosedCloths.map((cloth) => cloth.id)));
  return (
    <div className="basketContainer" onClick={() => deleteClothHandler()}>
      <img src={BasketIcon} className="basketIcon" alt="" />
    </div>
  );
}

ClothBusket.propTypes = {
  choosedCloths: PropTypes.array.isRequired,
};
