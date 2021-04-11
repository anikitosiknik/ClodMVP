import React, { useState } from 'react'
import { CategoryPageInfo, Look } from '../../redux/types';
import { LookModal } from '../LookPage/LookModal';
import noPhotoIcon from "../../imgs/no-photo.svg";

import './LookCategoryPage.css'

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
  
  

export default function LookCategoryPage({ page }: { page: CategoryPageInfo }) {
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
        <div className="look-category-page">
          {page.looks
            .sort((lookOne, lookTwo) =>
              new Date(lookOne.createdTime || "") >
              new Date(lookTwo.createdTime || "")
                ? 1
                : -1
            )
            .map((look) => (
              <div
                onClick={() => changeLookModal(look)}
                className="look-category-page__item"
                key={look.id}
              >
                <img className="look-category-page__img" src={look.img || noPhotoIcon}></img>
              </div>
            ))}
        </div>
      </>
    );
  }