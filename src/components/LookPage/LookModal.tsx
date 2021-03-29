import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchGetClothsById } from "../../redux/reducers/cloth";
import { Look, RootState } from "../../redux/types";
import Modal from "../Modal/Modal";
import backIcon from "../../imgs/backIcon.svg";
import likeIcon from "../../imgs/likeIcon.svg";
import basketIcon from "../../imgs/basketIcon.svg";
import plusIcon from "../../imgs/plus.svg";

import "./LookModal.css";
import "./DesktopLookModal.css";
import {
  fetchDeleteLooks,
  fetchToggleLikeLook,
} from "../../redux/reducers/look";
import { CLOTH_TYPES } from "../../utils/const";

const clothTypeObject: { [key: string]: string } = {};
CLOTH_TYPES.forEach((type) => {
  clothTypeObject[type.value] = type.title;
});

export function LookModal({
  closeEvent,
  look,
}: {
  closeEvent: () => void;
  look: Look;
}) {
  const cloths = useSelector((store: RootState) => store.cloth);
  const dispatch = useDispatch();
  useEffect(() => {
    const searchIds = look.clothIds.filter((id) => !cloths[id]);
    searchIds.length ? dispatch(fetchGetClothsById(searchIds)) : null;
  }, [look.clothIds]);
  return (
    <Modal closeEvent={closeEvent}>
      <div className="lookModal">
        <div className="lookModalControls">
          <img src={backIcon} alt="" onClick={() => closeEvent()} />
          {/* {look.ready ? (
            <select
            defaultValue={look.category}
              onChange={(e) => {
                dispatch(
                  fetchChangeCategoryLook({ id: look.id, category: e.target.value })
                );
                closeEvent()
              }
                
              }
            >
              {[{ title: "Все", type: "" }, ...LOOKS_CATEGORIES_FOR_CHOOSE].map(
                (cloth) => (
                  <option key={cloth.title} value={cloth.type} >
                    {cloth.title}
                  </option>
                )
              )}
            </select>
          ) : null} */}

          <img
            src={likeIcon}
            onClick={() => {
              dispatch(fetchToggleLikeLook(look.id));
              closeEvent();
            }}
            className={`like ${look.favorite ? "liked" : ""}`}
          />
          <img
            src={basketIcon}
            onClick={() => {
              dispatch(fetchDeleteLooks([look.id]));
              closeEvent();
            }}
            alt=""
          />
        </div>
        <div className="lookModalHeader">
          <img src={look.img || plusIcon} alt="" />
        </div>
        <div className="lookModalClothContainer">
          {look.clothIds
            .filter((id) => {
              return cloths[id];
            })
            .map((id) => {
              const look = cloths[id];
              return (
                <div key={id} className="lookModalCloth">
                  
                  <img className="lookModalImg" src={`/api/imgs/${id}`}></img>
                  <div className="lookModalClothInfo">
                    <p className="lookModalType">
                      {clothTypeObject[look.type]}
                    </p>
                    <div
                      className="lookModalColor"
                      style={{ backgroundColor: look.color }}
                    ></div>
                    <a
                      href={look.link}
                      className={`btn lookModalButton ${
                        look.link ? "show" : "hide"
                      }`}
                    >
                      Купить
                    </a>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </Modal>
  );
}
