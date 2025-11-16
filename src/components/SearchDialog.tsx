import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, X } from "lucide-react";
import { allProducts, Product } from "@/data/products";

const SearchDialog = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const navigate = useNavigate();

  const handleSearch = (query: string) => {
    setSearchQuery(query);

    if (query.trim().length > 0) {
      const filtered = allProducts.filter(
        (product) =>
          product.name.toLowerCase().includes(query.toLowerCase()) ||
          product.category.toLowerCase().includes(query.toLowerCase())
      );
      setSearchResults(filtered);
    } else {
      // if query is empty, show 5 random or top products
      const suggestions = allProducts.slice(0, 5);
      setSearchResults(suggestions);
    }
  };

  const handleSelectProduct = (productId: number | string) => {
    navigate(`/product/${productId}`);
    setIsOpen(false);
    setSearchQuery("");
    setSearchResults([]);
  };

  const clearSearch = () => {
    setSearchQuery("");
    const suggestions = allProducts.slice(0, 5);
    setSearchResults(suggestions);
  };

  return (
    <Popover
      open={isOpen}
      onOpenChange={(open) => {
        setIsOpen(open);
        if (open && searchResults.length === 0) {
          // show default suggestions when opened
          const suggestions = allProducts.slice(0, 5);
          setSearchResults(suggestions);
        }
      }}
    >
      <PopoverTrigger asChild>
        <Button variant="ghost" size="sm">
          <Search className="h-5 w-5" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-80 p-0" align="end">
        <div className="p-4 space-y-4">
          {/* Search input */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="pl-10 pr-10"
              autoFocus
            />
            {searchQuery && (
              <Button
                variant="ghost"
                size="sm"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
                onClick={clearSearch}
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>

          {/* Search results or suggestions */}
          <div className="max-h-64 overflow-y-auto">
            {searchResults.length > 0 ? (
              <div className="space-y-1">
                <p className="text-xs font-medium text-muted-foreground px-2 mb-2">
                  {searchQuery ? `${searchResults.length} results` : "Suggestions"}
                </p>
                {searchResults.map((product) => (
                  <button
                    key={product.id}
                    onClick={() => handleSelectProduct(product.id)}
                    className="w-full flex items-center space-x-3 p-2 rounded-md hover:bg-muted transition-colors text-left"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-8 h-8 object-cover rounded"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-xs truncate">{product.name}</p>
                      <p className="text-xs text-muted-foreground">{product.category}</p>
                    </div>
                    <p className="font-semibold text-xs text-primary">
                      Rp {(product.price / 1000).toFixed(0)}k
                    </p>
                  </button>
                ))}
              </div>
            ) : (
              <div className="text-center py-6">
                <p className="text-xs text-muted-foreground">No products found</p>
              </div>
            )}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default SearchDialog;
