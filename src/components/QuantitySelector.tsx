// @/components/QuantitySelector.tsx

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Minus, Plus } from "lucide-react";

// Define the properties the component will accept
interface QuantitySelectorProps {
  quantity: number;
  onQuantityChange: (newQuantity: number) => void;
}

const QuantitySelector = ({ quantity, onQuantityChange }: QuantitySelectorProps) => {
  
  // Decrease quantity, but not below 1
  const handleDecrement = () => {
    onQuantityChange(Math.max(1, quantity - 1));
  };

  // Increase quantity, you can add a max limit if needed
  const handleIncrement = () => {
    onQuantityChange(quantity + 1); 
  };

  return (
    <div className="flex items-center gap-2">
      <Button variant="outline" size="icon" onClick={handleDecrement} className="h-10 w-10">
        <Minus className="h-4 w-4" />
      </Button>

      <Input
        type="text"
        readOnly // Make it read-only so users must use the buttons
        value={quantity}
        className="w-16 h-10 text-center text-base font-semibold"
      />

      <Button variant="outline" size="icon" onClick={handleIncrement} className="h-10 w-10">
        <Plus className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default QuantitySelector;