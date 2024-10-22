import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Plus, X } from 'lucide-react';

const PizzaRecipeCalculator = () => {
  const [size, setSize] = useState('medium');
  const [style, setStyle] = useState('thin');
  const [toppings, setToppings] = useState([]);
  const [newTopping, setNewTopping] = useState('');
  const [commonToppings] = useState([
    'Cheese', 'Pepperoni', 'Mushrooms', 'Onions', 'Bell Peppers'
  ]);

  const handleAddTopping = () => {
    if (newTopping.trim() && !toppings.includes(newTopping.trim())) {
      setToppings([...toppings, newTopping.trim()]);
      setNewTopping('');
    }
  };

  const handleRemoveTopping = (topping) => {
    setToppings(toppings.filter(t => t !== topping));
  };

  const calculateIngredients = () => {
    let baseFlour = size === 'small' ? 250 : size === 'medium' ? 300 : 375;
    let water = Math.round(baseFlour * 0.6);
    let salt = Math.round(baseFlour * 0.02);
    let yeast = Math.round(baseFlour * 0.006);
    
    if (style === 'thick') {
      baseFlour = Math.round(baseFlour * 1.2);
      water = Math.round(water * 1.2);
    }

    return { baseFlour, water, salt, yeast };
  };

  const { baseFlour, water, salt, yeast } = calculateIngredients();

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>Pizza Recipe Calculator</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Pizza Size</label>
            <Select value={size} onValueChange={setSize}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="small">Small (10")</SelectItem>
                <SelectItem value="medium">Medium (12")</SelectItem>
                <SelectItem value="large">Large (14")</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Crust Style</label>
            <Select value={style} onValueChange={setStyle}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="thin">Thin Crust</SelectItem>
                <SelectItem value="thick">Thick Crust</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Common Toppings</label>
            <div className="space-y-2">
              {commonToppings.map((topping) => (
                <div key={topping} className="flex items-center space-x-2">
                  <Checkbox 
                    checked={toppings.includes(topping)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setToppings([...toppings, topping]);
                      } else {
                        setToppings(toppings.filter(t => t !== topping));
                      }
                    }}
                  />
                  <label className="text-sm">{topping}</label>
                </div>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Add Custom Topping</label>
            <div className="flex space-x-2">
              <Input
                type="text"
                value={newTopping}
                onChange={(e) => setNewTopping(e.target.value)}
                placeholder="Enter custom topping"
                className="flex-1"
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    handleAddTopping();
                  }
                }}
              />
              <Button onClick={handleAddTopping} size="sm">
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {toppings.length > 0 && (
            <div>
              <label className="block text-sm font-medium mb-2">Selected Toppings</label>
              <div className="flex flex-wrap gap-2">
                {toppings.map((topping) => (
                  <div
                    key={topping}
                    className="flex items-center bg-gray-100 rounded-full px-3 py-1"
                  >
                    <span className="text-sm">{topping}</span>
                    <button
                      onClick={() => handleRemoveTopping(topping)}
                      className="ml-2 text-gray-500 hover:text-gray-700"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h3 className="text-lg font-medium mb-4">Your Pizza Recipe</h3>
          
          <div className="space-y-4">
            <h4 className="font-medium">Dough Ingredients:</h4>
            <ul className="list-disc pl-5 space-y-2">
              <li>All-purpose flour: {baseFlour}g</li>
              <li>Warm water: {water}ml</li>
              <li>Salt: {salt}g</li>
              <li>Active dry yeast: {yeast}g</li>
              <li>Olive oil: 2 tablespoons</li>
            </ul>

            {toppings.length > 0 && (
              <>
                <h4 className="font-medium">Toppings:</h4>
                <ul className="list-disc pl-5 space-y-2">
                  {toppings.map(topping => (
                    <li key={topping}>{topping}</li>
                  ))}
                </ul>
              </>
            )}

            <h4 className="font-medium">Instructions:</h4>
            <ol className="list-decimal pl-5 space-y-2">
              <li>In a large bowl, combine flour and salt</li>
              <li>In a separate bowl, dissolve yeast in warm water and let stand for 5 minutes</li>
              <li>Mix water/yeast mixture into flour, add olive oil</li>
              <li>Knead for 10 minutes until smooth</li>
              <li>Let rise in a covered bowl for 1 hour</li>
              <li>Punch down and shape into a {size} {style} crust pizza</li>
              <li>Add toppings and bake at 450°F (230°C) for 15-20 minutes</li>
            </ol>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PizzaRecipeCalculator;
