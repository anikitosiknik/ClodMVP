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
    {hex: '#ffffff', name: 'white'}, 
    {hex: '#81634e', name: 'brown'},
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