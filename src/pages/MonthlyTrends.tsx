
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from "recharts";
import { useMealLogs } from "@/hooks/useMealLogs";
import { useMemo } from "react";

const MonthlyTrends = () => {
  const { mealLogs } = useMealLogs();

  const monthlyData = useMemo(() => {
    const monthlyStats: Record<string, {
      month: string;
      calories: number;
      carbs: number;
      protein: number;
      fat: number;
    }> = {};

    mealLogs.forEach(log => {
      const date = new Date(log.logged_at);
      const monthKey = date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });

      if (!monthlyStats[monthKey]) {
        monthlyStats[monthKey] = {
          month: monthKey,
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

      monthlyStats[monthKey].calories += calories;
      monthlyStats[monthKey].carbs += carbs;
      monthlyStats[monthKey].protein += protein;
      monthlyStats[monthKey].fat += fat;
    });

    return Object.values(monthlyStats).sort((a, b) => new Date(a.month).getTime() - new Date(b.month).getTime());
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
        <h1 className="text-2xl font-bold text-black mb-6">Monthly Nutrition Trends</h1>
        
        <Card>
          <CardHeader>
            <CardTitle>Nutrition Over Time</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[260px]">
              <LineChart data={monthlyData}>
                <XAxis dataKey="month" />
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

export default MonthlyTrends;
