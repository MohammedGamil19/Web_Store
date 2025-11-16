// --- FIX: Updated relative imports to use the '@' alias ---
import ProductCard from "@/components/ProductCard";
import ProductDetail from "@/components/ProductDetail";
import { getFeaturedProducts, isProductSoldOut } from "@/data/products";
import { Button } from "@/components/ui/button"; 

const ProductGrid = () => {
  const products = getFeaturedProducts();

  return (
    <section className="py-16 bg-gradient-subtle">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Featured Collection
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover our handpicked selection of premium Arabic-inspired streetwear, 
            crafted for the modern individual who values both style and heritage.
          </p>
        </div>

        {/* --- UPDATE: Changed grid columns and gap --- */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-7 gap-3 md:gap-4 mb-12">
          {products.map((product) => {
            const soldOut = isProductSoldOut(product);

            return (
              <ProductCard
                key={product.id}
                id={product.id}
                name={product.name}
                price={product.price}
                image={product.image}
                category={product.category}
                isSoldOut={soldOut}
                quickViewTrigger={
                  <ProductDetail product={product}>
                    {/* Note: The Button component was imported but not used here, 
                        this assumes your original code (or ProductDetail) handles it.
                        If "Quick View" should be a button, it might be:
                        <Button variant="secondary">Quick View</Button>
                        but I will leave your original logic.
                    */}
                    <Button variant="secondary">Quick View</Button>
                  </ProductDetail>
                }
              />
            );
          })}
        </div>

        <div className="text-center">
          {/* --- UPDATE: Using the imported Button component --- */}
          <Button size="lg" className="px-8 py-3 font-semibold">
            View All Products
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProductGrid;