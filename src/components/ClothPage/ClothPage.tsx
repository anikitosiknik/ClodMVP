import React, { Suspense, useEffect, useState } from "react";
import Header from "../header/Header";
import "./ClothPage.css";
import "./DesktopClothPage.css";
import plusIcon from "../../imgs/plus.svg";
import ChoosedIcon from "../../imgs/choosedIcon.svg";
import BasketIcon from "../../imgs/basketIcon.svg";
import { ClothStateType, lookType, RootState } from "../../redux/types";
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
import { Cloth, ClothType, CreatedClothType } from "../../utils/clothRequestService";
import LazyContainer from "../LazyContainer/LazyContainer";
import Roller from "../Roller/Roller";

const PhotoGuide = React.lazy(() => import("./../PhotoGuide/PhotoGuide"));

function ClothPage() {
  const [isClothCreating, changeClothCreating] = useState(false);
  const [isClothGuideShowed, changeClothGuideShowed] = useState(false);
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

  const getInfoElement = () => (
    <>
      {getClothsList().length < 2 ? (
        <>
          Добавьте фотографии <br /> Вашей одежды
        </>
      ) : getChoosedClothList().length > 1 ? (
        <>
          Создайте <br /> образ
        </>
      ) : (
        <>
          Выберите фотографии <br /> для создания образа
        </>
      )}
    </>
  );

  const guideRead = () => {
    changeClothGuideShowed(false);
    changeClothCreating(true);
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
      {isClothGuideShowed ? (
        <Modal closeEvent={guideRead}>
          <LazyContainer>
            <PhotoGuide closeEvent={guideRead} />
          </LazyContainer>
        </Modal>
      ) : null}
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
        infoElement={getInfoElement()}
      />
      {getChoosedClothList().length > 1 ? (
        <LookButtons choosedCloth={getChoosedClothList()} />
      ) : (
        <></>
      )}

      {Object.keys(cloths).length ? (
        <ClothList
          clothList={getClothsList().map((cloth) => cloth.id || "")}
          cloths={cloths}
        />
      ) : (
        <div
          className="addClothButton"
          onClick={() => changeClothGuideShowed(true)}
        >
          <img src={plusIcon} alt="" />
        </div>
      )}
    </>
  );
}

export default ClothPage;

function ClothList({
  clothList,
  cloths,
}: {
  clothList: string[];
  cloths: ClothStateType;
}) {
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
            .sort((idOne, idTwo) =>
              new Date(cloths[idOne].createdTime || "") >
              new Date(cloths[idTwo].createdTime || "")
                ? -1
                : 1
            )

            .filter(
              (id, index) =>
                (index + row - clothList.length + 1) % columnsList.length ===
                  0 && cloths[id].createdBy !== "admin"
            )
            .reverse()
            .map((id: string) => {
              return (
                <div
                  key={id}
                  className={`clothItem ${cloths[id].choosed ? "choosed" : ""}`}
                  onClick={() => dispatch(toggleChoosedCloth(id))}
                >
                  <img
                    src={ChoosedIcon}
                    alt=""
                    className={`clothChoosed ${
                      cloths[id].choosed ? "choosed" : ""
                    }`}
                  />
                  <Suspense fallback={<Roller/>}>
                    <img className={"clothImage"} src={`/api/imgs/${id}`} />
                  </Suspense>
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
        составить
      </button>
      <button className="btn" onClick={() => createLookHandler("clod+")}>
        дополнить
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
    <>
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
      <div className="emptyIcon"></div>
    </>
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
