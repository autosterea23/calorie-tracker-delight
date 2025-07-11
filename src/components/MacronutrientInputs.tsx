
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface FormData {
  carbs_g: string;
  protein_g: string;
  fat_g: string;
}

interface MacronutrientInputsProps {
  formData: FormData;
  onInputChange: (field: string, value: string) => void;
}

const MacronutrientInputs: React.FC<MacronutrientInputsProps> = ({ formData, onInputChange }) => {
  return (
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
            onChange={(e) => onInputChange('carbs_g', e.target.value)}
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
            onChange={(e) => onInputChange('protein_g', e.target.value)}
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
            onChange={(e) => onInputChange('fat_g', e.target.value)}
            placeholder="0"
            min="0"
            step="0.1"
            className="border-2 border-gray-200 rounded-lg text-sm"
          />
        </div>
      </div>
    </div>
  );
};

export default MacronutrientInputs;
