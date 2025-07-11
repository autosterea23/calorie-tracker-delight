
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import WeeklyTrends from "./WeeklyTrends";
import MonthlyTrends from "./MonthlyTrends";
import YearlyTrends from "./YearlyTrends";

const NutrientTrends = () => {
  return (
    <div className="min-h-screen bg-white p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-black mb-6">Nutrient Trends</h1>
        
        <Tabs defaultValue="weekly" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="weekly">Weekly</TabsTrigger>
            <TabsTrigger value="monthly">Monthly</TabsTrigger>
            <TabsTrigger value="yearly">Yearly</TabsTrigger>
          </TabsList>
          
          <TabsContent value="weekly" className="mt-6">
            <WeeklyTrends />
          </TabsContent>
          
          <TabsContent value="monthly" className="mt-6">
            <MonthlyTrends />
          </TabsContent>
          
          <TabsContent value="yearly" className="mt-6">
            <YearlyTrends />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default NutrientTrends;
