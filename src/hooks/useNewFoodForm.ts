
import { useState } from 'react';
import { useFoodItems } from '@/hooks/useFoodItems';
import { useToast } from '@/hooks/use-toast';

interface FormData {
  name: string;
  default_qty: string;
  unit: string;
  kcal: string;
  carbs_g: string;
  protein_g: string;
  fat_g: string;
  meal_type: string;
}

export const useNewFoodForm = (onSuccess: () => void) => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    default_qty: '1',
    unit: '',
    kcal: '',
    carbs_g: '',
    protein_g: '',
    fat_g: '',
    meal_type: ''
  });

  const { addFoodItem } = useFoodItems();
  const { toast } = useToast();

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.unit || !formData.kcal || !formData.meal_type) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields (name, unit, calories, meal type).",
        variant: "destructive"
      });
      return;
    }

    try {
      await addFoodItem({
        name: formData.name,
        default_qty: parseFloat(formData.default_qty) || 1,
        unit: formData.unit,
        kcal: parseFloat(formData.kcal) || 0,
        carbs_g: parseFloat(formData.carbs_g) || 0,
        protein_g: parseFloat(formData.protein_g) || 0,
        fat_g: parseFloat(formData.fat_g) || 0,
        meal_type: formData.meal_type as 'Breakfast' | 'Lunch' | 'Dinner' | 'Snack'
      });

      onSuccess();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save food item. Please try again.",
        variant: "destructive"
      });
    }
  };

  return {
    formData,
    handleInputChange,
    handleSubmit
  };
};
