
import React, { useState, useEffect } from 'react';
import { Plus, Calendar, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AddMealModal from '@/components/AddMealModal';
import { useMealLogs } from '@/hooks/useMealLogs';
import { format } from 'date-fns';

const Index = () => {
  const [showAddMeal, setShowAddMeal] = useState(false);
  const { todaysMeals, totalCalories, isLoading } = useMealLogs();

  const mealTypeColors = {
    Breakfast: 'bg-yellow-100 border-yellow-300',
    Lunch: 'bg-orange-100 border-orange-300', 
    Dinner: 'bg-blue-100 border-blue-300',
    Snack: 'bg-green-100 border-green-300'
  };

  const mealTypeIcons = {
    Breakfast: '🌅',
    Lunch: '☀️',
    Dinner: '🌙',
    Snack: '🍎'
  };

  // Check if it's snack time (weekends or after 5 PM)
  const isSnackTime = () => {
    const now = new Date();
    const isWeekend = now.getDay() === 0 || now.getDay() === 6; // Sunday = 0, Saturday = 6
    const isEvening = now.getHours() >= 17;
    return isWeekend || isEvening;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your meals...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white p-4 max-w-md mx-auto">
      <div className="space-y-6">
        {/* Header */}
        <div className="text-center py-6">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Calendar className="h-6 w-6" />
            <h1 className="text-2xl font-bold text-black">Today's Intake</h1>
          </div>
          <p className="text-gray-600">{format(new Date(), 'EEEE, MMMM do')}</p>
        </div>

        {/* Total Calories Card */}
        <Card className="border-2 border-black bg-gray-50">
          <CardContent className="p-6 text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <TrendingUp className="h-5 w-5 text-black" />
              <span className="text-lg font-semibold">Total Calories</span>
            </div>
            <div className="text-3xl font-bold text-black">
              {totalCalories} <span className="text-lg font-normal">kcal</span>
            </div>
          </CardContent>
        </Card>

        {/* Meals List */}
        <div className="space-y-3">
          {todaysMeals.length === 0 ? (
            <Card className="border border-gray-200">
              <CardContent className="p-6 text-center text-gray-500">
                <p>No meals logged today</p>
                <p className="text-sm mt-1">Start tracking your intake!</p>
              </CardContent>
            </Card>
          ) : (
            todaysMeals.map((meal, index) => (
              <Card 
                key={index} 
                className={`border-2 transition-all hover:shadow-md ${mealTypeColors[meal.meal_type] || 'border-gray-200'}`}
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{mealTypeIcons[meal.meal_type] || '🍽️'}</span>
                      <div>
                        <div className="font-semibold text-black">
                          {meal.qty} × {meal.food.name}
                        </div>
                        <div className="text-sm text-gray-600">
                          {meal.meal_type} • {meal.qty * meal.food.kcal} kcal
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-lg text-black">
                        {meal.qty * meal.food.kcal}
                      </div>
                      <div className="text-xs text-gray-500">kcal</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {/* Add Food Button */}
        <Button 
          onClick={() => setShowAddMeal(true)}
          className="w-full h-14 text-lg font-semibold bg-white text-black border-2 border-black hover:bg-black hover:text-white transition-colors duration-200 rounded-2xl"
        >
          <Plus className="h-6 w-6 mr-2" />
          Add Food
        </Button>

        {/* Conditional Snack Reminder */}
        {isSnackTime() && (
          <Card className="border border-gray-300 bg-gray-50">
            <CardContent className="p-4 text-center">
              <p className="text-sm text-gray-600">
                Snack time? Don't forget to log it 🍪
              </p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Add Meal Modal */}
      <AddMealModal 
        isOpen={showAddMeal} 
        onClose={() => setShowAddMeal(false)} 
      />
    </div>
  );
};

export default Index;
