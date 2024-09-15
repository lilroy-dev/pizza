"use client"
import React, {useMemo} from 'react';
import { RangeSlider, CheckboxFiltersGroup, Title } from "@/components/shared";
import { Input } from "@/components/ui";
import {useIngredients} from "@/hooks/useIngredients";
import {useFilters} from "@/hooks/useFilters";
import {useRouter} from "next/navigation";
import {useQueryFilters} from "@/hooks/useQueryFilters";


interface Props {
    className?: string;
}

export const Filters:React.FC<Props> = ({ className }) => {

    const router = useRouter();
    const { ingredients, loading} = useIngredients();
    const filters = useFilters();
    useQueryFilters(filters)

    const items = useMemo(() =>
            ingredients.map((item) => ({
                value: String(item.id),
                text: item.name
            }))
    , [ingredients]);


    const updatePrices = (prices:number[]) => {
        filters.setPrice('priceTo', prices[1]);
        filters.setPrice('priceFrom', prices[0]);
    }

    return (
        <div className={className}>
            <Title text="Фильтрация" size="sm" className="mb-5 font-bold"/>

            <CheckboxFiltersGroup
                title="Тип теста"
                name="pizzaTypes"
                className="mb-5"
                onClickCheckBox={filters.setPizzaTypes}
                selectedIds={filters.pizzaTypes}
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
                onClickCheckBox={filters.setSizes}
                selectedIds={filters.sizes}
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
                           value={String(filters.prices.priceFrom || '0')}
                           onChange={(e) =>  filters.setPrice('priceFrom', Number(e.target.value))}
                    />
                    <Input
                        type="number"
                        min={100}
                        max={100}
                        placeholder="100"
                        value={String(filters.prices.priceTo || '1000')}
                        onChange={(e) => filters.setPrice('priceTo', Number(e.target.value))}
                    />
                </div>
                <RangeSlider
                    min={0}
                    max={1000}
                    step={10}
                    value={[
                        filters.prices.priceFrom || 0,
                        filters.prices.priceTo || 1000,
                    ]}
                    onValueChange={updatePrices}
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
                onClickCheckBox={filters.setIngredients}
                selectedIds={filters.selectedIngredients}
            />
        </div>
    );
};

