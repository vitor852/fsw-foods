import Image from "next/image";
import { ArrowDownIcon } from "lucide-react";
import { notFound } from "next/navigation";
import Link from "next/link";

import { computeProductTotalPrice, formatCurrency } from "@/app/_helpers/price";

import { db } from "@/app/_lib/prisma";

import ProductList from "@/app/_components/product-list";
import { Button } from "@/app/_components/ui/button";
import DeliveryInfo from "@/app/_components/delivery-info";
import ProductImage from "./_components/product-image";
import ProductQuantity from "./_components/product-quantity";

interface ProductPageProps {
  params: {
    id: string;
  };
}

const ProductPage = async ({ params: { id } }: ProductPageProps) => {
  const product = await db.product.findUnique({
    where: {
      id,
    },
    include: {
      restaurant: true,
    },
  });

  if (!product) {
    return notFound();
  }

  const complementaryProducts = await db.product.findMany({
    include: {
      restaurant: true,
    },
    where: {
      restaurant: {
        id: {
          equals: product?.restaurantId,
        },
      },
      id: {
        not: {
          equals: product.id,
        },
      },
    },
  });

  return (
    <div>
      <ProductImage product={product} />

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

          <ProductQuantity />
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

        <Button className="w-full font-semibold">Adicionar à sacola</Button>
      </div>
    </div>
  );
};

export default ProductPage;
