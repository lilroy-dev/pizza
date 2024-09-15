"use client"
import {useRouter, useSearchParams} from "next/navigation";
import {useState} from "react";
import {useSet} from "react-use";

export interface PriceProps {
    priceFrom?: number,
    priceTo?: number,
}

export interface QueryFilters extends PriceProps{
    pizzaTypes: string,
    sizes: string,
    ingredients: string,
}

export interface Filters {
    pizzaTypes: Set<string>,
    sizes: Set<string>,
    selectedIngredients: Set<string>,
    prices: Set<string>,
}

export interface ReturnProps extends Filters {
    setPrices:(name:keyof PriceProps, value:number) => void;
    setPizzaTypes:(value:string) => void;
    setSizes:(value:string) => void;
    setIngredients:(value:string) => void;
}

export const useFilters = ():{
    setSizes: (key: string) => void;
    sizes: Set<string>;
    selectedIngredients: Set<string>;
    setIngredients: (key: string) => void;
    pizzaTypes: Set<string>;
    prices: PriceProps;
    setPrice: (name: keyof PriceProps, value: number) => void;
    setPizzaTypes: (key: string) => void;
    setPrices(name: keyof PriceProps, value: number): void
} => {
    const router = useRouter();
    const searchParams = useSearchParams() as unknown as Map<keyof QueryFilters, string>;

    // Фильтр ингридиентов
    const [selectedIngredients, {  toggle:toggleIngredients }] = useSet(new Set<string>(searchParams.get("ingredients")?.split(',')));

    // Фильтр цен
    const [prices, setPrice] = useState<PriceProps>({
        priceFrom: Number(searchParams.get('priceFrom')) || undefined,
        priceTo: Number(searchParams.get('priceTo')) || undefined,
    })

    // Фильтр размеров
    const [sizes, {toggle:toggleSizes}] = useSet(new Set<string>(searchParams.has('sizes') ? searchParams.get('sizes')?.split(','): []));

    // Фильтр пиццы
    const [pizzaTypes, {toggle:togglePizzaTypes}] = useSet(new Set<string>(searchParams.has('pizzaTypes') ? searchParams.get('pizzaTypes')?.split(','): []));

    const updatePrice = (name: keyof PriceProps, value: number) => {
        setPrice(prevPrices => {
            return {
                ...prevPrices,
                [name]: value
            }
        })
    }

    return {
        setPrices(name: keyof PriceProps, value: number): void {
        },
        sizes,
        pizzaTypes,
        selectedIngredients,
        prices,
        setPrice: updatePrice,
        setPizzaTypes: togglePizzaTypes,
        setSizes: toggleSizes,
        setIngredients: toggleIngredients
    }
};

