
import React, { useState, useMemo } from 'react';
import { X, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useFoodItems } from '@/hooks/useFoodItems';
import { useMealLogs } from '@/hooks/useMealLogs';
import NewFoodForm from './NewFoodForm';
import { useToast } from '@/hooks/use-toast';

interface AddMealModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddMealModal: React.FC<AddMealModalProps> = ({ isOpen, onClose }) => {
  const [selectedMealType, setSelectedMealType] = useState<string>('');
  const [selectedFood, setSelectedFood] = useState<string>('');
  const [quantity, setQuantity] = useState<string>('1');
  const [showNewFoodForm, setShowNewFoodForm] = useState(false);
  
  const { foodItems } = useFoodItems();
  const { addMealLog } = useMealLogs();
  const { toast } = useToast();

  const mealTypes = ['Breakfast', 'Lunch', 'Dinner', 'Snack'];

  // Filter foods based on selected meal type
  const filteredFoodItems = useMemo(() => {
    if (!selectedMealType) return foodItems;
    return foodItems.filter(item => item.meal_type === selectedMealType);
  }, [foodItems, selectedMealType]);

  // Reset selected food when meal type changes
  React.useEffect(() => {
    setSelectedFood('');
  }, [selectedMealType]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedMealType || !selectedFood || !quantity) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields.",
        variant: "destructive"
      });
      return;
    }

    const selectedFoodItem = foodItems.find(item => item.id === selectedFood);
    if (!selectedFoodItem) return;

    try {
      await addMealLog({
        logged_at: new Date(),
        meal_type: selectedMealType as 'Breakfast' | 'Lunch' | 'Dinner' | 'Snack',
        qty: parseFloat(quantity),
        food: selectedFoodItem
      });

      toast({
        title: "Meal Logged!",
        description: `Added ${quantity} × ${selectedFoodItem.name}`,
      });

      // Reset form
      setSelectedMealType('');
      setSelectedFood('');
      setQuantity('1');
      onClose();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to log meal. Please try again.",
        variant: "destructive"
      });
    }
  };

  if (!isOpen) return null;

  if (showNewFoodForm) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
          <NewFoodForm 
            onClose={() => setShowNewFoodForm(false)}
            onSuccess={() => {
              setShowNewFoodForm(false);
              toast({
                title: "Food Added!",
                description: "New food item has been added to your database.",
              });
            }}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-md border-2 border-black bg-white rounded-2xl">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl font-bold">Log Meal</CardTitle>
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
        
        <CardContent className="space-y-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Meal Type */}
            <div className="space-y-2">
              <Label htmlFor="meal-type" className="text-sm font-semibold">
                Meal
              </Label>
              <Select value={selectedMealType} onValueChange={setSelectedMealType}>
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

            {/* Food Selection */}
            <div className="space-y-2">
              <Label htmlFor="food" className="text-sm font-semibold">
                Food {selectedMealType && `(${selectedMealType} items)`}
              </Label>
              <Select value={selectedFood} onValueChange={setSelectedFood} disabled={!selectedMealType}>
                <SelectTrigger className="border-2 border-gray-200 rounded-xl">
                  <SelectValue placeholder={selectedMealType ? "Select food item" : "Select meal type first"} />
                </SelectTrigger>
                <SelectContent>
                  {filteredFoodItems.map(food => (
                    <SelectItem key={food.id} value={food.id}>
                      {food.name} ({food.kcal} kcal per {food.unit})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Quantity */}
            <div className="space-y-2">
              <Label htmlFor="quantity" className="text-sm font-semibold">
                Quantity
              </Label>
              <Input
                id="quantity"
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                placeholder="1"
                min="0.1"
                step="0.1"
                className="border-2 border-gray-200 rounded-xl"
              />
            </div>

            {/* Submit Button */}
            <Button 
              type="submit"
              className="w-full h-12 bg-black text-white hover:bg-gray-800 rounded-xl font-semibold"
            >
              Log Food
            </Button>
          </form>

          {/* Add New Food Button */}
          <Button
            onClick={() => setShowNewFoodForm(true)}
            variant="outline"
            className="w-full h-12 border-2 border-black text-black hover:bg-black hover:text-white rounded-xl font-semibold"
          >
            <Plus className="h-4 w-4 mr-2" />
            New Food Item
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddMealModal;
