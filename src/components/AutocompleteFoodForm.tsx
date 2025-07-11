
import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useFoodItems } from '@/hooks/useFoodItems';
import { useToast } from '@/hooks/use-toast';
import { Search } from 'lucide-react';

interface AutocompleteFoodFormProps {
  onSuccess: () => void;
}

const FOOD_SUGGESTIONS = [
  "Idli (2 pcs)", "Dosa (1)", "Poha (1 cup)", "Semia upma (1 cup)", "Lapsee upma (1 cup)",
  "Rava upma (1 cup)", "Ragi kanji (200 ml)", "Boiled eggs (2)", "Boiled eggs (3)",
  "Rice + Sambar (1 cup)", "Rice + Rasam (1 cup)", "Aloo gobi (1 serving)",
  "Cauliflower stir-fry (1 serving)", "Beans poriyal (1 serving)", "Dudhi kootu (1 serving)",
  "Zucchini stir-fry (1 serving)", "Tomato rice (1 cup)", "Mexican rice (1 cup)",
  "Thai curry with rice (1 cup)", "Chapathi (2) + sabzi", "Pav bhaji (2 pav)",
  "Bombay chutney (1 bowl)", "Leftover lunch (1 cup)", "Curd rice (1 cup)",
  "Banana", "Pomegranate", "Green apple", "Pear", "Watermelon",
  "Orange", "Grapefruit", "Masala chai", "Parle-G", "Oat cookies",
  "Chips", "Maggi noodles"
];

const AutocompleteFoodForm: React.FC<AutocompleteFoodFormProps> = ({ onSuccess }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [mealType, setMealType] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const { foodItems, addFoodItem } = useFoodItems();
  const { toast } = useToast();

  const filteredSuggestions = useMemo(() => {
    if (!searchTerm) return FOOD_SUGGESTIONS.slice(0, 5);
    return FOOD_SUGGESTIONS.filter(item => 
      item.toLowerCase().includes(searchTerm.toLowerCase())
    ).slice(0, 5);
  }, [searchTerm]);

  const handleSuggestionSelect = (suggestion: string) => {
    setSearchTerm(suggestion);
    setShowSuggestions(false);
    
    // Find existing food item to prefill nutrition data
    const existingFood = foodItems.find(item => 
      item.name.toLowerCase() === suggestion.toLowerCase()
    );
    
    if (existingFood) {
      setMealType(existingFood.meal_type);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!searchTerm || !mealType) {
      toast({
        title: "Missing Information",
        description: "Please enter a food name and select meal type.",
        variant: "destructive"
      });
      return;
    }

    // Check if food already exists
    const existingFood = foodItems.find(item => 
      item.name.toLowerCase() === searchTerm.toLowerCase()
    );

    if (existingFood) {
      toast({
        title: "Food Already Exists",
        description: "This food item is already in your database.",
        variant: "destructive"
      });
      return;
    }

    try {
      await addFoodItem({
        name: searchTerm,
        default_qty: 1,
        unit: 'serving',
        kcal: 0,
        carbs_g: 0,
        protein_g: 0,
        fat_g: 0,
        meal_type: mealType as 'Breakfast' | 'Lunch' | 'Dinner' | 'Snack'
      });

      toast({
        title: "Success",
        description: "Food item created successfully!",
      });

      onSuccess();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create food item. Please try again.",
        variant: "destructive"
      });
    }
  };

  return (
    <Card className="border-2 border-black">
      <CardHeader>
        <CardTitle className="text-xl font-bold">Search or Create Food Item</CardTitle>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2 relative">
            <Label htmlFor="food-search" className="text-sm font-semibold">
              Food Name *
            </Label>
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="food-search"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setShowSuggestions(true);
                }}
                onFocus={() => setShowSuggestions(true)}
                placeholder="Search for food items..."
                className="pl-10 border-2 border-gray-200 rounded-xl"
                required
              />
            </div>
            
            {showSuggestions && filteredSuggestions.length > 0 && (
              <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-48 overflow-y-auto">
                {filteredSuggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => handleSuggestionSelect(suggestion)}
                    className="w-full px-4 py-2 text-left hover:bg-gray-100 first:rounded-t-lg last:rounded-b-lg"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="meal_type" className="text-sm font-semibold">
              Meal Type *
            </Label>
            <Select value={mealType} onValueChange={setMealType}>
              <SelectTrigger className="border-2 border-gray-200 rounded-xl">
                <SelectValue placeholder="Select meal type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Breakfast">Breakfast</SelectItem>
                <SelectItem value="Lunch">Lunch</SelectItem>
                <SelectItem value="Dinner">Dinner</SelectItem>
                <SelectItem value="Snack">Snack</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button 
            type="submit"
            className="w-full h-12 bg-black text-white hover:bg-gray-800 rounded-xl font-semibold mt-6"
          >
            Save Food
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default AutocompleteFoodForm;
