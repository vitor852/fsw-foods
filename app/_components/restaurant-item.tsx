import Image from "next/image";
import { BikeIcon, HeartIcon, StarIcon, TimerIcon } from "lucide-react";
import Link from "next/link";

import { Restaurant } from "@prisma/client";

import { formatCurrency } from "../_helpers/price";
import { cn } from "../_lib/utils";

import { Button } from "./ui/button";

interface RestaurantItemProps {
  restaurant: Restaurant;
  className?: string;
}

const RestaurantItem = ({ restaurant, className }: RestaurantItemProps) => {
  return (
    <div className={cn("min-w-[266px] max-w-[266px]", className)}>
      <Link href={`/restaurants/${restaurant.id}`} className="space-y-3">
        <div className="relative h-[136px] w-full">
          <Image
            src={restaurant.imageUrl}
            alt={restaurant.name}
            className="rounded-lg object-cover"
            sizes="100%"
            fill
          />

          <div className="absolute left-2 top-2 flex items-center gap-[4px] rounded-full bg-white px-2 py-[2px]">
            <StarIcon size={12} className="fill-yellow-500 text-yellow-500" />
            <span className="text-xs font-semibold">5,0</span>
          </div>

          <Button
            size="icon"
            className="absolute right-2 top-2 size-7 rounded-full bg-gray-700 text-white"
          >
            <HeartIcon size={14} className="fill-white" />
          </Button>
        </div>

        <div>
          <h3 className="text-sm font-semibold">{restaurant.name}</h3>

          <div className="flex gap-3">
            <div className="flex items-center gap-1">
              <BikeIcon className="text-primary" size={16} />

              <span className="text-xs text-muted-foreground">
                {Number(restaurant.deliveryFee) === 0
                  ? "Entrega grátis"
                  : formatCurrency(Number(restaurant.deliveryFee))}
              </span>
            </div>

            <div className="flex items-center gap-1">
              <TimerIcon className="text-primary" size={16} />

              <span className="text-xs text-muted-foreground">
                {restaurant.deliveryTimeMinutes} min
              </span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default RestaurantItem;
