import React from "react";
import { CategoryPageInfo, lookCategories, lookList } from "../../redux/types";
import noPhotoIcon from "../../imgs/no-photo.svg";

import "./LookCategoryItem.css";

export default function LookCategoryItem({
  category,
  looks,
  openCategory,
}: {
  category: { title: string; type: lookCategories };
  looks: lookList;
  openCategory: (page: CategoryPageInfo) => void;
}) {
  return (
    <div
      key={category.type}
      className="look-category-item"
      onClick={() =>
        openCategory({ title: category.title, looks, type: category.type })
      }
    >
      <div className="look-category-item__image-container">
        {looks.slice(0, 4).map((look) => (
          <div className={`look-category-item__cloth `} key={look.id}>
            <img
              className="look-category-item__image"
              src={look.img || noPhotoIcon}
            />
          </div>
        ))}
      </div>
      <h2 className="look-category-header">{category.title}</h2>
    </div>
  );
}
