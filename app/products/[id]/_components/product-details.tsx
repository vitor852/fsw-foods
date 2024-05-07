"use client";

import { ArrowDownIcon, CheckIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { computeProductTotalPrice, formatCurrency } from "@/app/_helpers/price";

import { Prisma } from "@prisma/client";

import DeliveryInfo from "@/app/_components/delivery-info";
import ProductList from "@/app/_components/product-list";
import { Button } from "@/app/_components/ui/button";
import ProductQuantity from "./product-quantity";
import { useContext, useState } from "react";
import { CartContext } from "@/app/_contexts/cart";

interface ProductDetailsProps {
  product: Prisma.ProductGetPayload<{
    include: {
      restaurant: {
        select: {
          id: true;
          name: true;
          deliveryFee: true;
          deliveryTimeMinutes: true;
          imageUrl: true;
        };
      };
    };
  }>;
  complementaryProducts: Prisma.ProductGetPayload<{
    include: {
      restaurant: {
        select: {
          id: true;
          name: true;
        };
      };
    };
  }>[];
}

const ProductDetails = ({
  product,
  complementaryProducts,
}: ProductDetailsProps) => {
  const cart = useContext(CartContext);

  const [quantity, setQuantity] = useState(1);

  const productOnCart = cart.products.some(
    (cartProduct) => cartProduct.id === product.id,
  );

  function addToCart() {
    if (productOnCart) return;
    cart.handleAddProduct(product, quantity);
  }

  return (
    <div className="relative z-auto mt-[-1.5rem] space-y-4 rounded-tl-3xl rounded-tr-3xl bg-white p-5">
      <div>
        <Link
          className="flex items-center gap-[0.365rem]"
          href={`/restaurants/${product.restaurant.id}`}
        >
          <div className="relative size-6">
            <Image
              src={product.restaurant.imageUrl}
              alt={product.restaurant.name}
              className="rounded-full object-cover"
              sizes="100%"
              fill
            />
          </div>

          <span className="text-xs text-muted-foreground">
            {product.restaurant.name}
          </span>
        </Link>

        <h1 className="mt-1 text-xl font-semibold">{product.name}</h1>
      </div>

      <div className="flex w-full justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-xl font-semibold">
              {formatCurrency(computeProductTotalPrice(product))}
            </h3>

            {product.discountPercentage > 0 && (
              <div className="flex items-center gap-[2px] rounded-full bg-primary px-2 py-[4px] text-white">
                <ArrowDownIcon size={12} />

                <span className="text-xs font-semibold">
                  {product.discountPercentage}%
                </span>
              </div>
            )}
          </div>

          {product.discountPercentage > 0 && (
            <span className="text-sm text-muted-foreground">
              De: {formatCurrency(Number(product.price))}
            </span>
          )}
        </div>

        <ProductQuantity quantity={quantity} setQuantity={setQuantity} />
      </div>

      <DeliveryInfo
        deliveryFee={Number(product.restaurant.deliveryFee)}
        deliveryTimeMinutes={product.restaurant.deliveryTimeMinutes}
      />

      <div className="space-y-3">
        <h3 className="font-semibold">Sobre</h3>
        <p className="text-sm text-muted-foreground">{product.description}</p>
      </div>

      <div className="space-y-4">
        <h3 className="font-semibold">Outros produtos</h3>

        <ProductList products={complementaryProducts} />
      </div>

      <Button className="w-full font-semibold" onClick={addToCart}>
        {productOnCart ? (
          <div className="flex items-center gap-3">
            <CheckIcon /> Produto adicionado
          </div>
        ) : (
          "Adicionar à sacola"
        )}
      </Button>
    </div>
  );
};

export default ProductDetails;
