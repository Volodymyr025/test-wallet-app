import "./App.css";
import { Blocks } from "./components/information-blocks/Blocks";
import { TransactionsList } from "./components/transactions-list/TransactionsList";

function App() {
  return (
    <div className="p-5 bg-gray-300 w-full">
      <Blocks />
      <h2 className="font-bold text-3xl">Latest Transactions</h2>
      <TransactionsList />
    </div>
  );
}

export default App;
