import React, { useState } from 'react'
import { CategoryPageInfo } from '../../redux/types';
import noPhotoIcon from "../../imgs/no-photo.svg";
import LookModal from "../LookModal/LookModal";

import './LookCategoryPage.css'


  

export default function LookCategoryPage({ page }: { page: CategoryPageInfo }) {
    const [lookId, changeLookId] = useState<string>('');
    return (
      <>
        {lookId ? (
          <LookModal
            id={lookId}
            closeEvent={() => changeLookId('')}
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
                onClick={() => changeLookId(look.id)}
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