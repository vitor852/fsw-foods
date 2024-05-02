import Image from "next/image";
import { ArrowDownIcon, BikeIcon, TimerIcon } from "lucide-react";
import { notFound } from "next/navigation";

import { computeProductTotalPrice, formatCurrency } from "@/app/_helpers/price";

import { db } from "@/app/_lib/prisma";
import ProductImage from "./_components/product-image";
import ProductQuantity from "./_components/product-quantity";
import { Card } from "@/app/_components/ui/card";
import ProductList from "@/app/_components/product-list";

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

      <div className="relative z-auto mt-[-1.5rem] rounded-tl-3xl rounded-tr-3xl bg-white pb-5">
        <div className="space-y-4 p-5">
          <div>
            <div className="flex items-center gap-[0.365rem]">
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
            </div>

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

          <Card className="flex w-full justify-around py-3">
            <div className="flex flex-col items-center">
              <div className="flex items-center gap-1 text-muted-foreground">
                <span className="text-xs">Entrega</span>
                <BikeIcon size={14} />
              </div>

              {Number(product.restaurant.deliveryFee) > 0 ? (
                <p className="text-xs font-semibold">
                  {formatCurrency(Number(product.restaurant.deliveryFee))}
                </p>
              ) : (
                <p className="text-xs font-semibold">Grátis</p>
              )}
            </div>

            <div className="flex flex-col items-center">
              <div className="flex items-center gap-1 text-muted-foreground">
                <span className="text-xs">Entrega</span>
                <TimerIcon size={14} />
              </div>

              <p className="text-xs font-semibold">
                {product.restaurant.deliveryTimeMinutes} min
              </p>
            </div>
          </Card>

          <div className="space-y-3">
            <h3 className="font-semibold">Sobre</h3>
            <p className="text-sm text-muted-foreground">
              {product.description}
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="pl-5 font-semibold">Outros produtos</h3>

          <ProductList products={complementaryProducts} />
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
