import React, { createContext, useContext, useState } from "react";

export type FavoriteVendor = {
  id: string;
  name: string;
  category: string;
  rating: number;
  reviews: number;
  priceLevel: string;
  startingPrice: string;
  location: string;
  tags: string[];
  image: string;
};

type FavoritesContextType = {
  favorites: FavoriteVendor[];
  isFavorite: (id: string) => boolean;
  toggleFavorite: (vendor: FavoriteVendor) => void;
  removeFavorite: (id: string) => void;
};

const FavoritesContext = createContext<FavoritesContextType>({
  favorites: [],
  isFavorite: () => false,
  toggleFavorite: () => {},
  removeFavorite: () => {},
});

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [favorites, setFavorites] = useState<FavoriteVendor[]>([]);

  const isFavorite = (id: string) => favorites.some((v) => v.id === id);

  const toggleFavorite = (vendor: FavoriteVendor) => {
    setFavorites((prev) =>
      prev.some((v) => v.id === vendor.id)
        ? prev.filter((v) => v.id !== vendor.id)
        : [...prev, vendor]
    );
  };

  const removeFavorite = (id: string) =>
    setFavorites((prev) => prev.filter((v) => v.id !== id));

  return (
    <FavoritesContext.Provider value={{ favorites, isFavorite, toggleFavorite, removeFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export const useFavorites = () => useContext(FavoritesContext);
