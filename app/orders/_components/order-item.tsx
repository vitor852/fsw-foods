"use client";

import { Separator } from "@radix-ui/react-separator";
import { ChevronRightIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/app/_components/ui/button";
import { Card, CardContent } from "@/app/_components/ui/card";

import { formatCurrency } from "@/app/_helpers/price";

import { OrderStatus, Prisma } from "@prisma/client";

interface OrderItemProps {
  order: Prisma.OrderGetPayload<{
    include: {
      products: {
        include: {
          product: {
            select: {
              name: true;
            };
          };
        };
      };
      restaurant: {
        select: {
          name: true;
          imageUrl: true;
        };
      };
    };
  }>;
}

const OrderItem = ({ order }: OrderItemProps) => {
  function getStatusLabel(status: OrderStatus) {
    switch (status) {
      case "CANCELED":
        return "Cancelado";
      case "COMPLETED":
        return "Finalizado";
      case "CONFIRMED":
        return "Confirmado";
      case "DELIVERING":
        return "Em Transporte";
      case "PREPARING":
        return "Preparando";
    }
  }

  return (
    <Card key={order.id}>
      <CardContent className="space-y-3 p-5">
        <div className="w-fit rounded-full bg-green-500 px-2 py-1">
          <span className="block text-xs font-semibold text-white">
            {getStatusLabel(order.status)}
          </span>
        </div>

        <div>
          <Link
            href={`/restaurants/${order.restaurantId}`}
            className="flex w-full items-center justify-between"
          >
            <div className="flex items-center gap-2">
              <div className="relative size-5">
                <Image
                  src={order.restaurant.imageUrl}
                  alt={order.restaurant.name}
                  className="rounded-full object-cover"
                  fill
                />
              </div>

              <span className="text-sm font-semibold">
                {order.restaurant.name}
              </span>
            </div>

            <Button
              variant="link"
              size="icon"
              className="h-5 w-5 text-black"
              asChild
            >
              <ChevronRightIcon />
            </Button>
          </Link>
        </div>

        <Separator />

        {order.products.map((product) => (
          <div key={product.id} className="flex items-center gap-2">
            <div className="flex h-5 w-5 items-center justify-center rounded-full bg-muted-foreground">
              <span className="block text-xs text-white">
                {product.quantity}
              </span>
            </div>

            <span className="block text-xs text-muted-foreground">
              {product.product.name}
            </span>
          </div>
        ))}

        <Separator />

        <div>
          <span className="text-xs">
            {formatCurrency(Number(order.totalPrice))}
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderItem;
