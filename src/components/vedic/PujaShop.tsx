import { useState } from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Input } from "../ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../ui/tabs";
import { Search, ShoppingCart, Star, Flame } from "lucide-react";

interface PujaShopProps {
  onNavigate: (screen: string) => void;
}

export function PujaShop({ onNavigate }: PujaShopProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    { id: "all", label: "All Items" },
    { id: "kits", label: "Puja Kits" },
    { id: "diyas", label: "Diyas & Lamps" },
    { id: "incense", label: "Incense" },
    { id: "idols", label: "Idols" },
  ];

  const products = [
    {
      id: 1,
      name: "Complete Diwali Puja Kit",
      price: "₹999",
      rating: 4.8,
      reviews: 234,
      category: "kits",
      inStock: true,
    },
    {
      id: 2,
      name: "Brass Diya Set (12 pcs)",
      price: "₹599",
      rating: 4.6,
      reviews: 156,
      category: "diyas",
      inStock: true,
    },
    {
      id: 3,
      name: "Premium Incense Sticks",
      price: "₹249",
      rating: 4.9,
      reviews: 445,
      category: "incense",
      inStock: true,
    },
    {
      id: 4,
      name: "Lakshmi Ganesha Idol",
      price: "₹1,299",
      rating: 4.7,
      reviews: 89,
      category: "idols",
      inStock: false,
    },
    {
      id: 5,
      name: "Navratri Puja Essentials",
      price: "₹799",
      rating: 4.5,
      reviews: 178,
      category: "kits",
      inStock: true,
    },
    {
      id: 6,
      name: "Camphor & Dhoop Set",
      price: "₹349",
      rating: 4.8,
      reviews: 267,
      category: "incense",
      inStock: true,
    },
  ];

  return (
    <div className="min-h-screen bg-white pb-20">
      {/* Header */}
      <div className="bg-white p-6 border-b border-gray-100">
        <h1 className="text-[#2C2C2C] mb-1">Puja Shop</h1>
        <p className="text-[#6B6B6B]">Sacred items for your rituals</p>
      </div>

      <div className="p-4 space-y-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-[#6B6B6B]" />
          <Input
            type="text"
            placeholder="Search puja items..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 border-gray-200"
          />
        </div>

        {/* Featured Banner */}
        <Card className="p-4 bg-[#C74225]/5 border-l-4 border-[#C74225]">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <Badge className="bg-[#C74225] text-white mb-2">
                Special Offer
              </Badge>
              <h3 className="text-[#2C2C2C] mb-1">Diwali Festival Sale</h3>
              <p className="text-sm text-[#6B6B6B] mb-3">
                Get 20% off on all puja kits. Free delivery above ₹499
              </p>
              <Button className="bg-[#C74225] hover:bg-[#C74225]/90 text-white">
                Shop Now
              </Button>
            </div>
            <div className="text-4xl ml-4">
              🎉
            </div>
          </div>
        </Card>

        {/* Categories */}
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-5 bg-gray-50 mb-4">
            {categories.map((cat) => (
              <TabsTrigger key={cat.id} value={cat.id} className="text-xs">
                {cat.label}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="all" className="space-y-3 mt-0">
            <div className="grid grid-cols-2 gap-3">
              {products.map((product) => (
                <Card
                  key={product.id}
                  className="overflow-hidden cursor-pointer border border-gray-100 hover:border-[#C74225] transition-colors"
                >
                  <div className="h-32 bg-gray-50 flex items-center justify-center">
                    <Flame className="h-12 w-12 text-[#C74225]" />
                  </div>
                  <div className="p-3">
                    <h4 className="text-sm text-[#2C2C2C] mb-1 line-clamp-2">
                      {product.name}
                    </h4>
                    <div className="flex items-center gap-1 mb-2">
                      <Star className="h-3 w-3 fill-[#C74225] text-[#C74225]" />
                      <span className="text-xs text-[#6B6B6B]">
                        {product.rating} ({product.reviews})
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[#C74225]">{product.price}</span>
                      <Badge
                        variant={product.inStock ? "outline" : "secondary"}
                        className={product.inStock ? "border-green-500 text-green-600 text-xs" : "text-xs"}
                      >
                        {product.inStock ? "In Stock" : "Out of Stock"}
                      </Badge>
                    </div>
                    <Button
                      size="sm"
                      className="w-full mt-3 bg-[#C74225] hover:bg-[#C74225]/90 text-white"
                      disabled={!product.inStock}
                    >
                      <ShoppingCart className="h-3 w-3 mr-1" />
                      {product.inStock ? "Add to Cart" : "Notify Me"}
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          {categories.slice(1).map((cat) => (
            <TabsContent key={cat.id} value={cat.id} className="mt-0">
              <div className="grid grid-cols-2 gap-3">
                {products
                  .filter((p) => p.category === cat.id)
                  .map((product) => (
                    <Card
                      key={product.id}
                      className="overflow-hidden cursor-pointer border border-gray-100 hover:border-[#C74225] transition-colors"
                    >
                      <div className="h-32 bg-gray-50 flex items-center justify-center">
                        <Flame className="h-12 w-12 text-[#C74225]" />
                      </div>
                      <div className="p-3">
                        <h4 className="text-sm text-[#2C2C2C] mb-1 line-clamp-2">
                          {product.name}
                        </h4>
                        <div className="flex items-center gap-1 mb-2">
                          <Star className="h-3 w-3 fill-[#C74225] text-[#C74225]" />
                          <span className="text-xs text-[#6B6B6B]">
                            {product.rating} ({product.reviews})
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-[#C74225]">{product.price}</span>
                          <Badge
                            variant={product.inStock ? "outline" : "secondary"}
                            className={product.inStock ? "border-green-500 text-green-600 text-xs" : "text-xs"}
                          >
                            {product.inStock ? "In Stock" : "Out of Stock"}
                          </Badge>
                        </div>
                        <Button
                          size="sm"
                          className="w-full mt-3 bg-[#C74225] hover:bg-[#C74225]/90 text-white"
                          disabled={!product.inStock}
                        >
                          <ShoppingCart className="h-3 w-3 mr-1" />
                          {product.inStock ? "Add to Cart" : "Notify Me"}
                        </Button>
                      </div>
                    </Card>
                  ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>

      {/* Floating Cart Button */}
      <button className="fixed bottom-24 right-6 w-14 h-14 bg-[#C74225] text-white rounded-full shadow-lg flex items-center justify-center z-40">
        <ShoppingCart className="h-6 w-6" />
        <span className="absolute -top-1 -right-1 w-5 h-5 bg-white text-[#C74225] text-xs rounded-full flex items-center justify-center">
          3
        </span>
      </button>
    </div>
  );
}
