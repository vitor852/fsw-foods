import { db } from "@/app/_lib/prisma";

import OrderItem from "./order-item";

const OrderList = async () => {
  const orders = await db.order.findMany({
    include: {
      products: {
        include: {
          product: {
            select: {
              name: true,
            },
          },
        },
      },
      restaurant: {
        select: {
          name: true,
          imageUrl: true,
        },
      },
    },
  });

  return orders.map((order) => <OrderItem key={order.id} order={order} />);
};

export default OrderList;
