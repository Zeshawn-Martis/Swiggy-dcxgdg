import React, { useState, useEffect, useRef } from "react";
import Card from "./Card";
import { PiSlidersHorizontal } from "react-icons/pi";
import { RxCaretDown } from "react-icons/rx";

export default function OnlineDelivery() {
  const [data, setData] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const componentRef = useRef(null);
  const [isAtTop, setIsAtTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (componentRef.current) {
        const rect = componentRef.current.getBoundingClientRect();
        setIsAtTop(rect.top <= 0);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const fetchTopRestaurant = async () => {
    const response = await fetch("/restaurantChains.json");
    const apiData = await response.json();
    setData(apiData);
  };

  useEffect(() => {
    fetchTopRestaurant();
  }, []);

  const toggleFavorite = (restaurant) => {
    setFavorites((prev) => {
      const exists = prev.find((r) => r.title === restaurant.title);
      return exists ? prev.filter((r) => r.title !== restaurant.title) : [...prev, restaurant];
    });
  };

  return (
    <div className="max-w-[1200px] mx-auto px-2" ref={componentRef}>
      <div className="flex my-5 items-center justify-between">
        <div className="text-[25px] font-bold">
          Restaurants with online food delivery in Mumbai
        </div>
      </div>

      <div className={isAtTop ? "fixed top-0 z-[99999] bg-white w-full left-0" : ""}>
        <div className="max w-[1200px] mx-auto flex my-4 gap-4 font-bold">
          <div className="p-3 rounded-[18px] border-[2px]">Filter<PiSlidersHorizontal className="inline" /></div>
          <div className="p-3 rounded-[18px] border-[2px]"> Sort By<RxCaretDown className="inline" /></div>
          <div className="p-3 rounded-[18px] border-[2px]"> Fast Delivery</div>
          <div className="p-3 rounded-[18px] border-[2px]"> Ratings 4.0+</div>
          <div className="p-3 rounded-[18px] border-[2px]"> Pure Veg</div>
          <div className="p-3 rounded-[18px] border-[2px]"> Offers</div>
          <div className="p-3 rounded-[18px] border-[2px]"> Rs. 300-Rs. 600</div>
          <div className="p-3 rounded-[18px] border-[2px]"> Less than Rs. 300</div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 ">
        {data.map((d, i) => (
          <Card
            {...d}
            key={i}
            onFavorite={toggleFavorite}
            isFav={favorites.some((r) => r.title === d.title)}
          />
        ))}
      </div>

      {favorites.length > 0 && (
        <div className="mt-10">
          <h2 className="text-2xl font-bold mb-4">❤️ Your Favorites</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {favorites.map((fav, idx) => (
              <Card {...fav} key={idx} onFavorite={toggleFavorite} isFav={true} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
