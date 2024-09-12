'use client';

import { Search } from 'lucide-react';
import React, {useEffect, useRef, useState} from 'react';
import {useClickAway, useDebounce} from "react-use";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Api } from "@/services/api-clients";
import { Product } from "@prisma/client";

export const SearchInput = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [focused, setFocused] = useState(false);
    const [products, setProducts] = useState<Product[]>([]);
    const ref = useRef<HTMLDivElement>(null);

    useClickAway(ref, () => {
        setFocused(false);
    });


    useDebounce(()=> {
        Api.products.search(searchQuery).then(items => {
            setProducts(items);
        }).catch(err => {
            console.log(err)
        });
    },200,[searchQuery])


    const onClickItem = () => {
        setFocused(false);
        setSearchQuery('');
        setProducts([]);
    }

    return (
        <>
            {focused && <div className="fixed top-0 left-0  bottom-0 right-0 bg-black/50 z-30"/>}
            <div ref={ref} className="flex rounded-2xl flex-1 justify-between relative h-11 z-30">
                <Search className="absolute top-1/2 translate-y-[-50%] left-3 h-5 text-gray-400" />
                <input
                    className="rounded-2xl outline-none w-full bg-gray-100 pl-11"
                    type="text"
                    placeholder="Найти пиццу..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => setFocused(true)}
                />
                {
                    products.length && (
                        <div
                            className={cn('absolute w-full bg-white rounded-xl py-2 top-14 shadow-md transition-all duration-200 invisible opacity-0 z-30', focused && 'visible opacity-100 top-12')}>
                            {
                                products.map(product => {
                                    return (
                                        <Link href={`/product/1${product.id}`} key={product.id}
                                              className="flex items-center gap-3 w-full px-3 py-2 hover:bg-primary/10 cursor-pointer" onClick={onClickItem}>
                                            <img className="rounded-sm" src={product.imageUrl} width={32} height={32}
                                                 alt={product.name}/>
                                            <span>
                                            {product.name}
                                        </span>
                                    </Link>
                                    )
                                })
                            }
                        </div>
                    )
                }
            </div>
        </>
    );
};
