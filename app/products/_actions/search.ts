"use server";

import { db } from "@/app/_lib/prisma";
import { ReadonlyURLSearchParams } from "next/navigation";

export const searchForProducts = async (value: ReadonlyURLSearchParams) => {
  const searchParams = new ReadonlyURLSearchParams(value);

  const products = await db.product.findMany({
    where: {
      category: {
        name: searchParams.get("category") || undefined,
      },
      discountPercentage: {
        gt: Number(searchParams.get("gt")),
      },
    },
    include: {
      restaurant: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });

  return products;
};
