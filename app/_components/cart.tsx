"use client";

import { useContext } from "react";
import { CartContext } from "../_contexts/cart";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "./ui/sheet";
import CartItem from "./cart-item";
import { Card, CardContent } from "./ui/card";
import { Separator } from "./ui/separator";
import { formatCurrency } from "../_helpers/price";
import { Button } from "./ui/button";

const Cart = () => {
  const {
    products: cartProducts,
    setIsCartOpen,
    isCartOpen,
    priceSubtotal,
    priceDiscount,
    priceTotal,
    restaurant,
    submitOrder,
  } = useContext(CartContext);

  return (
    <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
      <SheetContent className="w-[90vw] bg-white">
        <SheetHeader>
          <SheetTitle className="text-left">Sacola</SheetTitle>
        </SheetHeader>

        <div className="flex h-full flex-col py-5">
          <div className="flex-auto space-y-4">
            {cartProducts.map((cartProduct) => (
              <CartItem key={cartProduct.id} cartProduct={cartProduct} />
            ))}
          </div>

          <Card>
            <CardContent className="space-y-2 p-5">
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Subtotal</span>
                <span>{formatCurrency(priceSubtotal)}</span>
              </div>

              <Separator />

              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Entrega</span>

                {Number(restaurant?.deliveryFee) > 0 ? (
                  <span>formatCurrency(Number(restaurant?.deliveryFee))</span>
                ) : (
                  <span className="uppercase text-primary">Grátis</span>
                )}
              </div>

              <Separator />

              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Descontos</span>
                <span>{formatCurrency(priceDiscount)}</span>
              </div>

              <Separator />

              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Total</span>
                <span>{formatCurrency(priceTotal)}</span>
              </div>
            </CardContent>
          </Card>

          <Button className="mt-5 w-full font-semibold" onClick={submitOrder}>
            Finalizar pedido
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default Cart;
