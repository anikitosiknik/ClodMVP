import { lookCategories } from "../redux/types"

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

export const LOOKS_CATEGORIES: { title: string, type: lookCategories}[] = [
    {title: 'Все', type: 'all'},
    {title: 'Избранное', type: 'favorite'},
    {title: 'Вечерние', type: 'date'},
    {title: 'Повседневние', type: 'casual'},
    {title: 'Спортивные', type: 'sport'},
    {title: 'Пляжные', type: 'beach'},
    {title: 'В обработке', type: 'notready'},
]