import { Prisma } from "@prisma/client";
import Image from "next/image";
import { ArrowDownIcon } from "lucide-react";

import { computeProductTotalPrice, formatCurrency } from "../_helpers/price";

interface ProductItemProps {
  product: Prisma.ProductGetPayload<{
    include: {
      restaurant: {
        select: {
          name: true;
        };
      };
    };
  }>;
}

const ProductItem = ({ product }: ProductItemProps) => {
  return (
    <div className="w-[150px] min-w-[150px] space-y-2">
      <div className="relative h-[150px] w-full">
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          className="rounded-lg object-cover shadow-md"
        />

        {product.discountPercentage && (
          <div className="absolute left-2 top-2 flex items-center gap-[2px] rounded-full bg-primary px-2 py-[2px]">
            <ArrowDownIcon size={12} />

            <span className="text-xs font-semibold text-white">
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

        <span className="truncate text-xs text-muted-foreground">
          {product.restaurant.name}
        </span>
      </div>
    </div>
  );
};

export default ProductItem;