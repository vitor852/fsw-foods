import Header from "@/app/_components/header";

import Restaurants from "./_components/restaurants";
import Search from "../_components/search";

const RestaurantsPage = async () => {
  return (
    <>
      <Header />

      <div className="mt-5 px-5">
        <Search />
      </div>

      <div className="space-y-6 px-5 pt-6">
        <h1 className="text-lg font-semibold">Restaurantes</h1>

        <Restaurants />
      </div>
    </>
  );
};

export default RestaurantsPage;
