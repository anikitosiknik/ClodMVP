import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchGetLooksAdmin, fetchUpdateLookAdmin } from "../../redux/reducers/admin";
import { Look, lookList, RootState } from "../../redux/types";
import { looksObjectToList } from "../../utils/lookService";
import Modal from "../Modal/Modal";
import backIcon from "../../imgs/backIcon.svg";
import likeIcon from "../../imgs/likeIcon.svg";
import basketIcon from "../../imgs/basketIcon.svg";
import plusIcon from "../../imgs/plus.svg";
import "./AdminPage.css";

import {
  fetchDeleteLooks,
  fetchToggleLikeLook,
} from "../../redux/reducers/look";
import { CLOTH_TYPES } from "../../utils/const";

import plus from "../../imgs/plus.svg";
import { fetchGetClothsById } from "../../redux/reducers/cloth";
import { getImgFromFile } from "../../utils/fileService";

function AdminPage() {
  const dispatch = useDispatch();
  const admin = useSelector((state: RootState) => state.admin);
  useEffect(() => {
    if (!Object.keys(admin).length) dispatch(fetchGetLooksAdmin());
  }, []);
  return (
    <div>
      <CategoryPage
        page={{
          title: "all",
          looks: looksObjectToList(admin),
        }}
      />
    </div>
  );
}

export default AdminPage;

const emptyLook = (): Look => ({
  createdBy: "",
  category: "",
  id: "",
  favorite: false,
  img: "",
  ready: false,
  clothIds: [],
  type: "clod",
});
function CategoryPage({ page }: { page: { title: string; looks: lookList } }) {
  const [lookModal, changeLookModal] = useState<Look>(emptyLook());
  return (
    <>
      {lookModal.id ? (
        <LookModal
          look={lookModal}
          closeEvent={() => changeLookModal(emptyLook())}
        ></LookModal>
      ) : null}
      <h2>{page.title}</h2>
      <div className="categoryPage">
        {page.looks.map((look) => (
          <div
            onClick={() => changeLookModal(look)}
            className="categoryPageLook"
            key={look.id}
          >
            <img src={look.img || plus}></img>
          </div>
        ))}
      </div>
    </>
  );
}

const clothTypeObject: { [key: string]: string } = {};
CLOTH_TYPES.forEach((type) => {
  clothTypeObject[type.value] = type.title;
});

export type UpdateLook = {
  img: string;
  id: string;
  clothUpd: { img: string; id: string }[];
  clothDelete: string[];
};

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

  const [updatedLook, updatedLookChange] = useState<UpdateLook>({
    id: look.id,
    img: "",
    clothUpd: [],
    clothDelete: [],
  });

  const uplodaLookPicture = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || !files[0]) return;
    const file = files[0];
    getImgFromFile(file).then((img) => {
      updatedLookChange({ ...updatedLook, img });
    });
  };

  const updateClothPicture = (
    event: React.ChangeEvent<HTMLInputElement>,
    id: string
  ) => {
    const files = event.target.files;
    if (!files || !files[0]) return;
    const file = files[0];
    getImgFromFile(file).then((img) => {
      updatedLookChange({
        ...updatedLook,
        clothUpd: [...updatedLook.clothUpd, { img, id }],
      });
    });
  };
  const deleteCloth = (id: string) => {
    updatedLookChange({
      ...updatedLook,
      clothDelete: [...updatedLook.clothDelete, id],
    });
  };
  return (
    <Modal closeEvent={closeEvent}>
      <div className="lookModal">
        <div className="lookModalControls">
          <img src={backIcon} alt="" onClick={() => closeEvent()} />
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
          <input
            type="file"
            id="uploadLookPicture"
            onChange={(event) => uplodaLookPicture(event)}
          />
          <label htmlFor="uploadLookPicture">
            <img
              src={updatedLook.img || plusIcon}
              alt=""
              className="lookModalHeaderImage"
            />
          </label>
        </div>
        <div className="lookModalClothContainer">
          {look.clothIds
            .filter((id) => {
              return cloths[id] && !updatedLook.clothDelete.includes(id);
            })
            .map((id) => {
              const look = cloths[id];
              return (
                <div key={id} className="lookModalCloth">
                  <input
                    type="file"
                    className="updateClothPicture"
                    id={`updateClothPicture${id}`}
                    onChange={(event) => {
                      updateClothPicture(event, id);
                    }}
                  />
                  <label htmlFor={`updateClothPicture${id}`}>
                    <img
                      className="lookModalImg"
                      src={
                        updatedLook.clothUpd.find((cloth) => {
                          return cloth.id === id;
                        })?.img || look.img
                      }
                    ></img>
                  </label>
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
                    <img
                      src={basketIcon}
                      alt=""
                      onClick={() => deleteCloth(id)}
                    />
                  </div>
                </div>
              );
            })}
        </div>
        <button className="btn" onClick={() => dispatch(fetchUpdateLookAdmin(updatedLook))}>Отправить</button>
      </div>
    </Modal>
  );
}
