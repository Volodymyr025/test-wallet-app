export const CardBalance = () => {
  const limit = 1500;

  const balance = parseFloat((Math.random() * limit).toString());
  return (
    <div className="bg-white p-2 rounded-md">
      <ul>
        <li className="font-bold text-sm">Card Balance</li>
        <li className="font-bold text-3xl">$ {balance.toFixed(2)}</li>
        <li className="text-gray-400 text-xs">
          ${(limit - balance).toFixed(2)} Available
        </li>
      </ul>
    </div>
  );
};
