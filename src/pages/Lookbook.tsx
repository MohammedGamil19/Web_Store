import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

const Lookbook = () => {
  const lookbookItems = [
    {
      id: 1,
      title: "Desert Wanderer",
      description: "Minimalist streetwear meets traditional Arabic aesthetics",
      image: "/src/assets/hero-image-men.jpg",
      items: ["Heritage Knit Sweater", "Classic Desert Jeans", "Minimal Khanjar Tee"],
      season: "Fall 2024"
    },
    {
      id: 2,
      title: "Urban Nomad",
      description: "Contemporary cuts with cultural heritage",
      image: "/src/assets/mens-hoodie-1.jpg",
      items: ["Desert Storm Hoodie", "Tailored Cargo Pants", "Arabic Script Tee"],
      season: "Winter 2024"
    },
    {
      id: 3,
      title: "Modern Majlis",
      description: "Elevated casual wear for the modern gentleman",
      image: "/src/assets/mens-sweater-1.jpg",
      items: ["Artisan Crafted Sweater", "Premium Cotton Chinos", "Minimalist Accessories"],
      season: "Spring 2024"
    },
    {
      id: 4,
      title: "Cultural Fusion",
      description: "Where tradition meets contemporary streetwear",
      image: "/src/assets/mens-tshirt-1.jpg",
      items: ["Calligraphy Crew Tee", "Modern Fit Trousers", "Heritage Accessories"],
      season: "Summer 2024"
    },
    {
      id: 5,
      title: "Arabian Nights",
      description: "Sophisticated evening wear with cultural inspiration",
      image: "/src/assets/mens-hoodie-2.jpg",
      items: ["Midnight Arabia Hoodie", "Luxury Joggers", "Premium Sneakers"],
      season: "Fall 2024"
    },
    {
      id: 6,
      title: "Bedouin Spirit",
      description: "Free-spirited designs for the adventurous soul",
      image: "/src/assets/product-1.jpg",
      items: ["Nomad Collection Hoodie", "Adventure Cargo Shorts", "Desert Boots"],
      season: "Summer 2024"
    }
  ];

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-r from-background to-muted">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-heading font-light text-foreground mb-6">
              Khanjar Lookbook
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Discover how to style our Arabic-inspired pieces for every occasion. 
              From casual streetwear to elevated everyday looks, find your perfect combination.
            </p>
            <Badge variant="secondary" className="text-lg px-4 py-2">
              Fall/Winter 2024 Collection
            </Badge>
          </div>
        </section>

        {/* Lookbook Grid */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {lookbookItems.map((item) => (
                <div key={item.id} className="group cursor-pointer">
                  <div className="relative overflow-hidden rounded-lg mb-4">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-96 object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <Badge className="absolute top-4 left-4 bg-primary text-primary-foreground">
                      {item.season}
                    </Badge>
                  </div>
                  
                  <div className="space-y-3">
                    <h3 className="text-xl font-heading font-medium text-foreground group-hover:text-primary transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      {item.description}
                    </p>
                    
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-foreground">Featured Items:</p>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        {item.items.map((itemName, index) => (
                          <li key={index} className="flex items-center">
                            <span className="w-1 h-1 bg-primary rounded-full mr-2" />
                            {itemName}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <Button variant="outline" size="sm" className="w-full mt-4" asChild>
                      <Link to="/collection">Shop This Look</Link>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-muted">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-heading font-light text-foreground mb-6">
              Ready to Create Your Look?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Browse our full collection and mix and match pieces to create your own unique style statement.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link to="/collection">Browse Collection</Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/new-arrivals">View New Arrivals</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Lookbook;