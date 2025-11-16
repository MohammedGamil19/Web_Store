// @/components/ProductDetail.tsx

import { useState } from "react";
import { useNavigate } from "react-router-dom"; // --- FIX #1: Import for navigation ---
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, ShoppingCart } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { useWishlist } from "@/hooks/useWishlist";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { Product, isProductSoldOut } from "@/data/products";
import QuantitySelector from "./QuantitySelector"; // --- FIX #2: Import QuantitySelector ---

interface ProductDetailProps {
  product: Product;
  children: React.ReactNode;
}

const ProductDetail = ({ product, children }: ProductDetailProps) => {
  const firstAvailableSize = product.inventory.find(item => item.stock > 0)?.size || "";
  const [selectedSize, setSelectedSize] = useState<string>(firstAvailableSize);
  const [quantity, setQuantity] = useState(1);
  const [open, setOpen] = useState(false);
  
  const navigate = useNavigate(); // --- FIX #3: Initialize navigate hook ---
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { toast } = useToast();

  const isCompletelySoldOut = isProductSoldOut(product);
  const isWishlisted = isInWishlist(product.id);

  const handleAddToCart = () => {
    if (isCompletelySoldOut) return;
    if (!selectedSize) {
        toast({ title: "Please select an available size", variant: "destructive" });
        return;
    }
    
    addToCart({
      id: `${product.id}-${selectedSize}`,
      name: `${product.name} (${selectedSize})`,
      price: product.price,
      image: product.image,
      category: product.category,
      quantity: quantity, // --- FIX #4: Pass the quantity to the cart ---
    });

    toast({ title: "Added to cart", description: `${quantity}x ${product.name} (${selectedSize}) added.` });
    setOpen(false); // Close the dialog after adding to cart
  };
  
  const handleBuyNow = () => {
    if (isCompletelySoldOut || !selectedSize) {
      handleAddToCart(); // This will trigger the size-selection toast
      return;
    }
    handleAddToCart();
    navigate('/checkout'); // Redirect to checkout
  };
  
  // --- FIX #5: Add function to handle wishlist toggle ---
  const handleToggleWishlist = () => {
    if (isWishlisted) {
      removeFromWishlist(product.id);
      toast({ title: "Removed from wishlist" });
    } else {
      addToWishlist(product);
      toast({ title: "Added to wishlist" });
    }
  };


  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-0">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* Product Image */}
          <div className="relative">
            <img src={product.image} alt={product.name} className="w-full h-full object-cover"/>
          </div>

          {/* Product Details */}
          <div className="p-8 flex flex-col space-y-6">
            <h1 className="text-2xl lg:text-3xl font-medium">{product.name}</h1>
            
            {/* Price */}
            <div className="flex items-center gap-3">
              <span className="text-2xl font-semibold text-primary">Rp {product.price.toLocaleString()}</span>
              {product.originalPrice && (
                <span className="text-lg text-muted-foreground line-through">Rp {product.originalPrice.toLocaleString()}</span>
              )}
            </div>

            {/* Size Selection */}
            <div>
              <h3 className="text-lg font-medium mb-3">Size</h3>
              <div className="flex flex-wrap gap-3">
                {product.inventory.map((item) => (
                  <Button
                    key={item.size}
                    variant={selectedSize === item.size ? "default" : "outline"}
                    onClick={() => setSelectedSize(item.size)}
                    disabled={item.stock === 0}
                    className={cn(
                      "w-14 h-12 text-base",
                      item.stock === 0 && "line-through opacity-50 cursor-not-allowed"
                    )}
                  >
                    {item.size}
                  </Button>
                ))}
              </div>
            </div>

            {/* --- FIX #6: Add the QuantitySelector component --- */}
            <div>
              <h3 className="text-lg font-medium mb-3">Quantity</h3>
              <QuantitySelector quantity={quantity} onQuantityChange={setQuantity} />
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3">
              <Button
                className="w-full"
                onClick={handleAddToCart}
                disabled={isCompletelySoldOut}
                variant="outline"
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                {isCompletelySoldOut ? "Sold Out" : "Add to Cart"}
              </Button>
              <Button
                size="icon"
                variant="outline"
                onClick={handleToggleWishlist}
              >
                <Heart className={cn("w-5 h-5", isWishlisted && "fill-destructive text-destructive")} />
              </Button>
            </div>
            
             <Button
                className="w-full"
                onClick={handleBuyNow}
                disabled={isCompletelySoldOut}
            >
                Buy Now
            </Button>


            {/* Description */}
            <div className="pt-4 border-t">
              <h4 className="font-medium mb-2">Description:</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">{product.description}</p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductDetail;