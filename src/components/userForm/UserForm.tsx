import React, { useState } from "react";
import "./NumberInput.css";
import "./FormInput.css";
import "./DesktopFormInput.css";
import ColorInput from "../colorInput/ColorInput";
import { HAIR_COLORS, EYES_COLORS, SKIN_COLORS, STYLES } from "../../utils/const";
import { useDispatch, useSelector } from "react-redux";
import {
  RootState,
  userNumberKeys,
  userState,
  userStringKeys,
} from "../../redux/types";
import { fetchSetUserInfo } from "../../redux/reducers/user";
import Header from "../header/Header";




interface NumberInputType {
  element: JSX.Element;
  value: string;
  key: userNumberKeys;
}

export interface StringInputType {
  element: JSX.Element;
  value: string;
  key: userStringKeys;
}

function UserForm() {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);
  const [isImagePage, changeImagePage] = useState(false);
  const [choosedImages, changeChoosedImages] = useState<number[]>(
    user.choosedImages ? user.choosedImages.split(",").map((el) => Number(el)) : [0,0,0]
  );

  const numbersInput = [
    NumberInput("Обхват груди", "см", "chest", user.chest ? user.chest.toString() : ''),
    NumberInput("Обхват талии", "см", "waist", user.waist ? user.waist.toString() : ''),
    NumberInput("Обхват бедер", "см", "hips", user.hips? user.hips.toString() : ''),
    NumberInput("Рост", "см", "height", user.height? user.height.toString() : ''),
    NumberInput("Возраст", "лет", "age", user.age? user.age.toString(): ''),
  ];
  const colorInputs = [
    ColorInput("Цвет волос", HAIR_COLORS, "hair", user.hair),
    ColorInput("Цвет глаз", EYES_COLORS, "eyes", user.eyes),
    ColorInput("Цвет кожи", SKIN_COLORS, "skin", user.skin),
    StringInput("Страна", "country", user.country),
    StringInput("Город", "city", user.city),
  ];

  const submitForm = () => {
    const formValues = compileInputValues(
      getNumbersValues(numbersInput),
      getColorsValues(colorInputs)
    );
    const generatedUser: userState = { ...user, ...formValues };
    dispatch(fetchSetUserInfo(generatedUser));
  };

  const getNumbersValues = (inputs: NumberInputType[]) => {
    return inputs.map((input) => ({
      key: input.key,
      value: Number(input.value) || 0,
    }));
  };

  const getColorsValues = (inputs: StringInputType[]) => {
    return inputs.map((input) => ({ key: input.key, value: input.value }));
  };

  const compileInputValues = (
    numberValues: { key: userNumberKeys; value: number }[],
    stringValues: { key: userStringKeys; value: string }[]
  ) => {
    const response: userState = { ...user };
    numberValues.map((value) => {
      response[value.key] = value.value;
    });
    stringValues.map((value) => {
      response[value.key] = value.value;
    });

    response.choosedImages = choosedImages.join(",");
    return response;
  };

  const handleChooseImage = (index: number) => {
    let images = [...choosedImages];
    if (images.includes(index)) images = images.filter((el) => el !== index);
    else {
      if (images.length === 3) images.shift();
      images.push(index);
    }

    changeChoosedImages(images);
  };

  return (
    <React.Fragment>
      <Header logoOnly />
      {!isImagePage ? (
        <div className="userForm">
          <h2>Введите свои данные</h2>
          {numbersInput.map((elements) => elements.element)}
          {colorInputs.map((stringInput) => (
            <div key={stringInput.key} className="inputContainer">
              {stringInput.element}
            </div>
          ))}

          <button
            className="btn sm useForm-button"
            onClick={() => changeImagePage(true)}
          >
            Готово
          </button>
        </div>
      ) : (
        <div className="userForm">
          <h2>Выберите стиль, который Вам нравится</h2>
          <div className="styleImgsContainer">
            {STYLES.map((el) => (
              <div
                key={el.id}
                onClick={() => handleChooseImage(el.id)}
                className={`style ${
                  choosedImages.includes(el.id) ? "choosed" : ""
                }`}
              >
                <div
                  className={`styleCircle ${
                    choosedImages.includes(el.id) ? "choosed" : ""
                  }`}
                ></div>
                <p className="styleTitle">{el.title}</p>
                <div className="styleImgs">
                  <img src={el.img1} alt="" />
                  <img src={el.img2} alt="" />
                </div>
              </div>
            ))}
          </div>
          <button className="btn sm useForm-button" onClick={submitForm}>
            Готово
          </button>
        </div>
      )}
    </React.Fragment>
  );
}

export default UserForm;

function NumberInput(
  title: string,
  postfix: string,
  key: userNumberKeys,
  defaultValue?: string
): NumberInputType {
  const [value, changeValue] = useState(
    (defaultValue !== "0" && defaultValue) || ""
  );

  return {
    element: (
      <div key={title} className="numberInput inputContainer">
        <span className="numberInput-title">{title}</span>
        <div className="numberInput-container">
          <input
            type="number"
            value={value}
            onChange={(e) => changeValue(e.target.value)}
          />
          <span>{postfix}</span>
        </div>
      </div>
    ),
    value: value,
    key,
  };
}

function StringInput(
  title: string,
  key: userStringKeys,
  defaultValue?: string
): StringInputType {
  const [value, changeValue] = useState<string>(defaultValue || "");
  return {
    element: (
      <div className="stringInputContainer">
        <span className="string-title">{title}</span>
        <input
          value={value}
          className="stringInput"
          onChange={(e) => changeValue(e.target.value)}
        />
      </div>
    ),
    value: value,
    key,
  };
}
