
import { useState, useEffect } from 'react';

export interface FoodItem {
  id: string;
  name: string;
  default_qty: number;
  unit: string;
  kcal: number;
  carbs_g: number;
  protein_g: number;
  fat_g: number;
}

export interface MealLog {
  id: string;
  logged_at: Date;
  meal_type: 'Breakfast' | 'Lunch' | 'Dinner' | 'Snack';
  qty: number;
  food: FoodItem;
}

const MEAL_LOGS_KEY = 'meal_logs';

export const useMealLogs = () => {
  const [mealLogs, setMealLogs] = useState<MealLog[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load meal logs from localStorage on mount
  useEffect(() => {
    const loadMealLogs = () => {
      try {
        const stored = localStorage.getItem(MEAL_LOGS_KEY);
        if (stored) {
          const parsed = JSON.parse(stored);
          // Convert date strings back to Date objects
          const logs = parsed.map((log: any) => ({
            ...log,
            logged_at: new Date(log.logged_at)
          }));
          setMealLogs(logs);
        }
      } catch (error) {
        console.error('Error loading meal logs:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadMealLogs();
  }, []);

  // Save to localStorage whenever mealLogs changes
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem(MEAL_LOGS_KEY, JSON.stringify(mealLogs));
    }
  }, [mealLogs, isLoading]);

  const addMealLog = async (newLog: Omit<MealLog, 'id'>) => {
    const logWithId = {
      ...newLog,
      id: Date.now().toString()
    };
    setMealLogs(prev => [...prev, logWithId]);
  };

  const deleteMealLog = async (id: string) => {
    setMealLogs(prev => prev.filter(log => log.id !== id));
  };

  // Get today's meals
  const todaysMeals = mealLogs.filter(log => {
    const today = new Date();
    const logDate = new Date(log.logged_at);
    return (
      logDate.getDate() === today.getDate() &&
      logDate.getMonth() === today.getMonth() &&
      logDate.getFullYear() === today.getFullYear()
    );
  });

  // Calculate total calories for today
  const totalCalories = todaysMeals.reduce((total, log) => {
    return total + (log.qty * log.food.kcal);
  }, 0);

  return {
    mealLogs,
    todaysMeals,
    totalCalories: Math.round(totalCalories),
    isLoading,
    addMealLog,
    deleteMealLog
  };
};
