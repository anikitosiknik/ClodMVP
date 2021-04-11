import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  CategoryPageInfo,
  looksSorted,
  RootState,
} from "../../redux/types";
import { LOOKS_CATEGORIES } from "../../utils/const";
import { looksObjectToList } from "../../utils/looksRequestService";
import Header from "../header/Header";
import "./LookPage.css";
import "./DesktopLookPage.css";
import backIcon from "../../imgs/backIcon.svg";
import LookCategoryItem from '../LookCategoryItem/LookCategoryItem';
import LookCategoryPage from "../LookCategoryPage/LookCategoryPage";



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
        <LookCategoryPage page={categoryPage} />
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
