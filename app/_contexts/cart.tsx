"use client";

import { ReactNode, createContext, useMemo, useState } from "react";

import { OrderStatus, Prisma, Product, Restaurant } from "@prisma/client";
import { createOrder } from "../_actions/order";
import { toast } from "sonner";

export interface CartProduct
  extends Prisma.ProductGetPayload<{
    include: {
      restaurant: true;
    };
  }> {
  quantity: number;
}

interface ICartContext {
  products: CartProduct[];
  isCartOpen: boolean;
  priceSubtotal: number;
  priceDiscount: number;
  priceTotal: number;
  restaurant?: Restaurant;
  // eslint-disable-next-line no-unused-vars
  handleAddProduct(product: Product, quantity: number): void;
  // eslint-disable-next-line no-unused-vars
  handleRemoveProduct(product: CartProduct): void;
  // eslint-disable-next-line no-unused-vars
  setIsCartOpen(value: boolean): void;
  // eslint-disable-next-line no-unused-vars
  increaseProductQuantity(product: CartProduct): void;
  // eslint-disable-next-line no-unused-vars
  decreaseProductQuantity(product: CartProduct): void;
  submitOrder(): void;
}

export const CartContext = createContext<ICartContext>({
  products: [],
  isCartOpen: false,
  restaurant: undefined,
  priceSubtotal: 0,
  priceDiscount: 0,
  priceTotal: 0,
  handleAddProduct: () => {},
  handleRemoveProduct: () => {},
  setIsCartOpen: () => {},
  increaseProductQuantity: () => {},
  decreaseProductQuantity: () => {},
  submitOrder: () => {},
});

const CartProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<ICartContext["products"]>([]);
  const [restaurant, setRestaurant] = useState<ICartContext["restaurant"]>();
  const [isCartOpen, setIsCartOpen] = useState(false);

  const priceSubtotal = useMemo(() => {
    return products.reduce((acc, product) => acc + Number(product.price), 0);
  }, [products]);
  const priceDiscount = useMemo(() => {
    return products.reduce(
      (acc, product) =>
        acc + (product.discountPercentage / 100) * Number(product.price),
      0,
    );
  }, [products]);
  const priceTotal =
    priceSubtotal - priceDiscount + Number(restaurant?.deliveryFee);

  function handleAddProduct(
    product: Prisma.ProductGetPayload<{
      include: {
        restaurant: true;
      };
    }>,
    quantity: number,
  ) {
    setIsCartOpen(true);
    setProducts((state) => [...state, { ...product, quantity }]);
    setRestaurant(product.restaurant);
  }

  function handleRemoveProduct(product: CartProduct) {
    setProducts((state) =>
      state.filter((cartProduct) => cartProduct.id !== product.id),
    );
  }

  function increaseProductQuantity(product: CartProduct) {
    setProducts((state) =>
      state.map((cartProduct) => {
        if (cartProduct.id === product.id)
          return {
            ...cartProduct,
            quantity: cartProduct.quantity + 1,
          };

        return cartProduct;
      }),
    );
  }

  function decreaseProductQuantity(product: CartProduct) {
    setProducts((state) =>
      state.map((cartProduct) => {
        if (cartProduct.quantity > 1 && cartProduct.id === product.id)
          return {
            ...cartProduct,
            quantity: cartProduct.quantity - 1,
          };

        return cartProduct;
      }),
    );
  }

  function clearCart() {
    setProducts([]);
    setRestaurant(undefined);
  }

  function submitOrderSuccess() {
    clearCart();
    toast.success("Pedido criado com sucesso!");
    setIsCartOpen(false);
  }

  function submitOrderError(error: any) {
    console.log(error);
    toast.error("Não foi possível criar o pedido");
  }

  async function submitOrder() {
    if (products.length === 0 || !restaurant) return;

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
          data: products.map((product) => ({
            productId: product.id,
            quantity: product.quantity,
          })),
        },
      },
    })
      .then(submitOrderSuccess)
      .catch(submitOrderError);
  }

  return (
    <CartContext.Provider
      value={{
        products,
        isCartOpen,
        priceSubtotal,
        priceDiscount,
        priceTotal,
        restaurant,
        handleAddProduct,
        handleRemoveProduct,
        setIsCartOpen,
        increaseProductQuantity,
        decreaseProductQuantity,
        submitOrder,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
