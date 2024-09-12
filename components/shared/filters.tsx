"use client"
import React, {useMemo, useState} from 'react';
import { CheckboxFiltersGroup, FilterCheckbox, RangeSlider, Title } from "@/components/shared";
import { Input } from "@/components/ui";
import {useFilterIngredients} from "@/hooks/useFilterIngredients";
import {Nunito} from "next/font/google";
import {useSet} from "react-use";


interface Props {
    className?: string;
}

interface PriceProps {
    priceFrom: number,
    priceTo: number,
}

export const Filters:React.FC<Props> = ({ className }) => {
    const { ingredients,loading, onAddId, selectedIds } = useFilterIngredients();
    const [prices, setPrice] = useState<PriceProps>({priceFrom:0, priceTo:5000})
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

    const [sizes, {toggle:toggleSizes}] = useSet(new Set<string>([]));

    console.log('sizes', sizes)


    return (
        <div className={className}>
            <Title text="Фильтрация" size="sm" className="mb-5 font-bold"/>

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
                           value={String(prices.priceFrom)}
                           onChange={(e) => updatePrice('priceFrom', Number(e.target.value))}
                    />
                    <Input
                        type="number"
                        min={100}
                        max={100}
                        placeholder="100"
                        value={String(prices.priceTo)}
                        onChange={(e) => updatePrice('priceTo', Number(e.target.value))}
                    />
                </div>
                <RangeSlider
                    min={0}
                    max={1000}
                    step={10}
                    value={[
                        prices.priceFrom,
                        prices.priceTo,
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

