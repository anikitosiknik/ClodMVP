import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchGetClothsById } from "../../redux/reducers/cloth";
import { RootState } from "../../redux/types";
import Modal from "../Modal/Modal";
import backIcon from "../../imgs/backIcon.svg";
import likeIcon from "../../imgs/likeIcon.svg";
import basketIcon from "../../imgs/basketIcon.svg";
import plusIcon from "../../imgs/plus.svg";

import "./LookModal.css";
import {
  fetchDeleteLooks,
  fetchToggleLikeLook,
} from "../../redux/reducers/look";
import { CLOTH_TYPES } from "../../utils/const";

const clothTypeObject: { [key: string]: string } = {};
CLOTH_TYPES.forEach((type) => {
  clothTypeObject[type.value] = type.title;
});

export default function LookModal({
  closeEvent,
  id,
}: {
  closeEvent: () => void;
  id: string
}) {
  const look = useSelector((store: RootState) => store.look[id])
  const cloths = useSelector((store: RootState) => store.cloth);
  const dispatch = useDispatch();
  useEffect(() => {
    const searchIds = look.clothIds.filter((id) => !cloths[id]);
    searchIds.length ? dispatch(fetchGetClothsById(searchIds)) : null;
  }, [look.clothIds]);
  return (
    <Modal closeEvent={closeEvent}>
      <div className="look-modal">
        <div className="look-modal__controls">
          <img src={backIcon} alt="" onClick={() => closeEvent()} />

          <img
            src={likeIcon}
            onClick={() => {
              dispatch(fetchToggleLikeLook(look.id));
              closeEvent();
            }}
            className={`look-modal__like ${look.favorite ? "look-modal__like_liked" : ""}`}
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
        <div className="look-modal__header">
          <img src={look.img || plusIcon} alt="" className="look-modal__image"/>
        </div>
        <div className="look-modal__cloths">
          {look.clothIds
            .filter((id) => {
              return cloths[id];
            })
            .map((id) => {
              const look = cloths[id];
              return (
                <div key={id} className="look-modal-cloth">
                  <img className="look-modal-cloth__image" src={`/api/imgs/${id}`}></img>
                  <div className="look-modal-cloth__info">
                    <p className="look-modal-cloth__type">
                      {clothTypeObject[look.type]}
                    </p>
                    <div
                      className="look-modal-cloth__color"
                      style={{ backgroundColor: look.color }}
                    ></div>
                    <a
                      href={look.link}
                      className={`btn look-modal-cloth__buy ${
                        look.link ? "" : "look-modal-cloth__buy_hidden"
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
