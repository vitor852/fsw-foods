import { ChevronRightIcon } from "lucide-react";
import Link from "next/link";

import CategoryList from "./_components/category-list";
import Header from "./_components/header";
import Search from "./_components/search";
import ProductList from "./_components/product-list";
import { Button } from "./_components/ui/button";
import Banner from "./_components/banner";
import RestaurantList from "./_components/restaurant-list";

import { db } from "./_lib/prisma";

const Home = async () => {
  const products = await db.product.findMany({
    where: {
      discountPercentage: {
        gt: 0,
      },
    },
    include: {
      restaurant: {
        select: {
          id: true,
          name: true,
        },
      },
    },
    take: 10,
  });

  return (
    <>
      <Header />

      <div className="px-5 pt-6">
        <Search />
      </div>

      <div className="px-5 pt-6">
        <CategoryList />
      </div>

      <Link href="/products?gt=0&category=Pizzas">
        <Banner
          src="/promo-banner-01.png"
          alt="Até 30% de desconto em pizzas"
        />
      </Link>

      <div className="space-y-4 pt-6">
        <div className="flex items-center justify-between gap-3 px-5">
          <h3 className="font-semibold">Pedidos recomendados</h3>

          <Button
            variant="ghost"
            className="h-fit p-0 text-primary hover:bg-transparent"
            asChild
          >
            <Link href="/products?gt=0">
              Ver todos
              <ChevronRightIcon size={16} />
            </Link>
          </Button>
        </div>

        <div className="px-5">
          <ProductList products={products} />
        </div>
      </div>

      <Link href="/products?category=Hambúrgueres">
        <Banner src="/promo-banner-02.png" alt="Lanches a partir de R$17,90" />
      </Link>

      <div className="space-y-4 py-6">
        <div className="flex items-center justify-between gap-3 px-5">
          <h3 className="font-semibold">Restaurantes recomendados</h3>

          <Button
            variant="ghost"
            className="h-fit p-0 text-primary hover:bg-transparent"
            asChild
          >
            <Link href="/restaurants/recommended/">
              Ver todos
              <ChevronRightIcon size={16} />
            </Link>
          </Button>
        </div>

        <RestaurantList />
      </div>
    </>
  );
};

export default Home;
