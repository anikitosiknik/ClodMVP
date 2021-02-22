import React, { useRef, useState } from "react";
import { CLOTH_TYPES, HAIR_COLORS } from "../../utils/const";
import ColorInput from "../colorInput/ColorInput";
import Header from "../header/Header";
import Modal from "../Modal/Modal";
import "./ClothPage.css";
import plus from "../../imgs/plus.svg";
import { getImgFromFile } from "../../utils/fileService";
import { createdCloth, RootState } from "../../redux/types";
import { useDispatch, useSelector } from "react-redux";
import { fetchCreateCloth } from "../../redux/reducers/cloth";

function ClothPage() {
  const [isClothCreating, changeClothCreating] = useState(true);

  return (
    <>
      <Header />
      {isClothCreating ? (
        <Modal
          closeEvent={() => {
            changeClothCreating(false);
          }}
        >
          <CreateCloth></CreateCloth>
        </Modal>
      ) : null}

      <div>cloth</div>
    </>
  );
}

export default ClothPage;

function CreateCloth() {
  const user = useSelector((state: RootState) => state.user)
  const [clothPicture, changeClothPicture] = useState("");
  const colorInput = ColorInput("Выберите цвет", HAIR_COLORS, "hair");
  const typeRef = useRef<HTMLSelectElement>(null);
  const dispatch = useDispatch()

  const submitForm = () => {
    
    if (typeRef.current) {
      const generatedCloth: createdCloth = {
        img: clothPicture,
        color: colorInput.currentColor,
        type: typeRef.current.value,
        createdBy: user.mail
      }
      dispatch(fetchCreateCloth(generatedCloth))
    }
  };

  const uploadPicture = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || !files[0]) return;
    const file = files[0];
    getImgFromFile(file).then((img) => {
      changeClothPicture(img);
    });
  };
  return (
    <div className="createCloth">
      <label htmlFor="uploadClothPicture">
        <img src={clothPicture || plus} alt="" />
      </label>
      <input type="file" id="uploadClothPicture" onChange={uploadPicture} />
      <select ref={typeRef}>
        {CLOTH_TYPES.map((cloth) => (
          <option key={cloth.title} value={cloth.value}>
            {cloth.title}
          </option>
        ))}
      </select>
      {colorInput.element}
      <button className="btn sm" onClick={() => submitForm()}>
        Сохранить
      </button>
    </div>
  );
}
