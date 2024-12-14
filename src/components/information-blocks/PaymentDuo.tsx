import dayjs from "dayjs";
import { CheckIcon } from "../../assets/CheckIcon";

export const PaymentDuo = () => {
  return (
    <div className="bg-white p-2 rounded-md w-full flex relative">
      <ul>
        <li className="font-bold text-sm">No Payment Due</li>
        <li className="text-gray-500 text-sm">
          You've paid your {dayjs().format("MMMM")} balance
        </li>
      </ul>
      <div className="bg-gray-300 rounded-full p-2 self-end absolute bottom-3 right-3">
        <CheckIcon />
      </div>
    </div>
  );
};
