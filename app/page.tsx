import { Container, Filters, ProductCard, ProductsGroupList, Title, TopBar } from "@/components/shared";

export default function Home() {
    return (
        <>
            <Container className="mt-10">
                <Title text="Все пиццы" size="lg" className="font-extrabold"/>
            </Container>
            <TopBar/>
            <Container className="pb-14 mt-10">
                <div className="flex gap-[60px]">
                    <div className="w-[250px]">
                       <Filters/>
                    </div>
                    <div className="flex-1">
                        <div className="flex flex-col gap-16">
                            <ProductsGroupList
                                title="Пиццы"
                                categoryId={'1'}
                                items={
                                    [
                                        {
                                            id: 1,
                                            name: 'Сырная 🌱👶 ',
                                            imageUrl: "https://media.dodostatic.net/image/r:292x292/11EE7D610D2925109AB2E1C92CC5383C.jpg",
                                            price: 500,
                                            items: [{ price: 500 }]
                                        },
                                        {
                                            id: 2,
                                            name: 'Мясная с аджикой 🌶🌶 ',
                                            imageUrl: "https://media.dodostatic.net/image/r:292x292/11EF438E93884BFEBFE79D11095AE2D4.jpg",
                                            price: 400,
                                            items: [{ price: 400 },{ price: 500 }, { price: 600 }]
                                        },
                                        {
                                            id: 3,
                                            name: 'Маргарита 🌱 ',
                                            imageUrl: "https://media.dodostatic.net/image/r:292x292/11EE7D6105EF6690B86FBDE6150B5B0C.jpg",
                                            price: 500,
                                            items: [{ price: 500 }]
                                        },
                                        {
                                            id: 4,
                                            name: 'Соберите свою пиццу',
                                            imageUrl: "https://media.dodostatic.net/image/r:292x292/11EE7D616B6EAC0D9D1151039F788394.jpg",
                                            price: 500,
                                            items: [{ price: 500 }]
                                        },
                                        {
                                            id: 5,
                                            name: 'Ветчина и грибы',
                                            imageUrl: "https://media.dodostatic.net/image/r:292x292/11EE7D611F924987957B7F53424B682F.jpg",
                                            price: 660,
                                            items: [{ price: 660 }]
                                        },
                                        {
                                            id: 6,
                                            name: 'Додо',
                                            imageUrl: "https://media.dodostatic.net/image/r:292x292/11EE7D6101F670D6AA756B1C989E0489.jpg",
                                            price: 600,
                                            items: [{ price: 600 }]
                                        }
                                    ]
                                }
                            />
                            <ProductsGroupList
                                title="Комбо"
                                categoryId={'2'}
                                items={
                                    [
                                        {
                                            id: 1,
                                            name: 'Сырная 🌱👶 ',
                                            imageUrl: "https://media.dodostatic.net/image/r:292x292/11EE7D610D2925109AB2E1C92CC5383C.jpg",
                                            price: 500,
                                            items: [{ price: 500 }]
                                        },
                                        {
                                            id: 2,
                                            name: 'Мясная с аджикой 🌶🌶 ',
                                            imageUrl: "https://media.dodostatic.net/image/r:292x292/11EF438E93884BFEBFE79D11095AE2D4.jpg",
                                            price: 400,
                                            items: [{ price: 400 },{ price: 500 }, { price: 600 }]
                                        },
                                        {
                                            id: 3,
                                            name: 'Маргарита 🌱 ',
                                            imageUrl: "https://media.dodostatic.net/image/r:292x292/11EE7D6105EF6690B86FBDE6150B5B0C.jpg",
                                            price: 500,
                                            items: [{ price: 500 }]
                                        },
                                        {
                                            id: 4,
                                            name: 'Соберите свою пиццу',
                                            imageUrl: "https://media.dodostatic.net/image/r:292x292/11EE7D616B6EAC0D9D1151039F788394.jpg",
                                            price: 500,
                                            items: [{ price: 500 }]
                                        },
                                        {
                                            id: 5,
                                            name: 'Ветчина и грибы',
                                            imageUrl: "https://media.dodostatic.net/image/r:292x292/11EE7D611F924987957B7F53424B682F.jpg",
                                            price: 660,
                                            items: [{ price: 660 }]
                                        },
                                        {
                                            id: 6,
                                            name: 'Додо',
                                            imageUrl: "https://media.dodostatic.net/image/r:292x292/11EE7D6101F670D6AA756B1C989E0489.jpg",
                                            price: 600,
                                            items: [{ price: 600 }]
                                        }
                                    ]
                                }
                            />
                        </div>
                    </div>

                </div>
            </Container>
        </>
    );
}
