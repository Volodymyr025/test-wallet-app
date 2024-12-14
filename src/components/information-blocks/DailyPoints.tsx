import { useEffect, useState } from "react";
import dayjs from "dayjs";

const calculateDailyPoints = (dayOfSeason: number): string => {
  if (dayOfSeason === 1) return "2";
  if (dayOfSeason === 2) return "3";

  let pointsTwoDaysAgo = 2;
  let pointsOneDayAgo = 3;
  let currentPoints = 0;

  for (let day = 3; day <= dayOfSeason; day++) {
    currentPoints = Math.round(pointsTwoDaysAgo + pointsOneDayAgo * 0.6);
    pointsTwoDaysAgo = pointsOneDayAgo;
    pointsOneDayAgo = currentPoints;
  }

  return currentPoints > 1000
    ? `${Math.round(currentPoints / 1000)}K`
    : currentPoints.toString();
};

const getDayOfSeason = (): number => {
  const now = dayjs();
  const year = now.year();

  const seasons = {
    spring: dayjs(`${year}-03-01`),
    summer: dayjs(`${year}-06-01`),
    autumn: dayjs(`${year}-09-01`),
    winter: dayjs(`${year}-12-01`),
  };

  const seasonStart = Object.values(seasons).reduce((closest, seasonDate) => {
    return now.isAfter(seasonDate) ? seasonDate : closest;
  }, dayjs(`${year}-01-01`));

  const dayOfSeason = now.diff(seasonStart, "day") + 1;
  return dayOfSeason;
};

export const DailyPoints = () => {
  const [dailyPoints, setDailyPoints] = useState<string>("");

  useEffect(() => {
    const dayOfSeason = getDayOfSeason();
    const points = calculateDailyPoints(dayOfSeason);
    setDailyPoints(points);
  }, []);

  return (
    <div className="bg-white p-2 rounded-md">
      <ul>
        <li className="font-bold text-sm">Daily Points</li>
        <li className="text-gray-400 text-xs">{dailyPoints}</li>
      </ul>
    </div>
  );
};
