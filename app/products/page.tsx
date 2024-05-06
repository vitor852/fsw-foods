import Header from "@/app/_components/header";
import Products from "./_components/products";

const RecommendedOrders = async () => {
  return (
    <>
      <Header />

      <div className="space-y-6 px-5 pt-6">
        <h1 className="text-lg font-semibold">Pedidos</h1>

        <Products />
      </div>
    </>
  );
};

export default RecommendedOrders;
