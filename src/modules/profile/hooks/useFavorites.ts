"use client";

import { useEffect, useState } from "react";

export default function useFavorites() {
    const [favoritesCount, setFavoritesCount] = useState(0);

    useEffect(() => {
        const stored = localStorage.getItem("favorites");

        const favorites = stored ? JSON.parse(stored) : [];

        setFavoritesCount(favorites.length);
    }, []);

    return favoritesCount;
}