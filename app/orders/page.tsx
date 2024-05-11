import Header from "../_components/header";
import OrderList from "./_components/order-list";

const OrdersPage = () => {
  return (
    <>
      <Header />

      <div className="space-y-6 px-5 pt-6">
        <h1 className="text-lg font-semibold">Pedidos</h1>

        <OrderList />
      </div>
    </>
  );
};

export default OrdersPage;
