import { BikeIcon, TimerIcon } from "lucide-react";

import { Card } from "./ui/card";

import { formatCurrency } from "../_helpers/price";

interface DeliveryInfoProps {
  deliveryFee: number;
  deliveryTimeMinutes: number;
}

const DeliveryInfo = ({
  deliveryFee,
  deliveryTimeMinutes,
}: DeliveryInfoProps) => {
  return (
    <Card className="flex w-full justify-around py-3">
      <div className="flex flex-col items-center">
        <div className="flex items-center gap-1 text-muted-foreground">
          <span className="text-xs">Entrega</span>
          <BikeIcon size={14} />
        </div>

        {deliveryFee > 0 ? (
          <p className="text-xs font-semibold">{formatCurrency(deliveryFee)}</p>
        ) : (
          <p className="text-xs font-semibold">Grátis</p>
        )}
      </div>

      <div className="flex flex-col items-center">
        <div className="flex items-center gap-1 text-muted-foreground">
          <span className="text-xs">Entrega</span>
          <TimerIcon size={14} />
        </div>

        <p className="text-xs font-semibold">{deliveryTimeMinutes} min</p>
      </div>
    </Card>
  );
};

export default DeliveryInfo;
