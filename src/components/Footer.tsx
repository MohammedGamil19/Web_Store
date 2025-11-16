import { Instagram, Facebook, Twitter, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

const Footer = () => {
  return (
    <footer className="bg-gray-300 text-black">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1">
            <h3 className="text-2xl font-heading font-bold mb-4">Khanjar</h3>
            <p className="mb-6">
              Premium Arabic-inspired streetwear for the modern man. Crafted with heritage, styled with pride.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://www.instagram.com/khanjar.y" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <Button variant="ghost" size="sm" className="hover:bg-black/10">
                  <Instagram className="h-5 w-5" />
                </Button>
              </a>
              <Button variant="ghost" size="sm" className="hover:bg-black/10">
                <Facebook className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="sm" className="hover:bg-black/10">
                <Twitter className="h-5 w-5" />
              </Button>
            </div>
          </div>


          {/* Newsletter */}
          <div>
            <h4 className="font-heading font-semibold mb-4">Stay Connected</h4>
            <p className="text-gray-700 mb-4">
              Subscribe to receive updates on new collections and exclusive offers.
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-3 py-2 bg-white/50 border border-black/20 rounded-l-md text-black placeholder:text-black/60 focus:outline-none focus:border-black"
              />
              <Button className="rounded-l-none bg-black hover:bg-black/90 text-white">
                <Mail className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        <div className="border-t border-black/20 mt-12 pt-8 text-center">
          <p className="text-gray-600">
            © 2025 Khanjar. All rights reserved. | Privacy Policy | Terms of Service
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;