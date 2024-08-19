import { prisma } from "./prisma-client";
import { hashSync } from "bcrypt";
import { categories, ingredients, products } from "./constants";



const randomNumber = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min) + min);
};




async function up() {
    await prisma.user.createMany({
        data: [
            {
                fullName: "John",
                email: "john@example.com",
                password: hashSync('11111', 10),
                verified: new Date(),
                role: "USER",
            },
            {
                fullName: "Administrator",
                email: "admin@ya.com",
                password: hashSync('11111', 10),
                verified: new Date(),
                role: "ADMIN",
            }
        ]
    })

    await prisma.category.createMany({
        data : categories
    })

    await prisma.ingredient.createMany({
        data : ingredients
    })

    await prisma.product.createMany({
        data : products
    })


    const pizza1 = await prisma.product.create(
        {
            data :{
                name: 'Пепперони фреш',
                imageUrl:
                    'https://media.dodostatic.net/image/r:233x233/11EE7D61304FAF5A98A6958F2BB2D260.webp',
                categoryId: 1,
                ingredients: {
                    connect: ingredients.slice(0,5),
                }
            },
        }
    );

    const pizza2 = await prisma.product.create(
        {
            data :{
                name: 'Сырная',
                imageUrl:
                    'https://media.dodostatic.net/image/r:233x233/11EE7D610CF7E265B7C72BE5AE757CA7.webp',
                categoryId: 1,
                ingredients: {
                    connect: ingredients.slice(5,7),
                }
            },
        }
    );
    const pizza3 = await prisma.product.create(
        {
            data :{
                name: 'Чоризо фреш',
                imageUrl:
                    'https://media.dodostatic.net/image/r:233x233/11EE7D610CF7E265B7C72BE5AE757CA7.webp',
                categoryId: 1,
                ingredients: {
                    connect: ingredients.slice(10,14),
                }
            },
        }
    );


    await prisma.productItem.createMany({
        data : [
            {
                productId: pizza1.id,
                pizzaType : 1,
                size : 20,
                price: randomNumber(200, 600),
            },
            {
                productId: pizza1.id,
                pizzaType : 2,
                size : 30,
                price: randomNumber(200, 600),
            },
            {
                productId: pizza1.id,
                pizzaType : 3,
                size : 40,
                price: randomNumber(200, 600),
            },
            {
                productId: pizza2.id,
                pizzaType : 1,
                size : 20,
                price: randomNumber(200, 600),
            },
            {
                productId: pizza2.id,
                pizzaType : 2,
                size : 30,
                price: randomNumber(200, 600),
            },
            {
                productId: pizza2.id,
                pizzaType : 3,
                size : 40,
                price: randomNumber(200, 600),
            },
            {
                productId: pizza3.id,
                pizzaType : 1,
                size : 20,
                price: randomNumber(200, 600),
            },
            {
                productId: pizza3.id,
                pizzaType : 2,
                size : 30,
                price: randomNumber(200, 600),
            },
            {
                productId: pizza3.id,
                pizzaType : 3,
                size : 40,
                price: randomNumber(200, 600),
            },
        ]
    })

    await prisma.cart.createMany({
        data:[
            {
                userId:1,
                totalAmount: 0,
                token: '121'
            },
            {
                userId:2,
                totalAmount: 0,
                token: '222'
            },
        ]
    })

    await prisma.cartItem.create({
        data: {
            productItemId:1,
            cartId:1,
            quantity: 2,
            ingredients:{
                connect: [{id:1}, {id:2}, {id:3}, {id:4}],
            }
        }
    })
}

async function down() {
    await prisma.$executeRaw`TRUNCATE TABLE "User" RESTART IDENTITY CASCADE;`;
    await prisma.$executeRaw`TRUNCATE TABLE "Ingredient" RESTART IDENTITY CASCADE;`;
    await prisma.$executeRaw`TRUNCATE TABLE "Category" RESTART IDENTITY CASCADE;`;
    await prisma.$executeRaw`TRUNCATE TABLE "Product" RESTART IDENTITY CASCADE;`;
    await prisma.$executeRaw`TRUNCATE TABLE "Order" RESTART IDENTITY CASCADE;`;
    // await prisma.$executeRaw`TRUNCATE TABLE "Pizza" RESTART IDENTITY CASCADE;`;
    await prisma.$executeRaw`TRUNCATE TABLE "VerificationCode" RESTART IDENTITY CASCADE;`;
    await prisma.$executeRaw`TRUNCATE TABLE "Cart" RESTART IDENTITY CASCADE;`;
    await prisma.$executeRaw`TRUNCATE TABLE "CartItem" RESTART IDENTITY CASCADE;`;
}


async function main() {
    try {
        await down();
        await up();
    } catch (e) {
        console.log(e)
    }
}

main().then( async () => {
    await prisma.$disconnect();
}).catch( async (e) => {
    console.log(e)
})
