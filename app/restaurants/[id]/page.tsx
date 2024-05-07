import { notFound } from "next/navigation";
import Image from "next/image";
import { StarIcon } from "lucide-react";

import { db } from "@/app/_lib/prisma";

import RestaurantImage from "./_componenents/restaurant-image";
import DeliveryInfo from "@/app/_components/delivery-info";
import ProductList from "@/app/_components/product-list";
import CartResume from "./_componenents/cart-resume";

interface RestaurantPageProps {
  params: {
    id: string;
  };
}

const RestaurantPage = async ({ params: { id } }: RestaurantPageProps) => {
  const restaurant = await db.restaurant.findUnique({
    where: {
      id,
    },
    include: {
      categories: {
        include: {
          products: {
            where: {
              restaurantId: id,
            },
            include: {
              restaurant: {
                select: {
                  id: true,
                  name: true,
                },
              },
            },
          },
        },
      },
      products: {
        take: 10,
        include: {
          restaurant: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      },
    },
  });

  if (!restaurant) {
    return notFound();
  }

  return (
    <div>
      <RestaurantImage restaurant={restaurant} />

      <div className="relative mt-[-1.5rem] space-y-4 rounded-tl-3xl rounded-tr-3xl bg-white">
        <div className="flex justify-between px-5 pt-5">
          <div className="flex items-center gap-2">
            <div className="relative size-10">
              <Image
                src={restaurant.imageUrl}
                alt={restaurant.name}
                className="rounded-full object-cover"
                sizes="100%"
                fill
              />
            </div>

            <h1 className="truncate text-lg font-bold">{restaurant.name}</h1>
          </div>

          <div className="flex items-center gap-[4px] rounded-full bg-foreground px-3 py-1 text-white">
            <StarIcon size={12} className="fill-yellow-500 text-yellow-500" />
            <span className="text-xs font-bold">5.0</span>
          </div>
        </div>

        <div className="px-5">
          <DeliveryInfo
            deliveryFee={Number(restaurant.deliveryFee)}
            deliveryTimeMinutes={restaurant.deliveryTimeMinutes}
          />
        </div>

        <div className="flex gap-3 overflow-x-scroll px-5 [&::-webkit-scrollbar]:hidden">
          {restaurant.categories.map((category) => (
            <div
              className="min-w-[167px] rounded-md bg-gray-100 py-2 text-center text-xs text-muted-foreground"
              key={category.id}
            >
              {category.name}
            </div>
          ))}
        </div>

        <div className="space-y-4 pl-5">
          <h2 className="font-semibold">Mais pedidos</h2>

          <ProductList products={restaurant.products} />
        </div>

        <div className="pl-5">
          {restaurant.categories.map((category) => (
            <div className="space-y-4" key={category.id}>
              <h2 className="font-semibold">{category.name}</h2>
              <ProductList products={category.products} />
            </div>
          ))}
        </div>
      </div>

      <CartResume />
    </div>
  );
};

export default RestaurantPage;
