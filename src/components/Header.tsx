import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { Link } from "react-router-dom";
import SearchDialog from "./SearchDialog";
import AccountDropdown from "./AccountDropdown";
import CartSheet from "./CartSheet";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 30);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Collection", href: "/collection" },
    { name: "Hoodies", href: "/hoodies" },
    { name: "Sweaters", href: "/sweaters" },
    { name: "T-Shirts", href: "/t-shirts" },
    { name: "New Arrivals", href: "/new-arrivals" },
    { name: "Sale", href: "/sale" },
  ];

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-500 ease-in-out ${
        isScrolled
          ? "bg-background/90 backdrop-blur-md border-b border-border"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      {/* Top banner */}
      <div className="bg-black text-primary-foreground py-3 px-4 text-center text-sm">
        Premium Arabic-inspired clothing.
      </div>

      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Mobile menu */}
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="sm">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-80">
              <nav className="flex flex-col space-y-4 mt-6">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className="text-lg font-medium text-foreground hover:text-primary transition-colors"
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>

          {/* Logo */}
<div className="flex-1 md:flex-none">
  <Link to="/">
    <img
      src="/images/icon.png"
      alt="Khanjar Logo"
      className="h-10 md:h-12 w-auto"
    />
  </Link>
</div>


          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="text-sm font-medium text-foreground hover:text-primary transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Right actions */}
          <div className="flex items-center space-x-2">
            <SearchDialog />
            <AccountDropdown />
            <CartSheet />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
