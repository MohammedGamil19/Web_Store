// @/pages/CheckoutPage.tsx

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, ChevronRight, Search, ShieldCheck, Gift } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils"; // --- FIX #1: Added the missing import for cn ---

// --- FIX #2: Removed the unused Header import ---
import Footer from "@/components/Footer"; 

// Define your form state interface
interface AddressFormState {
  email: string;
  fullName: string;
  phoneNumber: string;
  country: string;
  districtCity: string;
  addressDetails: string;
}

const CheckoutPage: React.FC = () => {
  const navigate = useNavigate();
  const { items, getTotalPrice, clearCart } = useCart(); 
  const { toast } = useToast();

  const [addressForm, setAddressForm] = useState<AddressFormState>({
    email: "",
    fullName: "",
    phoneNumber: "",
    country: "Indonesia", 
    districtCity: "",
    addressDetails: "",
  });
  const [deliveryMessage, setDeliveryMessage] = useState("");
  const [isShippingAvailable, setIsShippingAvailable] = useState(false);
  const [selectedShippingMethod, setSelectedShippingMethod] = useState<string | null>(null);

  useEffect(() => {
    if (addressForm.country && addressForm.districtCity && addressForm.addressDetails) {
      setIsShippingAvailable(true);
    } else {
      setIsShippingAvailable(false);
      setSelectedShippingMethod(null);
    }
  }, [addressForm]);


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setAddressForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: keyof AddressFormState, value: string) => {
    setAddressForm(prev => ({ ...prev, [name]: value }));
  };

  const handleOrderNow = () => {
    if (!addressForm.fullName || !addressForm.phoneNumber || !addressForm.districtCity || !addressForm.addressDetails) {
      toast({
        title: "Please complete all required address details.",
        variant: "destructive",
      });
      return;
    }
    if (!selectedShippingMethod && isShippingAvailable) {
        toast({
            title: "Please select a shipping method.",
            variant: "destructive",
        });
        return;
    }

    console.log("Placing order with:", {
      addressForm,
      deliveryMessage,
      items,
      total: getTotalPrice(),
      shippingMethod: selectedShippingMethod,
    });

    setTimeout(() => {
      toast({
        title: "Order Placed!",
        description: "Your order has been successfully placed.",
        variant: "success",
      });
      clearCart();
      navigate('/order-confirmation'); 
    }, 1500);
  };

  const shippingCost = selectedShippingMethod === "standard" ? 25000 : 0;
  const totalPayment = getTotalPrice() + shippingCost;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* A simplified Header for checkout */}
      <nav className="bg-white border-b py-4 px-6 flex items-center justify-between shadow-sm">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-xl font-semibold">KHANJAR</h1>
        <div className="w-10"></div> {/* Spacer */}
      </nav>

      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Address Details & Shipment */}
          <div className="lg:col-span-2 space-y-8">
            {/* Address Details Section */}
            <section className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-xl font-semibold mb-4">Address Details</h2>
              <p className="text-sm text-gray-600 mb-4">Do you have an account? <span className="text-primary font-medium cursor-pointer">Login</span></p>

              <div className="space-y-4">
                <label className="block">
                  <span className="text-sm font-medium text-gray-700">Email Address (Optional)</span>
                  <Input
                    type="email"
                    name="email"
                    value={addressForm.email}
                    onChange={handleInputChange}
                    placeholder="We will send your order detail to your email"
                    className="mt-1 block w-full"
                  />
                </label>
                <label className="block">
                  <span className="text-sm font-medium text-gray-700">Recipient Full Name</span>
                  <Input
                    type="text"
                    name="fullName"
                    value={addressForm.fullName}
                    onChange={handleInputChange}
                    className="mt-1 block w-full"
                  />
                </label>
                <label className="block">
                  <span className="text-sm font-medium text-gray-700">Recipient Phone Number</span>
                  <Input
                    type="tel"
                    name="phoneNumber"
                    value={addressForm.phoneNumber}
                    onChange={handleInputChange}
                    className="mt-1 block w-full"
                  />
                </label>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <span className="text-sm font-medium text-gray-700">Country</span>
                    <Select
                      value={addressForm.country}
                      onValueChange={(value) => handleSelectChange("country", value)}
                    >
                      <SelectTrigger className="w-full mt-1">
                        <SelectValue placeholder="Select a country" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Indonesia">Indonesia</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-700">Sub-district, District, City</span>
                    <div className="relative mt-1">
                      <Input
                        type="text"
                        name="districtCity"
                        value={addressForm.districtCity}
                        onChange={handleInputChange}
                        className="w-full pr-10"
                      />
                      <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    </div>
                  </div>
                </div>

                <label className="block">
                  <span className="text-sm font-medium text-gray-700">Address Details</span>
                  <Textarea
                    name="addressDetails"
                    value={addressForm.addressDetails}
                    onChange={handleInputChange}
                    maxLength={250}
                    className="mt-1 block w-full min-h-[100px]"
                  />
                  <p className="text-right text-sm text-gray-500">{addressForm.addressDetails.length}/250</p>
                </label>
              </div>
            </section>

            {/* Shipment Method Section */}
            <section className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-xl font-semibold mb-4">Shipment Method</h2>
              {!isShippingAvailable ? (
                <p className="text-gray-500">Complete address detail to see available shipping methods.</p>
              ) : (
                <div className="space-y-3">
                  <div
                    className={cn(
                      "flex items-center justify-between p-4 border rounded-lg cursor-pointer",
                      selectedShippingMethod === "standard" ? "border-primary ring-2 ring-primary-foreground" : "border-gray-200"
                    )}
                    onClick={() => setSelectedShippingMethod("standard")}
                  >
                    <div>
                      <p className="font-medium">Standard Shipping</p>
                      <p className="text-sm text-muted-foreground">Est. Delivery: 3-5 Business Days</p>
                    </div>
                    <span className="font-semibold">Rp 25.000</span>
                  </div>
                </div>
              )}
            </section>
          </div>

          {/* Right Column: Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-lg shadow-sm sticky top-4">
              {items.map(item => (
                <div key={item.id} className="flex items-start gap-4 pb-4 border-b last:border-b-0 last:pb-0 mb-4">
                  <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-md flex-shrink-0" />
                  <div className="flex-grow">
                    <h3 className="font-medium text-base">{item.name}</h3>
                    <p className="text-sm text-muted-foreground">Quantity: {item.quantity}</p>

                  </div>
                  <span className="font-semibold text-right">Rp {(item.price * item.quantity).toLocaleString()}</span>
                </div>
              ))}

              <div className="space-y-3 py-4 border-b">
                <div className="flex items-center justify-between text-muted-foreground cursor-pointer">
                  <span>Leave a message for delivery (Optional)</span>
                  <ChevronRight className="h-4 w-4" />
                </div>
                <div className="flex items-center justify-between text-muted-foreground cursor-pointer">
                  <div className="flex items-center gap-2">
                      <Gift className="h-4 w-4"/>
                      <span>Vouchers</span>
                  </div>
                  <ChevronRight className="h-4 w-4" />
                </div>
              </div>

              <div className="space-y-3 py-4">
                <div className="flex justify-between text-sm">
                  <span>Subtotal • {items.reduce((acc, item) => acc + item.quantity, 0)} items</span>
                  <span>Rp {getTotalPrice().toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Shipping</span>
                  <span>{selectedShippingMethod ? `Rp ${shippingCost.toLocaleString()}` : "-"}</span>
                </div>
              </div>

              <div className="flex justify-between items-center text-lg font-bold py-4 border-t">
                <span>Total Payment</span>
                <span>Rp {totalPayment.toLocaleString()}</span>
              </div>

              <div className="flex items-center text-xs text-gray-500 mb-4">
                <ShieldCheck className="h-4 w-4 mr-1 text-green-600" />
                <span>Secure Payment | Your payment is encrypted.</span>
              </div>

              <Button
                onClick={handleOrderNow}
                className="w-full h-12 text-base"
                disabled={items.length === 0 || !selectedShippingMethod || !isShippingAvailable}
              >
                Order Now
              </Button>
              <p className="text-xs text-center text-gray-500 mt-2">
                By placing your order, you agree to our <span className="underline cursor-pointer">Terms & Conditions</span>
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CheckoutPage;