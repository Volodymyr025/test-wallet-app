export const DailyPoints = () => {
  function calculateDailyPoints(dayOfSeason: number): number {
    if (dayOfSeason === 1) return 2;
    if (dayOfSeason === 2) return 3;
    const previousDay = calculateDailyPoints(dayOfSeason - 1);
    const dayBeforePrevious = calculateDailyPoints(dayOfSeason - 2);
    const currentPoints = Math.round(previousDay * 0.6 + dayBeforePrevious);
    return currentPoints > 1000
      ? Math.round(currentPoints / 1000) * 1000
      : currentPoints;
  }
  const calculatePoints = calculateDailyPoints(10);
  const convertNumber =
    calculatePoints > 1000
      ? `${Math.round(calculatePoints / 1000) * 1000}K`
      : calculatePoints;
  return (
    <div className="bg-white p-2 rounded-md">
      <ul>
        <li className="font-bold text-sm">Daily Points</li>
        <li className="text-gray-400 text-xs">{convertNumber}</li>
      </ul>
    </div>
  );
};
