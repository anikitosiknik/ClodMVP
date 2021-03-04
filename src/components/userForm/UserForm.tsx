import React, { useState } from "react";
import "./NumberInput.css";
import "./FormInput.css";
import "./DesktopFormInput.css";
import ColorInput from "../colorInput/ColorInput";
import { HAIR_COLORS, EYES_COLORS, SKIN_COLORS } from "../../utils/const";
import { useDispatch, useSelector } from "react-redux";
import {
  RootState,
  userNumberKeys,
  userState,
  userStringKeys,
} from "../../redux/types";
import { fetchSetUserInfo } from "../../redux/reducers/user";
import Header from "../header/Header";

import buisnes1 from "../../imgs/style/buisnes1.png";
import buisnes2 from "../../imgs/style/buisnes2.png";
import casual1 from "../../imgs/style/casual1.png";
import casual2 from "../../imgs/style/casual2.png";
import sport1 from "../../imgs/style/sport1.png";
import sport2 from "../../imgs/style/sport2.png";
import glamour1 from "../../imgs/style/glamour1.png";
import glamour2 from "../../imgs/style/glamour2.png";
import grange1 from "../../imgs/style/grange1.png";
import grange2 from "../../imgs/style/grange2.png";
import romantic1 from "../../imgs/style/romantic1.png";
import romantic2 from "../../imgs/style/romantic2.png";
import minimalism1 from "../../imgs/style/minimalism1.png";
import minimalism2 from "../../imgs/style/minimalism2.png";
import military1 from "../../imgs/style/military1.png";
import military2 from "../../imgs/style/military2.png";
import eclectick1 from "../../imgs/style/eclectick1.png";
import eclectick2 from "../../imgs/style/eclectick2.png";


const styles = [
  {
    id: 1,
    title: "Деловой стиль",
    img1: buisnes1,
    img2: buisnes2,
  },
  {
    id: 2,
    title: "Кэжуал (casual)",
    img1:casual1,
    img2: casual2,
  },
  {
    id: 3,
    title: "Спортивный стиль",
    img1: sport1,
    img2: sport2,
  },
  {
    id: 4,
    title: "Гламур",
    img1: glamour1,
    img2: glamour2,
  },
  {
    id: 5,
    title: "Гранж",
    img1: grange1,
    img2: grange2,
  },
  {
    id: 6,
    title: "Романтический стиль",
    img1: romantic1,
    img2: romantic2,
  },
  {
    id: 7,
    title: "Минимализм",
    img1: minimalism1,
    img2: minimalism2,
  },
  {
    id: 8,
    title: "Милитари",
    img1: military1,
    img2: military2,
  },
  {
    id: 9,
    title: "Эклектика",
    img1: eclectick1,
    img2: eclectick2,
  },
];

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
    user.choosedImages.split(",").map((el) => Number(el))
  );

  const numbersInput = [
    NumberInput("Обхват груди", "см", "chest", user.chest.toString()),
    NumberInput("Обхват талии", "см", "waist", user.waist.toString()),
    NumberInput("Обхват бедер", "см", "hips", user.hips.toString()),
    NumberInput("Рост", "см", "height", user.height.toString()),
    NumberInput("Возраст", "лет", "age", user.age.toString()),
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
            {styles.map((el) => (
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
