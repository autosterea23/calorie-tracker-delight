
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from "recharts";
import { useMealLogs } from "@/hooks/useMealLogs";
import { useMemo } from "react";

const WeeklyTrends = () => {
  const { mealLogs } = useMealLogs();

  const weeklyData = useMemo(() => {
    const weeklyStats: Record<string, {
      week: string;
      calories: number;
      carbs: number;
      protein: number;
      fat: number;
    }> = {};

    mealLogs.forEach(log => {
      const date = new Date(log.logged_at);
      const year = date.getFullYear();
      const weekOfYear = Math.ceil((date.getTime() - new Date(year, 0, 1).getTime()) / (7 * 24 * 60 * 60 * 1000));
      const weekKey = `Week ${weekOfYear}`;

      if (!weeklyStats[weekKey]) {
        weeklyStats[weekKey] = {
          week: weekKey,
          calories: 0,
          carbs: 0,
          protein: 0,
          fat: 0
        };
      }

      const calories = log.qty * log.food.kcal;
      const carbs = log.qty * log.food.carbs_g;
      const protein = log.qty * log.food.protein_g;
      const fat = log.qty * log.food.fat_g;

      weeklyStats[weekKey].calories += calories;
      weeklyStats[weekKey].carbs += carbs;
      weeklyStats[weekKey].protein += protein;
      weeklyStats[weekKey].fat += fat;
    });

    return Object.values(weeklyStats).sort((a, b) => a.week.localeCompare(b.week));
  }, [mealLogs]);

  const chartConfig = {
    calories: {
      label: "Calories",
      color: "#8884d8"
    },
    carbs: {
      label: "Carbs (g)",
      color: "#82ca9d" 
    },
    protein: {
      label: "Protein (g)",
      color: "#ffc658"
    },
    fat: {
      label: "Fat (g)",
      color: "#ff7300"
    }
  };

  return (
    <div className="min-h-screen bg-white p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-black mb-6">Weekly Nutrition Trends</h1>
        
        <Card>
          <CardHeader>
            <CardTitle>Nutrition Over Time</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[260px]">
              <LineChart data={weeklyData}>
                <XAxis dataKey="week" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line type="monotone" dataKey="calories" stroke="var(--color-calories)" strokeWidth={2} />
                <Line type="monotone" dataKey="carbs" stroke="var(--color-carbs)" strokeWidth={2} />
                <Line type="monotone" dataKey="protein" stroke="var(--color-protein)" strokeWidth={2} />
                <Line type="monotone" dataKey="fat" stroke="var(--color-fat)" strokeWidth={2} />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default WeeklyTrends;
