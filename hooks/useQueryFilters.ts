"use client"
import { useEffect } from "react";
import qs from "qs";
import { useRouter } from "next/navigation";
import {PriceProps} from "@/hooks/useFilters";

export const useQueryFilters = (filters: {
    setSizes: (key: string) => void;
    sizes: Set<string>;
    selectedIngredients: Set<string>;
    setIngredients: (key: string) => void;
    pizzaTypes: Set<string>;
    prices: PriceProps;
    setPrice: (name: keyof PriceProps, value: number) => void;
    setPizzaTypes: (key: string) => void;
    setPrices(name: keyof PriceProps, value: number): void
}) => {
    const router = useRouter();
    useEffect(() => {
        const params = {
            ...filters.prices,
            pizzaTypes: Array.from(filters.pizzaTypes),
            sizes: Array.from(filters.sizes),
            ingredients: Array.from(filters.selectedIngredients),
        }
        const query = qs.stringify(params, {
            arrayFormat: 'comma',
        })

        router.push(`?${query}`, {
            scroll: false,
        })
    },[filters.pizzaTypes, filters.sizes, filters.prices, filters.selectedIngredients, router]);
};

