import { useState } from 'react';
import { useMealLogs } from "@/hooks/useMealLogs";
import AddMealModal from '@/components/AddMealModal';

const Index = () => {
  const { todaysMeals, totalCalories } = useMealLogs();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const currentHour = new Date().getHours();
  const isWeekend = [0, 6].includes(new Date().getDay());
  const showSnackReminder = isWeekend || currentHour >= 17;

  return (
    <div className="min-h-screen bg-white p-6">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold text-black mb-6">Today's Intake</h1>
        
        <div className="space-y-4 mb-6">
          {todaysMeals.map((meal) => (
            <div key={meal.id} className="p-4 border border-gray-200 rounded-lg">
              <div className="flex justify-between items-center">
                <span className="text-black">
                  {meal.qty} × {meal.food.name} - {Math.round(meal.qty * meal.food.kcal)} kcal
                </span>
                <span className="text-sm text-gray-500 capitalize">
                  {meal.meal_type.toLowerCase()}
                </span>
              </div>
            </div>
          ))}
          
          {todaysMeals.length === 0 && (
            <p className="text-gray-500 text-center py-8">No meals logged today</p>
          )}
        </div>
        
        <div className="text-lg font-bold mb-6 text-black">
          Total Calories: {totalCalories} kcal
        </div>
        
        <button
          onClick={() => setIsModalOpen(true)}
          className="w-full bg-white text-black border border-black rounded-2xl px-6 py-3 font-medium hover:bg-gray-50 transition-colors"
        >
          Add Food
        </button>
        
        {showSnackReminder && (
          <p className="text-sm text-gray-600 mt-5 text-center">
            Snack time? Don't forget to log it 🍪
          </p>
        )}
        
        <AddMealModal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
        />
      </div>
    </div>
  );
};

export default Index;
