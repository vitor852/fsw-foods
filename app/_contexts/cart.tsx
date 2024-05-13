"use client";

import { ReactNode, createContext, useMemo, useState } from "react";

import { Prisma, Product, Restaurant } from "@prisma/client";

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
  clearCart(): void;
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
  clearCart: () => {},
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
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
