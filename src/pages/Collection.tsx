import Header from "@/components/Header";
import ProductGrid from "@/components/ProductGrid";
import Footer from "@/components/Footer";

const Collection = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <div className="container mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-4">Full Collection</h1>
          </div>
          <ProductGrid />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Collection;