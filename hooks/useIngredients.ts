"use client"
import {useEffect, useState} from "react";
import {Ingredient} from "@prisma/client";
import {Api} from "@/services/api-clients";

export const useIngredients = () => {
    const [ingredients, setIngredients] = useState<Ingredient[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

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

    return { ingredients, loading};
}
