export const categories = [
    {
        name : 'Пиццы'
    },
    {
        name : 'Завтрак'
    },
    {
        name : 'Закуски'
    },
    {
        name : 'Коктейли'
    },
    {
        name : 'Напитки'
    },
]


export const ingredients = [
    {
        name : 'Сырный бортик',
        price: 91,
        imageUrl: 'https://cdn.dodostatic.net/static/Img/Ingredients/99f5cb91225b4875bd06a26d2e842106.png',
    },
    {
        name : 'Острый перец халапеньо',
        price: 51,
        imageUrl: 'https://cdn.dodostatic.net/static/Img/Ingredients/11ee95b6bfdf98fb88a113db92d7b3df.png',
    },
    {
        name : 'Сливочная моцарелла',
        price: 43,
        imageUrl: 'https://cdn.dodostatic.net/static/Img/Ingredients/cdea869ef287426386ed634e6099a5ba.png',
    },
    {
        name : 'Итальянские травы',
        price: 38,
        imageUrl: 'https://cdn.dodostatic.net/static/Img/Ingredients/370dac9ed21e4bffaf9bc2618d258734.png',
    },
    {
        name : 'Красный лук',
        price: 77,
        imageUrl: 'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A22FA54A81411E9AFA60AE6464C',
    },
].map((obj, index) => ({id: index + 1, ...obj}))


export const products = [
    {
        name: 'Омлет с беконом',
        imageUrl:
            'https://media.dodostatic.net/image/r:292x292/11EE7970326512C89366583FF997CA9E.jpg',
        categoryId: 2,
    },
    {
        name: 'Омлет сырный',
        imageUrl:
            'https://media.dodostatic.net/image/r:292x292/11EE797033873EB1B4B77F7E70BBA37E.jpg',
        categoryId: 2,
    },
    {
        name: 'Чоризо фреш',
        imageUrl:
            'https://media.dodostatic.net/image/r:584x584/11EE7D61706D472F9A5D71EB94149304.webp',
        categoryId: 2,
    }, {
        name: 'Додстер с ветчиной',
        imageUrl:
            'https://media.dodostatic.net/image/r:292x292/11EE7970259D888E98B6407EE6B994D9.jpg',
        categoryId: 2,
    }, {
        name: 'Сырники со сгущенным молоком',
        imageUrl:
            'https://media.dodostatic.net/image/r:292x292/11EE7D61877A2EE09AA2178718EFB59C.jpg',
        categoryId: 2,
    },
    {
        name: 'Дэнвич ветчина и сыр',
        imageUrl:
            'https://media.dodostatic.net/image/r:292x292/11EE796FF0059B799A17F57A9E64C725.jpg',
        categoryId: 3,
    },{
        name: 'Дэнвич чоризо барбекю',
        imageUrl:
            'https://media.dodostatic.net/image/r:292x292/11EE796FF041FE1F94C903576DCFD01E.jpg',
        categoryId: 3,
    },
]
