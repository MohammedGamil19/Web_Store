import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import ProductDetail from "@/components/ProductDetail";
import { Button } from "@/components/ui/button";
import { getSaleProducts, isProductSoldOut } from "@/data/products";

const Sale = () => {
  const saleProducts = getSaleProducts();

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <div className="container mx-auto px-4 py-8">
          <div className="text-center mb-12 pt-8">
            <h1 className="text-4xl font-bold text-foreground mb-4">Sale Items</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Premium Arabic-inspired streetwear at unbeatable prices - limited time only.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {saleProducts.map((product) => {
              const soldOut = isProductSoldOut(product);
              return (
                <div key={product.id} className="relative">
                  <div className="absolute top-2 left-2 bg-destructive text-destructive-foreground px-2 py-1 text-xs font-bold rounded z-10">
                    SALE
                  </div>
                  <ProductCard
                    id={product.id}
                    name={product.name}
                    price={product.price}
                    image={product.image}
                    category={product.category}
                    isSoldOut={soldOut}
                    quickViewTrigger={
                      <ProductDetail product={product}>
                        <Button variant="secondary">Quick View</Button>
                      </ProductDetail>
                    }
                  />
                </div>
              );
            })}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Sale;