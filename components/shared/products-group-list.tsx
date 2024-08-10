'use client'
import React, { useEffect } from 'react';
import { Title, ProductCard } from "@/components/shared";

import { useIntersection } from 'react-use';
import { useCategoryStore } from "@/store/category";

interface Props {
    title: string;
    items: any[];
    className?: string;
    categoryId:string;
}

export const ProductsGroupList: React.FC<Props> = ({ className, title, items, categoryId }) => {

    const setActiveCategoryId = useCategoryStore((state) => state.setActiveId);

    const intersectionRef = React.useRef(null);
    const intersection = useIntersection(intersectionRef, {
        threshold: 0.4,
    });


    useEffect(() => {
        if (intersection?.isIntersecting) {
            setActiveCategoryId(categoryId)
        }
    },[intersection?.isIntersecting])

    return (
        <section className={className} id={title} ref={intersectionRef}>
            <Title text={title} size="lg" className="font-extrabold mb-5"/>
            <div className="grid grid-cols-3 gap-[50px]">
                {items.map((product, i) => (
                    <ProductCard
                        key={product.id}
                        id={product.id}
                        name={product.name}
                        imageUrl={product.imageUrl}
                        price={product.items[0].price}
                        count={i % 2}
                     />
                ))}
            </div>
        </section>
    );
};
