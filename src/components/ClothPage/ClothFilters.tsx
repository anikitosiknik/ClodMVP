import React, { useState } from "react";
import "./ClothPage.css";
import PropTypes, { InferProps } from "prop-types";
import filterIcon from "../../imgs/filterIcon.svg";
import filterIconChoosed from "../../imgs/filterIconChoosed.svg";
import { CLOTH_TYPES } from "../../utils/const";

function ClothFilters({
  createCloth,
  changeFilter,
  filterCloth,
}: InferProps<typeof ClothFilters.propTypes>) {
  const [isFilterShowed, changeFilterShowed] = useState(false);

  return (
    <div className={`clothFiltres ${isFilterShowed ? "showed" : ""}`}>
      <img
        src={isFilterShowed || filterCloth ? filterIconChoosed : filterIcon}
        alt=""
        onClick={() => changeFilterShowed(!isFilterShowed)}
      />
      {!isFilterShowed ? (
        <>
          <p className="addClothText">
            Добавьте фотографии <br /> Вашей одежды
          </p>
          <div className="clothFiltresPlus" onClick={createCloth}>
            +
          </div>
        </>
      ) : (
        <div className="inputContainer filteresList">
          {CLOTH_TYPES.map((type) => {
            return (
              <div
                className={`filteresItem ${
                  filterCloth === type.value ? "choosed" : ""
                }`}
                onClick={() =>
                  changeFilter(filterCloth === type.value ? "" : type.value)
                }
                key={type.value}
              >
                {type.title}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

ClothFilters.propTypes = {
  createCloth: PropTypes.func.isRequired,
  changeFilter: PropTypes.func.isRequired,
  filterCloth: PropTypes.string.isRequired,
};

export default ClothFilters;
