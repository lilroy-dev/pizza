"use client"
import React, {useEffect, useMemo, useState} from 'react';
import { RangeSlider, CheckboxFiltersGroup, Title } from "@/components/shared";
import { Input } from "@/components/ui";
import { useFilterIngredients } from "@/hooks/useFilterIngredients";
import { useSet } from "react-use";
import qs from 'qs';
import { useRouter, useSearchParams } from "next/navigation";


interface Props {
    className?: string;
}

interface PriceProps {
    priceFrom?: number,
    priceTo?: number,
}

interface QueryFilters extends PriceProps{
    pizzaTypes: string,
    sizes: string,
    ingredients: string,
}


export const Filters:React.FC<Props> = ({ className }) => {


    const searchParams = useSearchParams() as unknown as Map<keyof QueryFilters, string>;

    const router = useRouter();
    const { ingredients,loading, onAddId, selectedIds } = useFilterIngredients(
        searchParams.get('ingredients')?.split(',')
    );
    const [prices, setPrice] = useState<PriceProps>({
        priceFrom: Number(searchParams.get('priceFrom')) || undefined,
        priceTo: Number(searchParams.get('priceTo')) || undefined,
    })
    const [sizes, {toggle:toggleSizes}] = useSet(new Set<string>(searchParams.has('sizes') ? searchParams.get('sizes')?.split(','): []));
    const [pizzaTypes, {toggle:togglePizzaTypes}] = useSet(new Set<string>(searchParams.has('pizzaTypes') ? searchParams.get('pizzaTypes')?.split(','): []));


    const items = useMemo(() =>
            ingredients.map((item) => ({
                value: String(item.id),
                text: item.name
            }))
        , [ingredients]);

    const updatePrice = (name: keyof PriceProps, value: number) => {
        setPrice({
            ...prices,
            [name]: value
        })
    }



    useEffect(() => {
        const filters = {
            ...prices,
            pizzaTypes: Array.from(pizzaTypes),
            sizes: Array.from(sizes),
            ingredients: Array.from(selectedIds),
        }
        const query = qs.stringify(filters, {
            arrayFormat: 'comma',
        })

        router.push(`?${query}`, {
            scroll: false,
        })
    },[prices, pizzaTypes,sizes, ingredients, selectedIds, router])


    console.log(searchParams)

    return (
        <div className={className}>
            <Title text="Фильтрация" size="sm" className="mb-5 font-bold"/>

            <CheckboxFiltersGroup
                title="Тип теста"
                name="pizzaTypes"
                className="mb-5"
                onClickCheckBox={togglePizzaTypes}
                selectedIds={pizzaTypes}
                items={
                    [
                        {text: 'Тонкое', value: '1'},
                        {text: 'Традиционное', value: '2'},
                    ]
                }
            />


            <CheckboxFiltersGroup
                name="sizes"
                className="mb-5"
                title="Размеры"
                onClickCheckBox={toggleSizes}
                selectedIds={sizes}
                items={
                    [
                        {text: '20 см', value: '20'},
                        {text: '30 см', value: '30'},
                        {text: '40 см', value: '40'},
                    ]
                }
            />
            <div className="mt-5 border-y border-y-neutral-100 py-6 pb-7">
                <p className="font-bold mb-3">Цена от и до:</p>
                <div className="flex gap-3 mb-5">
                    <Input type="number"
                           placeholder="0"
                           min={0}
                           max={1000}
                           value={String(prices.priceFrom || '0')}
                           onChange={(e) => updatePrice('priceFrom', Number(e.target.value))}
                    />
                    <Input
                        type="number"
                        min={100}
                        max={100}
                        placeholder="100"
                        value={String(prices.priceTo || '1000')}
                        onChange={(e) => updatePrice('priceTo', Number(e.target.value))}
                    />
                </div>
                <RangeSlider
                    min={0}
                    max={1000}
                    step={10}
                    value={[
                        prices.priceFrom || 0,
                        prices.priceTo || 1000,
                    ]}
                    onValueChange={([from, to]) => setPrice({priceFrom: from, priceTo: to})}
                />
            </div>

            <CheckboxFiltersGroup
                className="mt-5"
                title="Формат"
                name="ingredients"
                limit={6}
                defaultItems={items.slice(0,6)}
                items={items}
                loading={loading}
                onClickCheckBox={onAddId}
                selectedIds={selectedIds}
            />
        </div>
    );
};

