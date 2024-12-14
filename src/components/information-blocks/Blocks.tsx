import { CardBalance } from "./CardBalance";
import { DailyPoints } from "./DailyPoints";
import { PaymentDuo } from "./PaymentDuo";

export const Blocks = () => {
  return (
    <div className="flex  gap-2 my-3">
      <div className="flex flex-col gap-2 w-full">
        <CardBalance />
        <DailyPoints />
      </div>
      <PaymentDuo />
    </div>
  );
};
