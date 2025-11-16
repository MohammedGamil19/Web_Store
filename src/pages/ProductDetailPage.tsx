// @/pages/ProductDetailPage.tsx

import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { useToast } from "@/hooks/use-toast";
import { getProductById, isProductSoldOut } from "@/data/products";
import { cn } from "@/lib/utils";

// Import the new component
import QuantitySelector from "@/components/QuantitySelector"; 

// Assuming Header and Footer components exist
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const product = id ? getProductById(id) : null;

  const [selectedSize, setSelectedSize] = useState<string>("");
  const [quantity, setQuantity] = useState(1); // State to manage quantity

  const { addToCart } = useCart();
  const { toast } = useToast();

  useEffect(() => {
    if (product) {
      // Set initial size to the first available one
      const firstAvailableSize = product.inventory.find(item => item.stock > 0)?.size || "";
      setSelectedSize(firstAvailableSize);
      window.scrollTo(0, 0);
    }
  }, [product]);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h2 className="text-2xl font-bold">Product Not Found</h2>
      </div>
    );
  }

  const isCompletelySoldOut = isProductSoldOut(product);

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
      quantity: quantity, // Pass the quantity state
    });

    toast({ title: "Added to cart", description: `${quantity}x ${product.name} added.`});
  };

  const handleBuyNow = () => {
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
      quantity: quantity, // Pass the quantity state
    });

    navigate('/checkout'); 
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <Button variant="ghost" onClick={() => navigate(-1)} className="mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Product Image */}
          <div>
            <img src={product.image} alt={product.name} className="w-full h-auto object-cover rounded-lg shadow-md"/>
          </div>

          {/* Product Details */}
          <div className="flex flex-col space-y-6">
            <div>
              <Badge variant="secondary" className="mb-3">{product.category}</Badge>
              <h1 className="text-3xl lg:text-4xl font-semibold">{product.name}</h1>
              <p className="text-2xl text-primary mt-2">Rp {product.price.toLocaleString()}</p>
            </div>

            {/* Size Selection */}
            <div>
              <h3 className="font-semibold mb-3 text-base">Size</h3>
              <div className="flex flex-wrap gap-3">
                {product.inventory.map((item) => (
                  <Button
                    key={item.size}
                    variant={selectedSize === item.size ? "default" : "outline"}
                    onClick={() => setSelectedSize(item.size)}
                    disabled={item.stock === 0}
                    className={cn(
                      "w-12 h-10 text-base",
                      item.stock === 0 && "line-through opacity-50 cursor-not-allowed"
                    )}
                  >
                    {item.size}
                  </Button>
                ))}
              </div>
            </div>

            {/* --- NEW SECTION: Quantity Selector --- */}
            <div>
              <h3 className="font-semibold mb-3 text-base">Quantity</h3>
              <QuantitySelector 
                quantity={quantity} 
                onQuantityChange={setQuantity} 
              />
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 pt-4">
              <Button onClick={handleAddToCart} disabled={isCompletelySoldOut} variant="outline" className="w-full h-12 text-base">
                {isCompletelySoldOut ? "Sold Out" : "Add to Cart"}
              </Button>
              <Button onClick={handleBuyNow} disabled={isCompletelySoldOut} className="w-full h-12 text-base">
                Buy Now
              </Button>
            </div>
            
            {/* Product Info */}
            <div className="pt-4 border-t space-y-4">
              <p className="leading-relaxed text-muted-foreground">{product.description}</p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductDetailPage;