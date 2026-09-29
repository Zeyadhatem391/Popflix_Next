import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface Favorite {
  id: string;
  movieId: string;
  userId?: string;
}

interface FavoritesStore {
  favorites: Favorite[];

  addFavorites: (favorite: Favorite) => void;
  removeFavorites: (id: string) => void;
  getFavoritesByUserId: (userId: string) => Favorite[];
}

export const useFavoritesStore = create<FavoritesStore>()(
  devtools(
    persist(
      (set, get) => ({
        favorites: [],

        addFavorites: (favorite) =>
          set((state) => {
            const exists = state.favorites.some(
              (item) =>
                item.movieId === favorite.movieId &&
                item.userId === favorite.userId
            );

            if (exists) {
              return state;
            }

            return {
              favorites: [...state.favorites, favorite],
            };
          }),

        removeFavorites: (id) =>
          set((state) => ({
            favorites: state.favorites.filter(
              (favorite) => favorite.id !== id
            ),
          })),

        getFavoritesByUserId: (userId) =>
          get().favorites.filter(
            (favorite) => favorite.userId === userId
          ),
      }),
      {
        name: "favorites-storage",
        skipHydration: true,
      }
    )
  )
);