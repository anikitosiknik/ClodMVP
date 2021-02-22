import React, { useRef, useState } from "react";
import { CLOTH_TYPES, HAIR_COLORS } from "../../utils/const";
import ColorInput from "../colorInput/ColorInput";
import "./CreateCloth.css";
import plus from "../../imgs/plus.svg";
import { getImgFromFile } from "../../utils/fileService";
import { createdCloth, RootState } from "../../redux/types";
import { useDispatch, useSelector } from "react-redux";
import { fetchCreateCloth } from "../../redux/reducers/cloth";
import PropTypes, { InferProps } from "prop-types";
import Modal from "../Modal/Modal";

function CreateCloth({ closeEvent }: InferProps<typeof CreateCloth.propTypes>) {
  const user = useSelector((state: RootState) => state.user);
  const [clothPicture, changeClothPicture] = useState("");
  const colorInput = ColorInput("Выберите цвет", HAIR_COLORS, "hair");
  const typeRef = useRef<HTMLSelectElement>(null);
  const dispatch = useDispatch();

  const submitForm = () => {
    if (typeRef.current) {
      const generatedCloth: createdCloth = {
        img: clothPicture,
        color: colorInput.currentColor,
        type: typeRef.current.value,
        createdBy: user.mail,
      };
      dispatch(fetchCreateCloth(generatedCloth));
      closeEvent();
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
    <Modal closeEvent={() => closeEvent()}>
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
    </Modal>
  );
}

CreateCloth.propTypes = {
  closeEvent: PropTypes.func.isRequired,
};

export default CreateCloth;
