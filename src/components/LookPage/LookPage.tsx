import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  CategoryPageInfo,
  Look,
  looksSorted,
  RootState,
} from "../../redux/types";
import { LOOKS_CATEGORIES } from "../../utils/const";
import { looksObjectToList } from "../../utils/looksRequestService";
import Header from "../header/Header";
import "./LookPage.css";
import "./DesktopLookPage.css";
import noPhotoIcon from "../../imgs/no-photo.svg";
import backIcon from "../../imgs/backIcon.svg";
import { LookModal } from "./LookModal";
import LookCategoryItem from '../LookCategoryItem/LookCategoryItem';



export default function LookPage() {
  const looksState = useSelector((state: RootState) => state.look);
  const [categoryPage, changeCategoryPage] = useState<CategoryPageInfo>({
    title: "",
    looks: [],
    type: "all",
  });
  const [looks, changeLooks] = useState<looksSorted>({
    all: [],
    favorite: [],
    date: [],
    sport: [],
    casual: [],
    beach: [],
    notready: [],
  });
  useEffect(() => {
    const looksSorted: looksSorted = {
      all: [],
      favorite: [],
      date: [],
      sport: [],
      casual: [],
      beach: [],
      notready: [],
    };
    looksObjectToList(looksState).forEach((look) => {
      if (!look.ready) return looksSorted.notready.push(look);
      looksSorted.all.push(look);
      if (look.favorite) looksSorted.favorite.push(look);
      if (look.category) looksSorted[look.category].push(look);
    });
    changeLooks(looksSorted);
    if (categoryPage.title)
      changeCategoryPage({
        title: categoryPage.title,
        looks: looksSorted[categoryPage.type],
        type: categoryPage.type,
      });
  }, [looksState]);

  return (
    <>
      <Header
        additionalElement={
          categoryPage.title ? (
            <img
              className="backButton"
              src={backIcon}
              onClick={() =>
                changeCategoryPage({ title: "", looks: [], type: "all" })
              }
            />
          ) : null
        }
      />
      {categoryPage.title ? (
        <CategoryPage page={categoryPage} />
      ) : (
        <div className="lookPage">
          {LOOKS_CATEGORIES.map((category) => (
            <LookCategoryItem
              openCategory={changeCategoryPage}
              looks={looks[category.type]}
              key={category.type}
              category={category}
            />
          ))}
        </div>
      )}
    </>
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

function CategoryPage({ page }: { page: CategoryPageInfo }) {
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
              className="categoryPageLook"
              key={look.id}
            >
              <img src={look.img || noPhotoIcon}></img>
            </div>
          ))}
      </div>
    </>
  );
}
