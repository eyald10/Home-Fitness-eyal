
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const workouts = {
  day1: ["שכיבות סמיכה", "שכיבות יהלום", "דיפס", "פלאנק"],
  day2: ["חתירה עם תיק", "סופרמן", "כפיפות מרפק", "פלאנק צד"],
  day3: ["סקוואט", "לאנג'ים", "קפיצות", "בטן"],
  day4: ["לחיצת כתפיים", "הרמות צד", "שכיבות סמיכה כתפיים", "בטן"]
};

export default function HomeFitnessTracker() {
  const [progress, setProgress] = useState(0);
  const [completed, setCompleted] = useState({});

  const handleComplete = (day, index) => {
    const key = `${day}-${index}`;
    setCompleted((prev) => ({ ...prev, [key]: true }));
    setProgress((prev) => prev + 100 / 16);
  };

  const chartData = [
    { name: "שבוע 1", weight: 60 },
    { name: "שבוע 2", weight: 60.5 },
    { name: "שבוע 3", weight: 61 },
    { name: "שבוע 4", weight: 61.5 },
  ];

  return (
    <div className="p-4 space-y-6 bg-gradient-to-br from-pink-200 to-blue-300 min-h-screen">
      <h1 className="text-3xl font-bold text-center text-blue-900">גוף חטוב מהבית</h1>

      <Card className="bg-white shadow-xl rounded-2xl">
        <CardContent className="p-4">
          <h2 className="text-xl font-semibold text-purple-700">התקדמות</h2>
          <Progress value={progress} className="my-4" />
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis domain={[59, 63]} />
              <Tooltip />
              <Line type="monotone" dataKey="weight" stroke="#8884d8" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {Object.entries(workouts).map(([day, exercises], dayIdx) => (
        <Card key={day} className="bg-yellow-100 shadow-md rounded-2xl">
          <CardContent className="space-y-2">
            <h3 className="text-lg font-bold text-pink-800">יום {dayIdx + 1}</h3>
            {exercises.map((exercise, idx) => (
              <div key={idx} className="flex justify-between items-center bg-white p-2 rounded-xl shadow-sm">
                <span>{exercise}</span>
                <Button
                  onClick={() => handleComplete(day, idx)}
                  disabled={completed[`${day}-${idx}`]}
                  className="bg-green-400 hover:bg-green-500 text-white"
                >
                  סיימתי
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
