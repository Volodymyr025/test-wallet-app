import { useEffect, useState } from "react";
import { AppleIcon } from "../../assets/AppleIcon";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import { LoaderWrapper } from "../loader/LoaderWrapper";

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
  const [loader, setLoader] = useState(false);

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
          setLoader(true);
          await new Promise((resolve) => setTimeout(resolve, 3000)); //Created fake timeout to show the loader
          const response = await fetch("/transactions.json");
          const request = await response.json();
          setTransactions(request);
        } catch (err: any) {
          throw new Error(err);
        } finally {
          setLoader(false);
        }
      })(),
    []
  );
  return (
    <LoaderWrapper loader={loader}>
      <ul className="bg-white p-3 rounded-lg ">
        {transactions.map((data) => (
          <li key={data.id}>
            <Link to={`/transaction/${data.id}`}>
              <div className="flex gap-3 w-full my-2 items-center">
                <div className="bg-black p-1.5 rounded-xl">
                  <AppleIcon />
                </div>

                <div className="w-full">
                  <section className="flex justify-between">
                    <h2 className="font-bold">{data.name}</h2>
                    <p>
                      {data.type === "Payment" && "+"}${data.amount.toFixed(2)}
                    </p>
                  </section>
                  <div className="text-gray-400">
                    <div className="flex justify-between">
                      <section>
                        {data.pending && "Pending - "}
                        {data.description}
                      </section>
                      <section className="bg-gray-200 px-2 rounded-md h-fit">
                        {((data.amount / 1500) * 100).toFixed(0) + "%"}
                      </section>
                    </div>
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
        {transactions.length <= 0 && (
          <li className="text-2xl text-center">List is empty</li>
        )}
      </ul>
    </LoaderWrapper>
  );
};
