"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Restaurant } from "@prisma/client";

import { searchForRestaurants } from "../_actions/search";

import RestaurantItem from "@/app/_components/restaurant-item";

const Restaurants = () => {
  const search = useSearchParams();

  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);

  useEffect(() => {
    const fetchRestaurants = async () => {
      if (!search) return;

      const restaurants = await searchForRestaurants(search);
      setRestaurants(restaurants);
    };

    fetchRestaurants();
  }, [search]);

  if (!restaurants) return;

  return (
    <div className="flex w-full flex-col gap-5">
      {restaurants.map((restaurant) => (
        <RestaurantItem
          key={restaurant.id}
          restaurant={restaurant}
          className="min-w-full max-w-full"
        />
      ))}
    </div>
  );
};

export default Restaurants;
