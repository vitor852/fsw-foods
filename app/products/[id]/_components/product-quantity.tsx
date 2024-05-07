"use client";

import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

import { Button } from "@/app/_components/ui/button";

interface ProductQuantityProps {
  quantity: number;
  setQuantity: React.Dispatch<React.SetStateAction<number>>;
}

const ProductQuantity = ({ quantity, setQuantity }: ProductQuantityProps) => {
  function handleIncrease() {
    setQuantity((state) => state + 1);
  }

  function handleDecrease() {
    if (quantity !== 1) setQuantity((state) => state - 1);
  }

  return (
    <div className="flex items-center gap-4 text-center">
      <Button
        size="icon"
        className="border border-solid border-muted-foreground"
        onClick={handleDecrease}
        variant="ghost"
      >
        <ChevronLeftIcon size={16} />
      </Button>

      <span className="w-4">{quantity}</span>

      <Button size="icon" onClick={handleIncrease}>
        <ChevronRightIcon size={16} />
      </Button>
    </div>
  );
};

export default ProductQuantity;
