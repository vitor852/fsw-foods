"use client";

import { ChevronLeftIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { Button } from "@/app/_components/ui/button";

import { Product } from "@prisma/client";

interface ProductImageProps {
  product: Pick<Product, "name" | "imageUrl">;
}

const ProductImage = ({ product }: ProductImageProps) => {
  const router = useRouter();

  return (
    <div className="relative h-[360px] w-full">
      <Image
        src={product.imageUrl}
        alt={product.name}
        className="object-cover"
        sizes="100%"
        fill
      />

      <Button
        className="absolute left-2 top-4 rounded-full bg-white text-foreground hover:text-white"
        size="icon"
        onClick={() => router.back()}
      >
        <ChevronLeftIcon />
      </Button>
    </div>
  );
};

export default ProductImage;
