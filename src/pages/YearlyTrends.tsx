
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from "recharts";
import { useMealLogs } from "@/hooks/useMealLogs";
import { useMemo } from "react";

const YearlyTrends = () => {
  const { mealLogs } = useMealLogs();

  const yearlyData = useMemo(() => {
    const yearlyStats: Record<string, {
      year: string;
      calories: number;
      carbs: number;
      protein: number;
      fat: number;
    }> = {};

    mealLogs.forEach(log => {
      const date = new Date(log.logged_at);
      const year = date.getFullYear().toString();

      if (!yearlyStats[year]) {
        yearlyStats[year] = {
          year,
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

      yearlyStats[year].calories += calories;
      yearlyStats[year].carbs += carbs;
      yearlyStats[year].protein += protein;
      yearlyStats[year].fat += fat;
    });

    return Object.values(yearlyStats).sort((a, b) => a.year.localeCompare(b.year));
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
        <h1 className="text-2xl font-bold text-black mb-6">Yearly Nutrition Trends</h1>
        
        <Card>
          <CardHeader>
            <CardTitle>Nutrition Over Time</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[260px]">
              <LineChart data={yearlyData}>
                <XAxis dataKey="year" />
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

export default YearlyTrends;
