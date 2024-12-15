import "./App.css";
import { Blocks } from "./components/information-blocks/Blocks";
import { TransactionsList } from "./components/transactions-list/TransactionsList";

function App() {
  return (
    <div className="p-5 bg-gray-300 w-full min-h-dvh">
      <Blocks />
      <h2 className="font-bold text-3xl my-2">Latest Transactions</h2>
      <TransactionsList />
    </div>
  );
}

export default App;
