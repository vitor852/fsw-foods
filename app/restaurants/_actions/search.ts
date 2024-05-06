"use server";

import { db } from "@/app/_lib/prisma";
import { ReadonlyURLSearchParams } from "next/navigation";

export const searchForRestaurants = async (value: ReadonlyURLSearchParams) => {
  const searchParams = new ReadonlyURLSearchParams(value);

  const restaurants = await db.restaurant.findMany({
    where: {
      name: {
        contains: searchParams.get("name") || undefined,
        mode: "insensitive",
      },
    },
  });

  return restaurants;
};
