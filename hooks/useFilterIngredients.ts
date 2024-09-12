"use client"
import { Ingredient } from "@prisma/client";
import {useEffect, useState} from "react";
import { Api } from "@/services/api-clients";
import {useSet} from "react-use";

interface ReturnProps {
    ingredients: Ingredient[];
    loading: boolean;
    selectedIds: Set<string>;
    onAddId: (id: string) => void;
}

export const useFilterIngredients = (): ReturnProps => {
    const [ingredients, setIngredients] = useState<Ingredient[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [selectedIds, {  toggle }] = useSet<string>(new Set([]));


    const onAddId = (id: string) => {
        toggle(id)
    }

    useEffect(() => {
        Api.ingredients.getAll()
            .then((ingredients) => {
                setIngredients(ingredients);
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    return { ingredients, loading:false, onAddId,  selectedIds };
}
