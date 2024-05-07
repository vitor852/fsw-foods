"use client";

import { Button } from "@/app/_components/ui/button";
import { CartContext } from "@/app/_contexts/cart";
import { formatCurrency } from "@/app/_helpers/price";
import { useContext } from "react";

const CartResume = () => {
  const {
    priceTotal,
    products: cartProducts,
    setIsCartOpen,
  } = useContext(CartContext);

  if (cartProducts.length === 0) return;

  return (
    <div className="fixed bottom-0 flex w-full justify-between bg-white p-5">
      <div>
        <span className="font-light text-muted-foreground">
          Total sem entrega
        </span>

        <h3 className="font-semibold text-black">
          {formatCurrency(priceTotal)}

          <span className="font-light text-muted-foreground">
            {" "}
            / {cartProducts.length} item
          </span>
        </h3>
      </div>

      <Button onClick={() => setIsCartOpen(true)}>Ver sacola</Button>
    </div>
  );
};

export default CartResume;
