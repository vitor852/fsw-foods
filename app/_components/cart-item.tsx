import Image from "next/image";
import { ChevronLeftIcon, ChevronRightIcon, TrashIcon } from "lucide-react";
import { useContext } from "react";

import { formatCurrency, computeProductTotalPrice } from "../_helpers/price";
import { Button } from "./ui/button";
import { CartContext, CartProduct } from "../_contexts/cart";

interface CartItemProps {
  cartProduct: CartProduct;
}

const CartItem = ({ cartProduct }: CartItemProps) => {
  const {
    handleRemoveProduct,
    increaseProductQuantity,
    decreaseProductQuantity,
  } = useContext(CartContext);

  return (
    <div className="flex items-center justify-between">
      <div className="flex gap-4">
        <div className="relative size-20">
          <Image
            src={cartProduct.imageUrl}
            alt={cartProduct.name}
            className="rounded-lg object-cover"
            sizes="100%"
            fill
          />
        </div>

        <div className="flex flex-col justify-between">
          <h3 className="font-semibold">{cartProduct.name}</h3>

          <div className="flex items-center gap-1">
            <h4 className="text-sm font-semibold">
              {formatCurrency(
                computeProductTotalPrice(cartProduct) * cartProduct.quantity,
              )}
            </h4>
            {cartProduct.discountPercentage > 0 && (
              <span className="text-xs text-muted-foreground line-through">
                {formatCurrency(
                  Number(cartProduct.price) * cartProduct.quantity,
                )}
              </span>
            )}
          </div>

          <div className="flex items-center gap-4 text-center">
            <Button
              size="icon"
              className="border border-solid border-muted-foreground"
              onClick={() => decreaseProductQuantity(cartProduct)}
              variant="ghost"
            >
              <ChevronLeftIcon size={14} />
            </Button>

            <span className="w-4">{cartProduct.quantity}</span>

            <Button
              size="icon"
              onClick={() => increaseProductQuantity(cartProduct)}
            >
              <ChevronRightIcon size={14} />
            </Button>
          </div>
        </div>
      </div>

      <Button
        size="icon"
        variant="ghost"
        className="h-7 w-7 border border-solid border-muted-foreground"
        onClick={() => handleRemoveProduct(cartProduct)}
      >
        <TrashIcon size={16} />
      </Button>
    </div>
  );
};

export default CartItem;
