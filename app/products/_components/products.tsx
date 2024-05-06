"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Prisma } from "@prisma/client";

import { searchForProducts } from "../_actions/search";

import ProductItem from "@/app/_components/product-item";

const Products = () => {
  const search = useSearchParams();

  const [products, setProducts] = useState<
    Prisma.ProductGetPayload<{
      include: {
        restaurant: {
          select: {
            id: true;
            name: true;
          };
        };
      };
    }>[]
  >([]);

  useEffect(() => {
    const fetchProducts = async () => {
      if (!search) return;

      const products = await searchForProducts(search);
      setProducts(products);
    };

    fetchProducts();
  }, [search]);

  if (!products) return;

  return (
    <div className="grid grid-cols-2 gap-6">
      {products.map((product) => (
        <ProductItem
          key={product.id}
          product={product}
          className="min-w-full"
        />
      ))}
    </div>
  );
};

export default Products;
