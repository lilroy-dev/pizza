'use client';

import React, {useEffect} from 'react';
import { useSet } from 'react-use';

import { FilterCheckbox, FilterCheckboxProps } from './filter-checkbox';
import { Input } from '../ui/input';
import {Skeleton} from "@/components/ui";

type Item = FilterCheckboxProps;

interface Props {
    title: string;
    items: Item[];
    defaultItems?: Item[];
    limit?: number;
    loading?: boolean,
    searchInputPlaceholder?: string;
    className?: string;
    selectedIds: Set<string>;
    onClickCheckBox: (id: string) => void;
    defaultValue?: string[];
    name?: string;
}

export const CheckboxFiltersGroup: React.FC<Props> = (
    {
      title,
      items,
      defaultItems,
      limit = 5,
      searchInputPlaceholder = 'Поиск...',
      className,
      onClickCheckBox,
      defaultValue,
      loading,
      selectedIds,
        name,
    }
  ) => {
    const [showAll, setShowAll] = React.useState(false);
    const [searchValue, setSearchValue] = React.useState('');

    const onChangeSearchInput = (value:string) => {
        setSearchValue(value);
    }



    if (loading) {
        return (
            <div className={className}>
                <p className="font-bold mb-3">{title}</p>
                {
                    Array(limit - 1)
                        .fill('_')
                        .map((_, i) => (
                            <Skeleton key={i} className="h-6 mb-4 rounded-[8px]"/>
                        ))
                }
            </div>
        )
    }

    const list = showAll
        ? items.filter(item => item.text.toLowerCase().includes(searchValue.toLowerCase()))
        : (defaultItems || items)?.slice(0, limit);



    return (
        <div className={className}>
            <p className="font-bold mb-3">{title}</p>

            {showAll && (
                <div className="mb-5">
                    <Input onChange={(e)=> onChangeSearchInput(e.target.value)} placeholder={searchInputPlaceholder} className="bg-gray-50 border-none" />
                </div>
            )}

            <div className="flex flex-col gap-4 max-h-96 pr-2 overflow-auto scrollbar">
                {list?.map((item) => (
                    <FilterCheckbox
                        onCheckedChange={() => onClickCheckBox(item.value)}
                        checked={selectedIds.has(item.value)}
                        key={String(item.value)}
                        value={item.value}
                        text={item.text}
                        endAdornment={item.endAdornment}
                        name={name}
                    />
                ))}
            </div>

            {items.length > limit && (
                <div className={showAll ? 'border-t border-t-neutral-100 mt-4' : ''}>
                    <button onClick={() => setShowAll(!showAll)} className="text-primary mt-3">
                        {showAll ? 'Скрыть' : '+ Показать все'}
                    </button>
                </div>
            )}
        </div>
    );
};
