
import { useState, useEffect } from 'react';
import { FoodItem } from './useMealLogs';

const FOOD_ITEMS_KEY = 'food_items';

// Default food items to populate the database
const DEFAULT_FOOD_ITEMS: Omit<FoodItem, 'id'>[] = [
  { name: 'Apple', default_qty: 1, unit: 'piece', kcal: 95, carbs_g: 25, protein_g: 0.5, fat_g: 0.3 },
  { name: 'Banana', default_qty: 1, unit: 'piece', kcal: 105, carbs_g: 27, protein_g: 1.3, fat_g: 0.4 },
  { name: 'White Rice', default_qty: 1, unit: 'cup', kcal: 205, carbs_g: 45, protein_g: 4.3, fat_g: 0.4 },
  { name: 'Chicken Breast', default_qty: 100, unit: 'g', kcal: 165, carbs_g: 0, protein_g: 31, fat_g: 3.6 },
  { name: 'Whole Milk', default_qty: 1, unit: 'cup', kcal: 150, carbs_g: 12, protein_g: 8, fat_g: 8 },
  { name: 'Bread Slice', default_qty: 1, unit: 'slice', kcal: 80, carbs_g: 15, protein_g: 3, fat_g: 1 },
  { name: 'Egg', default_qty: 1, unit: 'piece', kcal: 70, carbs_g: 0.6, protein_g: 6, fat_g: 5 },
  { name: 'Oatmeal', default_qty: 1, unit: 'cup', kcal: 150, carbs_g: 27, protein_g: 5, fat_g: 3 }
];

export const useFoodItems = () => {
  const [foodItems, setFoodItems] = useState<FoodItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load food items from localStorage on mount
  useEffect(() => {
    const loadFoodItems = () => {
      try {
        const stored = localStorage.getItem(FOOD_ITEMS_KEY);
        if (stored) {
          const parsed = JSON.parse(stored);
          setFoodItems(parsed);
        } else {
          // Initialize with default food items
          const defaultItems = DEFAULT_FOOD_ITEMS.map((item, index) => ({
            ...item,
            id: (index + 1).toString()
          }));
          setFoodItems(defaultItems);
        }
      } catch (error) {
        console.error('Error loading food items:', error);
        // Fallback to default items
        const defaultItems = DEFAULT_FOOD_ITEMS.map((item, index) => ({
          ...item,
          id: (index + 1).toString()
        }));
        setFoodItems(defaultItems);
      } finally {
        setIsLoading(false);
      }
    };

    loadFoodItems();
  }, []);

  // Save to localStorage whenever foodItems changes
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem(FOOD_ITEMS_KEY, JSON.stringify(foodItems));
    }
  }, [foodItems, isLoading]);

  const addFoodItem = async (newItem: Omit<FoodItem, 'id'>) => {
    const itemWithId = {
      ...newItem,
      id: Date.now().toString()
    };
    setFoodItems(prev => [...prev, itemWithId]);
  };

  const updateFoodItem = async (id: string, updates: Partial<FoodItem>) => {
    setFoodItems(prev => prev.map(item => 
      item.id === id ? { ...item, ...updates } : item
    ));
  };

  const deleteFoodItem = async (id: string) => {
    setFoodItems(prev => prev.filter(item => item.id !== id));
  };

  return {
    foodItems,
    isLoading,
    addFoodItem,
    updateFoodItem,
    deleteFoodItem
  };
};
