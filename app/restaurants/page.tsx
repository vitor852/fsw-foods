import Header from "@/app/_components/header";

import Restaurants from "./_components/restaurants";

const RestaurantsPage = async () => {
  return (
    <>
      <Header />

      <div className="space-y-6 px-5 pt-6">
        <h1 className="text-lg font-semibold">Restaurantes</h1>

        <Restaurants />
      </div>
    </>
  );
};

export default RestaurantsPage;
