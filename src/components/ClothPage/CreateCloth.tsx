import React, { useRef, useState } from "react";
import { CLOTH_TYPES, HAIR_COLORS } from "../../utils/const";
import ColorInput from "../colorInput/ColorInput";
import "./CreateCloth.css";
import plus from "../../imgs/plus.svg";
import { getImgFromFile } from "../../utils/fileService";
import { RootState } from "../../redux/types";
import { useSelector } from "react-redux";
import Modal from "../Modal/Modal";
import { CreatedClothType } from "../../utils/clothsService";

function CreateCloth({
  createHandler,
}: {
  createHandler: (cloth: CreatedClothType) => void;
}) {
  const user = useSelector((state: RootState) => state.user);
  const [clothPicture, changeClothPicture] = useState("");
  const colorInput = ColorInput("Выберите цвет", HAIR_COLORS, "hair");
  const typeRef = useRef<HTMLSelectElement>(null);

  const submitForm = () => {
    if (typeRef.current) {
      const generatedCloth: CreatedClothType = {
        img: clothPicture,
        color: colorInput.value,
        type: typeRef.current.value,
        createdBy: user.mail,
      };
      
      return clothPicture ? createHandler(generatedCloth) : null;
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

export default CreateCloth;

export function CreateClothModal({
  closeEvent,
  createHandler,
}: {
  closeEvent: () => void;
  createHandler: (cloth: CreatedClothType) => void;
}) {
  return (
    <Modal closeEvent={() => closeEvent()}>
      <CreateCloth createHandler={createHandler} />
    </Modal>
  );
}
