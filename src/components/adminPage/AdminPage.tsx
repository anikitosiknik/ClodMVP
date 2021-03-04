import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchGetLooksAdmin,
  fetchUpdateLookAdmin,
} from "../../redux/reducers/admin";
import { Look, lookList, RootState, userState } from "../../redux/types";
import { looksObjectToList } from "../../utils/lookService";
import Modal from "../Modal/Modal";
import backIcon from "../../imgs/backIcon.svg";
import likeIcon from "../../imgs/likeIcon.svg";
import basketIcon from "../../imgs/basketIcon.svg";
import plusIcon from "../../imgs/plus.svg";
import "./AdminPage.css";
import "../LookPage/LookModal.css"
import "../LookPage/LookPage.css"
import "../LookPage/DesktopLookPage.css"
import "../LookPage/DesktopLookModal.css"

import {
  fetchDeleteLooks,
  fetchToggleLikeLook,
} from "../../redux/reducers/look";
import { CLOTH_TYPES, EYES_COLORS, HAIR_COLORS } from "../../utils/const";

import plus from "../../imgs/plus.svg";
import { fetchGetClothsById } from "../../redux/reducers/cloth";
import { getImgFromFile } from "../../utils/fileService";
import { getUserAdminRequest } from "../../utils/adminService";
import { ClothType, CreatedClothType } from "../../utils/clothsService";
import CreateCloth from "../ClothPage/CreateCloth";

export default function AdminPage() {
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

const initialState: userState = {
  logined: false,
  name: "",
  mail: "",
  chest: 0,
  waist: 0,
  hips: 0,
  height: 0,
  age: 0,
  skin: "",
  hair: "",
  eyes: "",
  country: "",
  city: "",
  // style: '',
  needChanges: false,
  isInfoSetted: false,
  userPicture: "",
  isMailCodeReady: false,
  choosedImages: "",
};

export type UpdateLook = {
  mail: string;
  img: string;
  id: string;
  clothUpd: { img: string; id: string }[];
  clothDelete: string[];
  clothCreate: ClothType[];
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
  const [user, changeUser] = useState<userState>(initialState);

  useEffect(() => {
    const searchIds = look.clothIds.filter((id) => !cloths[id]);
    searchIds.length ? dispatch(fetchGetClothsById(searchIds)) : null;
  }, [look.clothIds]);

  useEffect(() => {
    getUserAdminRequest(look.createdBy)
      .then((res) => res.json())
      .then((res) => {
        changeUser(res);
      });
  }, []);

  const [updatedLook, updatedLookChange] = useState<UpdateLook>({
    mail: look.createdBy,
    id: look.id,
    img: "",
    clothUpd: [],
    clothDelete: [],
    clothCreate: [],
  });

  const updateCreateCloth = (look: CreatedClothType) => {
    updatedLookChange({
      ...updatedLook,
      clothCreate: [...updatedLook.clothCreate, look],
    });
  };

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
        <div className="adminUser">
          <img src={user.userPicture} alt="" className="adminUserImage" />
          <div className="adminUserInfo">
            <div>mail: {user.mail}</div>
            <div>chest: {user.chest}</div>
            <div>waist: {user.waist}</div>
            <div>hips: {user.hips}</div>
            <div>height: {user.height}</div>
            <div>age: {user.age}</div>
            <div>likes: {user.choosedImages}</div>
            <div>
              skin:
              <div
                className="colorCircle"
                style={{ backgroundColor: user.skin }}
              ></div>
            </div>
            <div>
              eyes:
              <div
                className="colorCircle"
                style={{
                  backgroundColor: EYES_COLORS.find(
                    (el) => el.name === user.eyes
                  )?.hex,
                }}
              ></div>
            </div>
            <div>
              hair:
              <div
                className="colorCircle"
                style={{
                  backgroundColor: HAIR_COLORS.find(
                    (el) => el.name === user.hair
                  )?.hex,
                }}
              ></div>
            </div>
            <div> countrye: {user.country}</div>
            <div> city: {user.city}</div>
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
                      className="lookModalImgAdmin"
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
          {look.type === "clod+"
            ? updatedLook.clothCreate.map((el, i) => {
                return (
                  <div key={i} className="createdCloth">
                    <img src={el.img} alt="" />
                    <div>
                      <div>type: {el.type}</div>
                      <div>link: {el.link}</div>
                      <div>
                        hair:
                        <div
                          className="colorCircle"
                          style={{
                            backgroundColor: HAIR_COLORS.find(
                              (elem) => elem.name === el.color
                            )?.hex,
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                );
              })
            : null}
          {look.type === "clod+" ? (
            <CreateClothAdmin create={updateCreateCloth} />
          ) : null}
        </div>
        <button
          className="btn"
          onClick={() => {
            dispatch(fetchUpdateLookAdmin(updatedLook));
            closeEvent();
          }}
        >
          Отправить
        </button>
      </div>
    </Modal>
  );
}

function CreateClothAdmin({
  create,
}: {
  create: (look: CreatedClothType) => void;
}) {
  const [link, changeLink] = useState("");

  const submitForm = (cloth: CreatedClothType) => {
    cloth.link = link;
    create(cloth);
  };

  return (
    <div className="CreateClothAdmin">
      <input
        onChange={(e) => changeLink(e.target.value)}
        className="createClothUrl inp"
        type="text"
        placeholder="ссылка на вещь"
      />
      <CreateCloth createHandler={submitForm}></CreateCloth>
    </div>
  );
}
