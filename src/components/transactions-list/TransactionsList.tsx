import { useEffect, useState } from "react";
import { AppleIcon } from "../../assets/AppleIcon";
import dayjs from "dayjs";
import { Link } from "react-router-dom";

export interface Transaction {
  id: number;
  type: string;
  amount: number;
  name: string;
  description: string;
  date: string;
  pending: boolean;
  user?: string;
}

export const TransactionsList = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const formatDate = (dateString: string): string => {
    const inputDate = dayjs(dateString);
    const today = dayjs();

    const diffInDays = today.diff(inputDate, "day");

    if (diffInDays < 7) {
      return inputDate.format("dddd");
    }
    return inputDate.format("YYYY-MM-DD");
  };

  useEffect(
    () =>
      void (async () => {
        try {
          const response = await fetch("/transactions.json");
          const request = await response.json();
          setTransactions(request);
        } catch (err: any) {
          throw new Error(err);
        }
      })(),
    []
  );
  return (
    <ul className="bg-white p-3 rounded-lg">
      {transactions.map((data) => (
        <li key={data.id}>
          <Link to={`/transaction/${data.id}`}>
            <div className="flex gap-3 w-full my-2 items-center">
              <div className="bg-blue-300 p-3 rounded-xl">
                <AppleIcon />
              </div>

              <div className="w-full">
                <section className="flex justify-between">
                  <h2 className="font-bold">{data.name}</h2>
                  <p>
                    {data.type === "Payment" && "+"}${data.amount}
                  </p>
                </section>
                <div className="text-gray-400">
                  <p>
                    {data.pending && "Pending - "}
                    {data.description}
                  </p>
                  <p>
                    {data.user && `${data.user} - `}
                    {formatDate(data.date)}
                  </p>
                </div>
              </div>
              <div className="self-start">{">"}</div>
            </div>
            <hr />
          </Link>
        </li>
      ))}
    </ul>
  );
};
