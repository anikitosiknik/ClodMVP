import React, { useEffect, useState } from "react";
import Header from "../header/Header";
import "./ClothPage.css";
import "./DesktopClothPage.css";
import plusIcon from "../../imgs/plus.svg";
import ChoosedIcon from "../../imgs/choosedIcon.svg";
import BasketIcon from "../../imgs/basketIcon.svg";
import { lookType, RootState } from "../../redux/types";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import { CreateClothModal } from "./CreateCloth";
import ClothFilters from "./ClothFilters";
import {
  fetchCreateCloth,
  fetchDeleteCloth,
  toggleChoosedCloth,
} from "../../redux/reducers/cloth";
import { fetchCreateLook } from "../../redux/reducers/look";
import Modal from "../Modal/Modal";
import { Cloth, ClothType, CreatedClothType } from "../../utils/clothsService";
import Roller from "../Roller/Roller";

function ClothPage() {
  const [isClothCreating, changeClothCreating] = useState(false);
  const cloths = useSelector((state: RootState) => state.cloth);
  const [filterCloth, changeFilter] = useState("");
  const dispatch = useDispatch();


  const createCloth = (cloth: CreatedClothType) => {
    dispatch(fetchCreateCloth(cloth));
    changeClothCreating(false);
  };

  const getClothsList = (): ClothType[] => {
    return Cloth.objectToList(cloths).filter((cloth: ClothType) => {
      return cloth.type === filterCloth || !filterCloth || cloth.choosed;
    });
  };
  const getChoosedClothList = (): ClothType[] => {
    return Cloth.objectToList(cloths).filter((cloth: ClothType) => {
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
        <CreateClothModal
          closeEvent={() => {
            changeClothCreating(false);
          }}
          createHandler={createCloth}
        />
      ) : null}

      <ClothFilters
        createCloth={() => changeClothCreating(true)}
        changeFilter={changeFilter}
        filterCloth={filterCloth}
      />
      {getChoosedClothList().length > 1 ? (
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
    </>
  );
}

export default ClothPage;

function ClothList({ clothList }: { clothList: ClothType[] }) {
  const dispatch = useDispatch();
  const columnsList = useColumnList();

  return (
    <div
      className="clothList"
      style={{ gridTemplateColumns: `repeat(${columnsList.length}, 1fr)` }}
    >
      {columnsList.map((row) => (
        <div key={row} className="clothListColumn">
          {clothList
            .filter(
              (el, index) =>
                (index + row - clothList.length + 1) % columnsList.length === 0
            )
            .map((cloth: ClothType) => {
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
                  {!cloth.img ? (
                    <Roller />
                  ) : (
                    <img
                      className={"clothImage"}
                      onClick={() =>
                        dispatch(toggleChoosedCloth(cloth.id || ""))
                      }
                      src={cloth.img}
                    />
                  )}
                </div>
              );
            })}
        </div>
      ))}
    </div>
  );
}

ClothList.propTypes = {
  clothList: PropTypes.array.isRequired,
};

function LookButtons({ choosedCloth }: { choosedCloth: ClothType[] }) {
  const dispatch = useDispatch();

  const createLookHandler = (type: lookType) => {
    dispatch(
      fetchCreateLook({
        ready: false,
        type: type,
        clothIds: choosedCloth.map((cloth) => cloth.id || ""),
      })
    );
  };
  return (
    <div className="lookButtons">
      <button className="btn soon">Вручную</button>
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

function ClothBusket({ choosedCloths }: { choosedCloths: ClothType[] }) {
  const dispatch = useDispatch();
  const [isDeleteModalOpened, changeDeleteModalOpened] = useState(false);
  const deleteClothHandler = () =>
    dispatch(fetchDeleteCloth(choosedCloths.map((cloth) => cloth.id || "")));
  return isDeleteModalOpened ? (
    <Modal closeEvent={() => changeDeleteModalOpened(false)}>
      <div className="deleteModal">
        <h2 className="deleteModalHeader">
          Вы действительно хотите удалить выбранные вещи?
        </h2>
        <button
          className="deleteModalNo btn"
          onClick={() => changeDeleteModalOpened(false)}
        >
          Нет
        </button>
        <button
          className="deleteModalYes btn"
          onClick={() => deleteClothHandler()}
        >
          Да
        </button>
        <p className="deleteModalWarning">Одежда удалится безвозвратно</p>
      </div>
    </Modal>
  ) : (
    <div
      className="basketContainer"
      onClick={() => changeDeleteModalOpened(true)}
    >
      <img src={BasketIcon} className="basketIcon" alt="" />
    </div>
  );
}

ClothBusket.propTypes = {
  choosedCloths: PropTypes.array.isRequired,
};

const useColumnList = () => {
  const [columnCount, changeColumnCount] = useState(3);

  useEffect(() => {
    function handleResize() {
      const width = window.innerWidth;
      changeColumnCount(Math.round(width / 140));
    }

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return Array.from(Array(columnCount).keys());
};
