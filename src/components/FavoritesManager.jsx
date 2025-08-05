import React, { useState } from 'react';
import TopRest from './TopRest';
import OnlineDelivery from './OnlineDelivery';
import Card from './Card';

export default function FavoritesManager() {
  const [favorites, setFavorites] = useState([]);

  const toggleFavorite = (restaurant) => {
    setFavorites((prev) => {
      const exists = prev.find((r) => r.title === restaurant.title);
      return exists ? prev.filter((r) => r.title !== restaurant.title) : [...prev, restaurant];
    });
  };

  return (
    <>
      <TopRest favorites={favorites} toggleFavorite={toggleFavorite} />
      <OnlineDelivery favorites={favorites} toggleFavorite={toggleFavorite} />

      {favorites.length > 0 && (
        <div className="max-w-[1200px] mx-auto px-2 my-10">
          <h2 className="text-2xl font-bold mb-4">❤️ Your Favorites</h2>
          <div className="flex overflow-hidden gap-5 flex-wrap">
            {favorites.map((fav, i) => (
              <Card key={i} {...fav} width="w-full md:w-[273px]" onFavorite={toggleFavorite} isFav={true} />
            ))}
          </div>
          <hr className="my-4 border-[1px]" />
        </div>
      )}
    </>
  );
}
