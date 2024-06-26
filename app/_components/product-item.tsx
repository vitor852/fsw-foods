import { Prisma } from "@prisma/client";
import Image from "next/image";
import { ArrowDownIcon } from "lucide-react";
import Link from "next/link";

import { computeProductTotalPrice, formatCurrency } from "../_helpers/price";
import { cn } from "../_lib/utils";

interface ProductItemProps {
  product: Prisma.ProductGetPayload<{
    include: {
      restaurant: {
        select: {
          id: true;
          name: true;
        };
      };
    };
  }>;
  className?: string;
}

const ProductItem = ({ product, className }: ProductItemProps) => {
  return (
    <div className={cn("w-[150px] min-w-[150px]", className)}>
      <Link className="space-y-2" href={`/products/${product.id}`}>
        <div className="relative aspect-square h-[150px] w-full">
          <Image
            src={product.imageUrl}
            alt={product.name}
            className="rounded-lg object-cover shadow-md"
            sizes="100%"
            fill
          />

          {product.discountPercentage && (
            <div className="absolute left-2 top-2 flex items-center gap-[2px] rounded-full bg-primary px-2 py-[2px] text-white">
              <ArrowDownIcon size={12} />

              <span className="text-xs font-semibold">
                {product.discountPercentage}%
              </span>
            </div>
          )}
        </div>

        <div className="flex flex-col">
          <h2 className="truncate text-sm">{product.name}</h2>

          <div className="flex items-center gap-1">
            <h3 className="font-semibold">
              {formatCurrency(computeProductTotalPrice(product))}
            </h3>

            {product.discountPercentage > 0 && (
              <span className="text-xs text-muted-foreground line-through">
                {formatCurrency(Number(product.price))}
              </span>
            )}
          </div>

          <Link
            href={`/restaurants/${product.restaurant.id}`}
            className="truncate text-xs text-muted-foreground"
          >
            {product.restaurant.name}
          </Link>
        </div>
      </Link>
    </div>
  );
};

export default ProductItem;
