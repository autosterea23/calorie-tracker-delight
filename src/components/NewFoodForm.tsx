
import React, { useState } from 'react';
import { X, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useFoodItems } from '@/hooks/useFoodItems';
import { useToast } from '@/hooks/use-toast';

interface NewFoodFormProps {
  onClose: () => void;
  onSuccess: () => void;
}

const NewFoodForm: React.FC<NewFoodFormProps> = ({ onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
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

  const mealTypes = ['Breakfast', 'Lunch', 'Dinner', 'Snack'];

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

  return (
    <Card className="border-2 border-black">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-bold">New Food Item</CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="h-8 w-8 p-0 hover:bg-gray-100"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Food Name */}
          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm font-semibold">
              Food Name *
            </Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              placeholder="e.g., Idli, Rice + Sambar, Masala Chai"
              className="border-2 border-gray-200 rounded-xl"
              required
            />
          </div>

          {/* Default Quantity and Unit */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label htmlFor="default_qty" className="text-sm font-semibold">
                Default Quantity
              </Label>
              <Input
                id="default_qty"
                type="number"
                value={formData.default_qty}
                onChange={(e) => handleInputChange('default_qty', e.target.value)}
                placeholder="1"
                min="0.1"
                step="0.1"
                className="border-2 border-gray-200 rounded-xl"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="unit" className="text-sm font-semibold">
                Unit *
              </Label>
              <Input
                id="unit"
                value={formData.unit}
                onChange={(e) => handleInputChange('unit', e.target.value)}
                placeholder="pcs, cup, ml, serving"
                className="border-2 border-gray-200 rounded-xl"
                required
              />
            </div>
          </div>

          {/* Meal Type */}
          <div className="space-y-2">
            <Label htmlFor="meal_type" className="text-sm font-semibold">
              Meal Type *
            </Label>
            <Select value={formData.meal_type} onValueChange={(value) => handleInputChange('meal_type', value)}>
              <SelectTrigger className="border-2 border-gray-200 rounded-xl">
                <SelectValue placeholder="Select meal type" />
              </SelectTrigger>
              <SelectContent>
                {mealTypes.map(type => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Calories */}
          <div className="space-y-2">
            <Label htmlFor="kcal" className="text-sm font-semibold">
              Calories (kcal) *
            </Label>
            <Input
              id="kcal"
              type="number"
              value={formData.kcal}
              onChange={(e) => handleInputChange('kcal', e.target.value)}
              placeholder="0"
              min="0"
              step="0.1"
              className="border-2 border-gray-200 rounded-xl"
              required
            />
          </div>

          {/* Macronutrients */}
          <div className="space-y-3">
            <Label className="text-sm font-semibold text-gray-700">
              Macronutrients (optional)
            </Label>
            <div className="grid grid-cols-3 gap-3">
              <div className="space-y-1">
                <Label htmlFor="carbs_g" className="text-xs text-gray-600">
                  Carbs (g)
                </Label>
                <Input
                  id="carbs_g"
                  type="number"
                  value={formData.carbs_g}
                  onChange={(e) => handleInputChange('carbs_g', e.target.value)}
                  placeholder="0"
                  min="0"
                  step="0.1"
                  className="border-2 border-gray-200 rounded-lg text-sm"
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="protein_g" className="text-xs text-gray-600">
                  Protein (g)
                </Label>
                <Input
                  id="protein_g"
                  type="number"
                  value={formData.protein_g}
                  onChange={(e) => handleInputChange('protein_g', e.target.value)}
                  placeholder="0"
                  min="0"
                  step="0.1"
                  className="border-2 border-gray-200 rounded-lg text-sm"
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="fat_g" className="text-xs text-gray-600">
                  Fat (g)
                </Label>
                <Input
                  id="fat_g"
                  type="number"
                  value={formData.fat_g}
                  onChange={(e) => handleInputChange('fat_g', e.target.value)}
                  placeholder="0"
                  min="0"
                  step="0.1"
                  className="border-2 border-gray-200 rounded-lg text-sm"
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <Button 
            type="submit"
            className="w-full h-12 bg-black text-white hover:bg-gray-800 rounded-xl font-semibold mt-6"
          >
            <Save className="h-4 w-4 mr-2" />
            Save Food
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default NewFoodForm;
