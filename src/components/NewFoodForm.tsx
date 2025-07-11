
import React from 'react';
import { X, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import NewFoodFormInputs from './NewFoodFormInputs';
import MacronutrientInputs from './MacronutrientInputs';
import { useNewFoodForm } from '@/hooks/useNewFoodForm';

interface NewFoodFormProps {
  onClose: () => void;
  onSuccess: () => void;
}

const NewFoodForm: React.FC<NewFoodFormProps> = ({ onClose, onSuccess }) => {
  const { formData, handleInputChange, handleSubmit } = useNewFoodForm(onSuccess);

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
          <NewFoodFormInputs 
            formData={formData} 
            onInputChange={handleInputChange} 
          />
          
          <MacronutrientInputs 
            formData={formData} 
            onInputChange={handleInputChange} 
          />

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
