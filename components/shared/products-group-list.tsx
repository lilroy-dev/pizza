import React from 'react';
import { Title, ProductCard } from "@/components/shared";

interface Props {
    title: string;
    items: any[];
    className?: string;
    categoryId?:string;
}

export const ProductsGroupList: React.FC<Props> = ({ className, title, items }) => {
    return (
        <div className={className}>
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
        </div>
    );
};
