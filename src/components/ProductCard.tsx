// @/components/ProductCard.tsx

import React from "react";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Heart } from "lucide-react";
import { useWishlist } from "@/hooks/useWishlist";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  isSoldOut?: boolean;
  quickViewTrigger?: React.ReactNode; 
}

const ProductCard = React.forwardRef<HTMLDivElement, ProductCardProps>(
  ({ id, name, price, image, category, isSoldOut, quickViewTrigger }, ref) => {
    const { toast } = useToast();
    const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

    const handleWishlistToggle = (e: React.MouseEvent) => {
      e.preventDefault();
      if (isInWishlist(id)) removeFromWishlist(id);
      else addToWishlist({ id, name, price, image, category });
    };
    
    const handleCardClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
      if (isSoldOut) {
        e.preventDefault();
        toast({
          title: "Product Sold Out",
          description: "This item is currently unavailable.",
          variant: "destructive",
        });
      }
    };

    return (
      <Card
        ref={ref}
        className="group border-0 shadow-none hover:shadow-md transition-all duration-300 rounded-xl overflow-hidden"
      >
        <div className="relative w-full overflow-hidden bg-gray-100">
          <Link 
            to={`/product/${id}`} 
            onClick={handleCardClick}
            className={cn("block", isSoldOut && "cursor-not-allowed")}
          >
            <img
              src={image}
              alt={name}
className="w-full aspect-[4/5] object-cover transition-transform duration-300 group-hover:scale-105"            />
          </Link>

          {/* --- NEW: Display the Quick View button on hover --- */}
          {quickViewTrigger && !isSoldOut && (
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
              {quickViewTrigger}
            </div>
          )}
          
          {/* Badge Logic */}
          {isSoldOut ? (
            <span className="absolute top-3 left-3 bg-black text-white text-[10px] font-semibold tracking-wider uppercase px-2 py-1 rounded-sm z-10">
              SOLD OUT
            </span>
          ) : (
            <span className="absolute top-3 left-3 bg-gray-100 text-gray-800 text-[10px] font-semibold tracking-wider uppercase px-2 py-1 rounded-sm z-10">
              AVAILABLE
            </span>
          )}

          {/* Heart Icon */}
          <button
            onClick={handleWishlistToggle}
            disabled={isSoldOut}
            className="absolute bottom-4 right-3 bg-white rounded-full p-2 shadow-md hover:scale-110 transition-transform disabled:cursor-not-allowed disabled:opacity-50 z-10"          >
            <Heart className={cn("w-4 h-4", isInWishlist(id) ? "fill-red-500 text-red-500" : "text-gray-600")} />
          </button>
        </div>

        {/* Product info */}
        <div className="p-4">
          <h3 className="font-medium text-base text-gray-800">{name}</h3>
          <p className="text-sm text-gray-700 mt-1">Rp {price.toLocaleString()}</p>
        </div>
        
      </Card>
    );
  }
);

ProductCard.displayName = "ProductCard";
export default ProductCard;