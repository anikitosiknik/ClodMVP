import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  lookCategories,
  lookList,
  looksSorted,
  RootState,
} from "../../redux/types";
import { LOOKS_CATEGORIES } from "../../utils/const";
import { looksObjectToList } from "../../utils/lookService";
import Header from "../header/Header";
import "./LookPage.css";
import plus from "../../imgs/plus.svg";

function LookPage() {
  const looksState = useSelector((state: RootState) => state.look);
  const [looks, changeLooks] = useState<looksSorted>({
    all: [],
    favorite: [],
    date: [],
    sport: [],
    casual: [],
    beach: [],
  });
  useEffect(() => {
    const looksSorted: looksSorted = {
      all: [],
      favorite: [],
      date: [],
      sport: [],
      casual: [],
      beach: [],
    };
    looksObjectToList(looksState).forEach((look) => {
      looksSorted.all.push(look);
      if (look.favorite) looksSorted.favorite.push(look);
      if (look.category) looksSorted[look.category].push(look);
    });
    changeLooks(looksSorted);
  }, [looksState]);

  return (
    <>
      <Header />
      <div className="lookPage">
        {LOOKS_CATEGORIES.map((category) => (
          <LookCategory
            looks={looks[category.type]}
            key={category.type}
            category={category}
          />
        ))}
      </div>
    </>
  );
}

export default LookPage;

function LookCategory({
  category,
  looks,
}: {
  category: { title: string; type: lookCategories };
  looks: lookList;
}) {
  return (
    <div key={category.type} className="lookCategory">
      <div className="lookCategoryImgContainer">
        {looks.slice(0, 4).map((look) => (
          <div className="lookCategoryCloth" key={look.id}>
            <img src={look.img || plus} />
          </div>
        ))}
      </div>
      <h2>{category.title}</h2>
    </div>
  );
}
