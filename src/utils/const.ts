import { lookCategories } from "../redux/types";

import buisnes1 from "../imgs/style/buisnes1.png";
import buisnes2 from "../imgs/style/buisnes2.png";
import casual1 from "../imgs/style/casual1.png";
import casual2 from "../imgs/style/casual2.png";
import sport1 from "../imgs/style/sport1.png";
import sport2 from "../imgs/style/sport2.png";
import glamour1 from "../imgs/style/glamour1.png";
import glamour2 from "../imgs/style/glamour2.png";
import grange1 from "../imgs/style/grange1.png";
import grange2 from "../imgs/style/grange2.png";
import romantic1 from "../imgs/style/romantic1.png";
import romantic2 from "../imgs/style/romantic2.png";
import minimalism1 from "../imgs/style/minimalism1.png";
import minimalism2 from "../imgs/style/minimalism2.png";
import military1 from "../imgs/style/military1.png";
import military2 from "../imgs/style/military2.png";
import eclectick1 from "../imgs/style/eclectick1.png";
import eclectick2 from "../imgs/style/eclectick2.png";


export const  STYLES = [
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

export  const HAIR_COLORS = [
    {hex: '#ffffff', name: 'white'}, 
    {hex: '#c4c4c4', name: 'gray'},
    {hex: '#f2e0be', name: 'beige'},
    {hex: '#f4f1a4', name: 'yellow'}, 
    {hex: '#f3c278', name: 'orange'},
    {hex: '#d86d6d', name: 'red'},
    {hex: '#f1c2de', name: 'pink'}, 
    {hex: '#b38cc0', name: 'purple'},
    {hex: '#7886b7', name: 'blue'},
    {hex: '#39b784', name: 'green'}, 
    {hex: '#81634e', name: 'brown'},
    {hex: '#404040', name: 'black'},
]

export  const EYES_COLORS = [
    {hex: '#c4c4c4', name: 'gray'},
    {hex: '#7886b7', name: 'blue'},
    {hex: '#39b784', name: 'green'}, 
    {hex: '#81634e', name: 'brown'},
]

export const SKIN_COLORS = [
    {hex: '#F8D5C2', name: '#F8D5C2'}, 
    {hex: '#EFBBA6', name: '#EFBBA6'}, 
    {hex: '#E6AA86', name: '#E6AA86'}, 
    {hex: '#D2946B', name: '#D2946B'}, 
    {hex: '#C78E63', name: '#C78E63'}, 
    {hex: '#AE7142', name: '#AE7142'}, 
    {hex: '#AB5D33', name: '#AB5D33'}, 
    {hex: '#845736', name: '#845736'}, 
    {hex: '#664B32', name: '#664B32'}, 
    {hex: '#4F3425', name: '#4F3425'}, 
]

export const CLOTH_TYPES = [
    {title: 'Куртка', value: 'jacket'},
    {title: 'Свитер', value: 'sweater'},
    {title: 'Юбка', value: 'skirt'},
    {title: 'Пальто', value: 'coat'},
    {title: 'Худи', value: 'hoodie'},
    {title: 'Рубашка', value: 'shirt'},
    {title: 'Жилет', value: 'vest'},
    {title: 'Футболка', value: 'tshirt'},
    {title: 'Обувь', value: 'footwer'},
    {title: 'Брюки', value: 'trousers'},
    {title: 'Поло', value: 'polo'},
    {title: 'Сумка', value: 'bag'},
    {title: 'Джинсы', value: 'jeans'},
    {title: 'Аксессуары', value: 'accessories'},
]

export const LOOKS_CATEGORIES_FOR_CHOOSE:  { title: string, type: lookCategories}[] = [
  {title: 'Вечерние', type: 'date'},
  {title: 'Повседневние', type: 'casual'},
  {title: 'Спортивные', type: 'sport'},
  {title: 'Пляжные', type: 'beach'},
]

export const LOOKS_CATEGORIES: { title: string, type: lookCategories}[] = [
    {title: 'Все', type: 'all'},
    {title: 'Избранное', type: 'favorite'},
    ...LOOKS_CATEGORIES_FOR_CHOOSE,
    {title: 'В обработке', type: 'notready'},
]


