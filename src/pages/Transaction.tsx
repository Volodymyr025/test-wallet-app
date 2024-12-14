import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Transaction } from "../components/transactions-list/TransactionsList";

export const TransactionDetail = () => {
  const { id } = useParams();
  const redirect = useNavigate();
  const [transaction, setTransaction] = useState<Transaction>();

  useEffect(
    () =>
      void (async () => {
        if (id === undefined || !/^\d+$/.test(id)) {
          return redirect("/404", { replace: true });
        } else
          try {
            const response = await fetch("/transactions.json");
            const request = (await response.json()) as Transaction[];
            const findById = request.find((data) => data.id === +id);
            setTransaction(findById);
          } catch (err: any) {
            throw new Error(err);
          }
      })(),
    []
  );
  return (
    <div className="p-5 bg-gray-300 w-full h-svh">
      <button className="text-3xl text-blue-500">
        <Link to={"/"}>{"<"}</Link>
      </button>
      {transaction ? (
        <ul className="text-center flex flex-col gap-1">
          <li className="font-bold text-5xl">${transaction.amount}</li>
          <li className="text-[12px] text-gray-500">{transaction.name}</li>
          <li className="text-[12px] text-gray-500">{transaction.date}</li>
          <li className="bg-white p-2 rounded-lg w-full text-left font-bold">
            <p>Status:{transaction.pending ? "approved" : "pending"}</p>
            <p className="font-normal text-[12px] text-gray-500">
              {transaction.description}
            </p>
            <hr />
            <div className="flex justify-between">
              <p>Total:</p>
              <p>${transaction.amount}</p>
            </div>
          </li>
        </ul>
      ) : (
        <h1 className="text-3xl text-center text-red-600">
          Transaction not found
        </h1>
      )}
    </div>
  );
};
