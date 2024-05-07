import { notFound } from "next/navigation";

import { db } from "@/app/_lib/prisma";

import ProductImage from "./_components/product-image";
import ProductDetails from "./_components/product-details";

interface ProductPageProps {
  params: {
    id: string;
  };
}

const ProductPage = async ({ params: { id } }: ProductPageProps) => {
  const product = await db.product.findUnique({
    where: {
      id,
    },
    include: {
      restaurant: true,
    },
  });

  if (!product) {
    return notFound();
  }

  const complementaryProducts = await db.product.findMany({
    include: {
      restaurant: true,
    },
    where: {
      restaurant: {
        id: {
          equals: product?.restaurantId,
        },
      },
      id: {
        not: {
          equals: product.id,
        },
      },
    },
  });

  return (
    <div>
      <ProductImage product={product} />
      <ProductDetails
        product={product}
        complementaryProducts={complementaryProducts}
      />
    </div>
  );
};

export default ProductPage;
