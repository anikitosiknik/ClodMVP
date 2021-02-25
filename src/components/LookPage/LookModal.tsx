import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchGetClothsById } from "../../redux/reducers/cloth";
import { Look, RootState } from "../../redux/types";
import Modal from "../Modal/Modal";
import "./LookModal.css";

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
        {look.clothIds
          .filter((id) => {
            return cloths[id];
          })
          .map((id) => {
            const look = cloths[id];
            return <img className="lookModalImg" key={id} src={look.img}></img>;
          })}
      </div>
    </Modal>
  );
}
