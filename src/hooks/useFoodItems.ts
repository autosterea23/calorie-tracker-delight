
import { useState, useEffect } from 'react';
import { FoodItem } from './useMealLogs';

const FOOD_ITEMS_KEY = 'food_items';

// Updated food items based on provided CSV data
const DEFAULT_FOOD_ITEMS: Omit<FoodItem, 'id'>[] = [
  // Breakfast items
  { name: 'Idli (2 pcs)', default_qty: 2, unit: 'pcs', kcal: 140, carbs_g: 28, protein_g: 4, fat_g: 1, meal_type: 'Breakfast' },
  { name: 'Dosa (1)', default_qty: 1, unit: 'pcs', kcal: 133, carbs_g: 18, protein_g: 3, fat_g: 5, meal_type: 'Breakfast' },
  { name: 'Poha (1 cup)', default_qty: 1, unit: 'cup', kcal: 180, carbs_g: 35, protein_g: 4, fat_g: 4, meal_type: 'Breakfast' },
  { name: 'Semia upma (1 cup)', default_qty: 1, unit: 'cup', kcal: 190, carbs_g: 32, protein_g: 4, fat_g: 6, meal_type: 'Breakfast' },
  { name: 'Lapsee upma (1 cup)', default_qty: 1, unit: 'cup', kcal: 210, carbs_g: 38, protein_g: 5, fat_g: 5, meal_type: 'Breakfast' },
  { name: 'Rava upma (1 cup)', default_qty: 1, unit: 'cup', kcal: 200, carbs_g: 30, protein_g: 4, fat_g: 8, meal_type: 'Breakfast' },
  { name: 'Ragi kanji (200 ml)', default_qty: 200, unit: 'ml', kcal: 110, carbs_g: 24, protein_g: 2, fat_g: 0, meal_type: 'Breakfast' },
  { name: 'Boiled eggs (2)', default_qty: 2, unit: 'pcs', kcal: 156, carbs_g: 0, protein_g: 12, fat_g: 10, meal_type: 'Breakfast' },
  { name: 'Boiled eggs (3)', default_qty: 3, unit: 'pcs', kcal: 234, carbs_g: 0, protein_g: 18, fat_g: 15, meal_type: 'Breakfast' },
  
  // Lunch items
  { name: 'Rice + Sambar (1 cup)', default_qty: 1, unit: 'cup', kcal: 260, carbs_g: 42, protein_g: 6, fat_g: 5, meal_type: 'Lunch' },
  { name: 'Rice + Rasam (1 cup)', default_qty: 1, unit: 'cup', kcal: 230, carbs_g: 40, protein_g: 4, fat_g: 3, meal_type: 'Lunch' },
  { name: 'Aloo gobi (1 serving)', default_qty: 1, unit: 'serving', kcal: 120, carbs_g: 14, protein_g: 3, fat_g: 5, meal_type: 'Lunch' },
  { name: 'Cauliflower stir-fry (1 serving)', default_qty: 1, unit: 'serving', kcal: 90, carbs_g: 12, protein_g: 2, fat_g: 4, meal_type: 'Lunch' },
  { name: 'Beans poriyal (1 serving)', default_qty: 1, unit: 'serving', kcal: 100, carbs_g: 10, protein_g: 3, fat_g: 5, meal_type: 'Lunch' },
  { name: 'Dudhi (Lauki) kootu (1 serving)', default_qty: 1, unit: 'serving', kcal: 110, carbs_g: 15, protein_g: 4, fat_g: 4, meal_type: 'Lunch' },
  { name: 'Zucchini stir-fry (1 serving)', default_qty: 1, unit: 'serving', kcal: 95, carbs_g: 10, protein_g: 2, fat_g: 6, meal_type: 'Lunch' },
  { name: 'Tomato rice (1 cup)', default_qty: 1, unit: 'cup', kcal: 190, carbs_g: 38, protein_g: 4, fat_g: 3, meal_type: 'Lunch' },
  { name: 'Mexican rice (1 cup)', default_qty: 1, unit: 'cup', kcal: 220, carbs_g: 40, protein_g: 5, fat_g: 5, meal_type: 'Lunch' },
  { name: 'Thai curry with rice (1 cup)', default_qty: 1, unit: 'cup', kcal: 280, carbs_g: 35, protein_g: 6, fat_g: 10, meal_type: 'Lunch' },
  
  // Dinner items
  { name: 'Chapathi (2) + sabzi', default_qty: 2, unit: 'pcs', kcal: 250, carbs_g: 40, protein_g: 6, fat_g: 7, meal_type: 'Dinner' },
  { name: 'Pav bhaji (2 pav)', default_qty: 2, unit: 'pcs', kcal: 350, carbs_g: 45, protein_g: 8, fat_g: 10, meal_type: 'Dinner' },
  { name: 'Bombay chutney (1 bowl)', default_qty: 1, unit: 'bowl', kcal: 120, carbs_g: 20, protein_g: 3, fat_g: 4, meal_type: 'Dinner' },
  { name: 'Leftover lunch (1 cup)', default_qty: 1, unit: 'cup', kcal: 250, carbs_g: 40, protein_g: 5, fat_g: 6, meal_type: 'Dinner' },
  { name: 'Curd rice (1 cup)', default_qty: 1, unit: 'cup', kcal: 200, carbs_g: 35, protein_g: 6, fat_g: 4, meal_type: 'Dinner' },
  
  // Snack items
  { name: 'Banana (medium)', default_qty: 1, unit: 'pcs', kcal: 105, carbs_g: 27, protein_g: 1, fat_g: 0, meal_type: 'Snack' },
  { name: 'Pomegranate (half)', default_qty: 0.5, unit: 'pcs', kcal: 75, carbs_g: 16, protein_g: 1, fat_g: 1, meal_type: 'Snack' },
  { name: 'Green apple (1)', default_qty: 1, unit: 'pcs', kcal: 95, carbs_g: 25, protein_g: 0, fat_g: 0, meal_type: 'Snack' },
  { name: 'Pear (1)', default_qty: 1, unit: 'pcs', kcal: 100, carbs_g: 27, protein_g: 1, fat_g: 0, meal_type: 'Snack' },
  { name: 'Watermelon (1 cup)', default_qty: 1, unit: 'cup', kcal: 46, carbs_g: 12, protein_g: 1, fat_g: 0, meal_type: 'Snack' },
  { name: 'Orange (1)', default_qty: 1, unit: 'pcs', kcal: 62, carbs_g: 15, protein_g: 1, fat_g: 0, meal_type: 'Snack' },
  { name: 'Grapefruit (half)', default_qty: 0.5, unit: 'pcs', kcal: 52, carbs_g: 13, protein_g: 1, fat_g: 0, meal_type: 'Snack' },
  { name: 'Masala chai (150 ml)', default_qty: 150, unit: 'ml', kcal: 80, carbs_g: 12, protein_g: 2, fat_g: 3, meal_type: 'Snack' },
  { name: 'Parle-G (4 biscuits)', default_qty: 4, unit: 'pcs', kcal: 130, carbs_g: 20, protein_g: 2, fat_g: 4, meal_type: 'Snack' },
  { name: 'Oat cookies (2)', default_qty: 2, unit: 'pcs', kcal: 150, carbs_g: 18, protein_g: 2, fat_g: 6, meal_type: 'Snack' },
  { name: 'Chips (small pack)', default_qty: 1, unit: 'pack', kcal: 160, carbs_g: 15, protein_g: 2, fat_g: 10, meal_type: 'Snack' },
  { name: 'Maggi noodles (1 pack)', default_qty: 1, unit: 'pack', kcal: 350, carbs_g: 50, protein_g: 7, fat_g: 14, meal_type: 'Snack' }
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
