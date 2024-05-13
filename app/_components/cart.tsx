"use client";

import { useContext, useState } from "react";
import { CircleCheck, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import { OrderStatus } from "@prisma/client";

import { CartContext } from "../_contexts/cart";

import CartItem from "./cart-item";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "./ui/sheet";
import { Card, CardContent } from "./ui/card";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
} from "./ui/alert-dialog";

import { formatCurrency } from "../_helpers/price";

import { createOrder } from "../_actions/order";

const Cart = () => {
  const router = useRouter();

  const {
    products: cartProducts,
    setIsCartOpen,
    isCartOpen,
    priceSubtotal,
    priceDiscount,
    priceTotal,
    restaurant,
    clearCart,
  } = useContext(CartContext);

  const [showSuccessDioalog, setShowSuccessDialog] = useState(false);
  const [isSubmitLoading, setIsSubmitLoading] = useState(false);

  function submitOrderSuccess() {
    clearCart();

    toast.success("Pedido criado com sucesso!");

    setIsCartOpen(false);
    setShowSuccessDialog(true);

    router.push("/");
  }

  function submitOrderError() {
    toast.error("Não foi possível criar o pedido");
  }

  async function submitOrder() {
    if (cartProducts.length === 0 || !restaurant) return;

    setIsSubmitLoading(true);
    createOrder({
      deliveryFee: restaurant.deliveryFee,
      deliveryTimeMinutes: restaurant.deliveryTimeMinutes,
      status: OrderStatus.PREPARING,
      subtotalPrice: priceSubtotal,
      totalDiscounts: priceDiscount,
      totalPrice: priceTotal,
      restaurant: {
        connect: {
          id: restaurant.id,
        },
      },
      products: {
        createMany: {
          data: cartProducts.map((product) => ({
            productId: product.id,
            quantity: product.quantity,
          })),
        },
      },
    })
      .then(submitOrderSuccess)
      .catch(submitOrderError)
      .finally(() => setIsSubmitLoading(false));
  }

  return (
    <>
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
              {isSubmitLoading && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              Finalizar pedido
            </Button>
          </div>
        </SheetContent>
      </Sheet>

      <AlertDialog
        open={showSuccessDioalog}
        onOpenChange={setShowSuccessDialog}
      >
        <AlertDialogContent className="flex w-[70vw] flex-col items-center justify-center gap-5 rounded-lg bg-white">
          <CircleCheck fill="red" color="white" size={80} />

          <div className="space-y-3 text-center">
            <h2 className="font-semibold">Pedido efetuado!</h2>
            <span className="text-muted-foreground">
              Seu pedido foi realizado com sucesso.
            </span>
          </div>

          <AlertDialogAction
            onClick={() => setShowSuccessDialog(false)}
            asChild
          >
            <Button className="w-full bg-[#f4f4f5] font-semibold text-black">
              Confirmar
            </Button>
          </AlertDialogAction>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default Cart;
