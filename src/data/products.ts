// @/data/products.ts

// I'm keeping your image imports the same, assuming they are correct.
import mensHoodie1 from "@/assets/mens-hoodie-1.jpg";
import mensSweater1 from "@/assets/mens-sweater-1.jpg";
import mensTshirt1 from "@/assets/mens-tshirt-1.jpg";
import mensHoodie2 from "@/assets/mens-hoodie-2.jpg";
import product1 from "@/assets/product-1.jpg";
import product2 from "@/assets/product-2.jpg";
import product3 from "@/assets/product-3.jpg";
import product4 from "@/assets/product-4.jpg";

// --- The Upgraded Product Blueprint ---
export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  rating: number;
  image: string;
  category: "Hoodies" | "Sweaters" | "T-Shirts" | "Jackets" | "Accessories";
  description: string;
  material: string;
  features: string[];
  inventory: {
    size: string;
    stock: number; // 0 means sold out for this size
  }[];
  tags?: ("featured" | "new-arrival" | "sale")[];
}

// --- Main Product Catalog ---
export const allProducts: Product[] = [
  {
    id: "hoodie-arabic-calligraphy-dusty-rose",
    name: "Arabic Calligraphy Hoodie - Dusty Rose",
    price: 450000,
    originalPrice: 550000,
    rating: 4.88,
    image: mensHoodie1,
    description: "Premium hoodie featuring elegant Arabic calligraphy with modern streetwear design. Soft, comfortable fabric with contemporary fit.",
    material: "COTTON SPANDEX PREMIUM",
    features: ["Stretch, super flowy, comfortable with thick material", "Wudhu friendly with zipper", "Breathable fabric"],
    category: "Hoodies",
    inventory: [
      { size: "S", stock: 0 },
      { size: "M", stock: 0 },
      { size: "L", stock: 0 },
      { size: "XL", stock: 0 },
      { size: "XXL", stock: 0 },
    ],
    tags: ["featured", "new-arrival", "sale"],
  },
  {
    id: "sweater-geometric-pattern-brown",
    name: "Geometric Pattern Sweater - Brown",
    price: 380000,
    rating: 4.75,
    image: mensSweater1,
    description: "Contemporary sweater with intricate geometric patterns inspired by traditional Islamic art. Perfect for casual and formal occasions.",
    material: "WOOL BLEND PREMIUM",
    features: ["Warm and breathable", "Geometric Islamic patterns", "Comfortable fit"],
    category: "Sweaters",
    inventory: [
      { size: "S", stock: 12 },
      { size: "M", stock: 8 },
      { size: "L", stock: 4 },
      { size: "XL", stock: 0 },
    ],
    tags: ["featured"],
  },
  {
    id: "tshirt-minimalist-arabic-beige",
    name: "Minimalist Arabic Tee - Beige",
    price: 225000,
    rating: 5.0,
    image: mensTshirt1,
    description: "Clean, minimalist design featuring subtle Arabic typography. Made from premium cotton for ultimate comfort.",
    material: "ORGANIC COTTON PREMIUM",
    features: ["Organic cotton material", "Minimalist design", "Comfortable daily wear"],
    category: "T-Shirts",
    inventory: [
      { size: "XS", stock: 0 },
      { size: "S", stock: 0 },
      { size: "M", stock: 0 },
      { size: "L", stock: 0 },
      { size: "XL", stock: 0 },
    ],
    tags: ["featured"],
  },
  {
    id: "hoodie-gold-calligraphy-cream",
    name: "Gold Calligraphy Hoodie - Cream",
    price: 485000,
    rating: 4.92,
    image: mensHoodie2,
    description: "Luxurious hoodie with gold-thread Arabic calligraphy embroidery. Premium materials meet traditional craftsmanship.",
    material: "PREMIUM COTTON BLEND",
    features: ["Gold thread embroidery", "Premium cotton blend", "Luxury finish", "Traditional craftsmanship"],
    category: "Hoodies",
    inventory: [
      { size: "S", stock: 20 },
      { size: "M", stock: 15 },
      { size: "L", stock: 10 },
      { size: "XL", stock: 5 },
    ],
    tags: ["featured", "new-arrival"],
  },
  // Add all your other products here using the new structure...
];

// --- Helper Functions ---

export const getProductById = (id: string): Product | undefined => {
  return allProducts.find(product => product.id === id);
};

export const getProductsByCategory = (category: string): Product[] => {
  return allProducts.filter(product => product.category === category);
};

export const getFeaturedProducts = (): Product[] => {
  return allProducts.filter(p => p.tags?.includes("featured"));
};

export const getNewArrivals = (): Product[] => {
  return allProducts.filter(p => p.tags?.includes("new-arrival"));
};

export const getSaleProducts = (): Product[] => {
  return allProducts.filter(p => p.tags?.includes("sale") || p.originalPrice);
};

// --- Inventory Management Functions ---

// New function to get a report of products per category
export const getProductCountByCategory = (): Record<string, number> => {
  return allProducts.reduce((acc, product) => {
    const category = product.category;
    if (!acc[category]) {
      acc[category] = 0;
    }
    acc[category]++;
    return acc;
  }, {} as Record<string, number>);
};

// New function to check if a product is completely sold out
export const isProductSoldOut = (product: Product): boolean => {
    return product.inventory.every(item => item.stock === 0);
}