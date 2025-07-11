
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

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

interface NewFoodFormInputsProps {
  formData: FormData;
  onInputChange: (field: string, value: string) => void;
}

const NewFoodFormInputs: React.FC<NewFoodFormInputsProps> = ({ formData, onInputChange }) => {
  const mealTypes = ['Breakfast', 'Lunch', 'Dinner', 'Snack'];

  return (
    <>
      {/* Food Name */}
      <div className="space-y-2">
        <Label htmlFor="name" className="text-sm font-semibold">
          Food Name *
        </Label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) => onInputChange('name', e.target.value)}
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
            onChange={(e) => onInputChange('default_qty', e.target.value)}
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
            onChange={(e) => onInputChange('unit', e.target.value)}
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
        <Select value={formData.meal_type} onValueChange={(value) => onInputChange('meal_type', value)}>
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
          onChange={(e) => onInputChange('kcal', e.target.value)}
          placeholder="0"
          min="0"
          step="0.1"
          className="border-2 border-gray-200 rounded-xl"
          required
        />
      </div>
    </>
  );
};

export default NewFoodFormInputs;
