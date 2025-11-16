import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import ProductDetail from "@/components/ProductDetail";
import { Button } from "@/components/ui/button";
import { getNewArrivals, isProductSoldOut } from "@/data/products";

const NewArrivals = () => {
  const newProducts = getNewArrivals();

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <div className="container mx-auto px-4 py-8">
          <div className="text-center mb-12 pt-8">
            <h1 className="text-4xl font-bold text-foreground mb-4">New Arrivals</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Fresh drops featuring the latest in Arabic-inspired streetwear innovation.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {newProducts.map((product) => {
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
                      <Button variant="secondary">Quick View</Button>
                    </ProductDetail>
                  }
                />
              );
            })}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NewArrivals;