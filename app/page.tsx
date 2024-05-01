import { ChevronRightIcon } from "lucide-react";

import CategoryList from "./_components/category-list";
import Header from "./_components/header";
import Search from "./_components/search";
import ProductList from "./_components/product-list";
import { Button } from "./_components/ui/button";
import Banner from "./_components/banner";

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

      <Banner src="/promo-banner-01.png" alt="Até 30% de desconto em pizzas" />

      <div className="space-y-4 pt-6">
        <div className="flex items-center justify-between gap-3 px-5">
          <h3 className="font-semibold">Pedidos recomendados</h3>

          <Button
            variant="ghost"
            className="h-fit p-0 text-primary hover:bg-transparent"
          >
            Ver todos
            <ChevronRightIcon size={16} />
          </Button>
        </div>

        <ProductList products={products} />
      </div>

      <Banner src="/promo-banner-02.png" alt="Lanches a partir de R$17,90" />
    </>
  );
};

export default Home;
