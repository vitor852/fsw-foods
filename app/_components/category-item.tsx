import { Category } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

interface CategoryItemProps {
  category: Category;
}

const CategoryItem = ({ category }: CategoryItemProps) => {
  return (
    <Link
      className="flex items-center justify-center gap-3 rounded-md bg-white px-4 py-3 shadow-md"
      href={`/products?category=${category.name}`}
    >
      <Image
        src={category.imageUrl}
        alt={category.name}
        height={30}
        width={30}
      />

      <span className="truncate text-sm font-semibold">{category.name}</span>
    </Link>
  );
};

export default CategoryItem;
