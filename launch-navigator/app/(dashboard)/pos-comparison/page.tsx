"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Check, X, Star } from "lucide-react";
import { cn } from "@/lib/utils";

const posSystems = [
  {
    id: "square",
    name: "Square POS",
    logo: "🟦",
    description: "Best for small businesses and startups",
    price: "Free - $60/mo",
    pros: ["Free basic plan", "Easy to use", "Great for retail", "No contract"],
    cons: ["Limited reporting", "Transaction fees"],
    features: [
      { name: "Inventory Management", included: true },
      { name: "Employee Management", included: true },
      { name: "Online Store", included: true },
      { name: "Marketing Tools", included: false },
      { name: "Advanced Reporting", included: false },
      { name: "Multi-location", included: false },
    ],
    rating: 4.5,
    reviews: 12500,
  },
  {
    id: "toast",
    name: "Toast POS",
    logo: "🍞",
    description: "Best for restaurants",
    price: "$0 - $200/mo",
    pros: ["Restaurant-specific", "Great support", "Menu management", "Kitchen display"],
    cons: ["Requires contract", "Setup fee"],
    features: [
      { name: "Inventory Management", included: true },
      { name: "Employee Management", included: true },
      { name: "Online Store", included: true },
      { name: "Marketing Tools", included: true },
      { name: "Advanced Reporting", included: true },
      { name: "Multi-location", included: true },
    ],
    rating: 4.7,
    reviews: 8200,
  },
  {
    id: "shopify",
    name: "Shopify POS",
    logo: "🟢",
    description: "Best for e-commerce + retail",
    price: "$79 - $299/mo",
    pros: ["Online store included", "Best e-commerce", "Great integrations", "Inventory sync"],
    cons: ["Monthly cost", "Learning curve"],
    features: [
      { name: "Inventory Management", included: true },
      { name: "Employee Management", included: true },
      { name: "Online Store", included: true },
      { name: "Marketing Tools", included: true },
      { name: "Advanced Reporting", included: true },
      { name: "Multi-location", included: true },
    ],
    rating: 4.6,
    reviews: 9800,
  },
  {
    id: "lightspeed",
    name: "Lightspeed POS",
    logo: "💡",
    description: "Best for inventory-heavy retail",
    price: "$99 - $249/mo",
    pros: ["Advanced inventory", "Retail-focused", "E-commerce", "Analytics"],
    cons: ["Higher price point", "Setup complexity"],
    features: [
      { name: "Inventory Management", included: true },
      { name: "Employee Management", included: true },
      { name: "Online Store", included: true },
      { name: "Marketing Tools", included: true },
      { name: "Advanced Reporting", included: true },
      { name: "Multi-location", included: true },
    ],
    rating: 4.4,
    reviews: 4100,
  },
  {
    id: "clover",
    name: "Clover POS",
    logo: "☘️",
    description: "Best for flexibility",
    price: "$0 - $175/mo",
    pros: ["Hardware options", "App marketplace", "Easy setup", "Mobile"],
    cons: ["Limited features", "App costs add up"],
    features: [
      { name: "Inventory Management", included: true },
      { name: "Employee Management", included: true },
      { name: "Online Store", included: false },
      { name: "Marketing Tools", included: false },
      { name: "Advanced Reporting", included: false },
      { name: "Multi-location", included: false },
    ],
    rating: 4.2,
    reviews: 6300,
  },
  {
    id: "zettle",
    name: "Zettle by PayPal",
    logo: "🟣",
    description: "Best for simple needs",
    price: "Free",
    pros: ["No monthly fee", "Simple", "PayPal integration", "Card reader"],
    cons: ["Basic features", "Limited support"],
    features: [
      { name: "Inventory Management", included: false },
      { name: "Employee Management", included: false },
      { name: "Online Store", included: false },
      { name: "Marketing Tools", included: false },
      { name: "Advanced Reporting", included: false },
      { name: "Multi-location", included: false },
    ],
    rating: 4.1,
    reviews: 3800,
  },
];

const comparisonFeatures = [
  "Inventory Management",
  "Employee Management",
  "Online Store",
  "Marketing Tools",
  "Advanced Reporting",
  "Multi-location",
];

export default function POSComparisonPage() {
  const [selectedSystem, setSelectedSystem] = useState<string | null>(null);
  const [email, setEmail] = useState("");

  const handleGetDeal = (systemId: string) => {
    setSelectedSystem(systemId);
  };

  const handleSubmitDeal = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Deal request sent for ${posSystems.find(s => s.id === selectedSystem)?.name}! We'll contact you at ${email}`);
    setSelectedSystem(null);
    setEmail("");
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">
          POS System Comparison
        </h1>
        <p className="text-slate-600 mt-2">
          Compare top POS systems to find the right one for your business
        </p>
      </div>

      {/* Info Banner */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
        <p className="text-sm text-blue-800">
          <strong>💡 Tip:</strong> Most POS systems offer free trials. Test a few before committing to find what works best for your specific business needs.
        </p>
      </div>

      {/* Comparison Table */}
      <div className="overflow-x-auto mb-8">
        <table className="w-full bg-white rounded-lg border border-slate-200">
          <thead>
            <tr>
              <th className="text-left p-4 border-b border-slate-200 min-w-[200px]">
                Features
              </th>
              {posSystems.map((system) => (
                <th
                  key={system.id}
                  className="text-center p-4 border-b border-slate-200 min-w-[160px]"
                >
                  <div className="flex flex-col items-center">
                    <span className="text-2xl mb-1">{system.logo}</span>
                    <span className="font-semibold text-slate-900">
                      {system.name}
                    </span>
                    <span className="text-xs text-slate-500">
                      {system.reviews.toLocaleString()} reviews
                    </span>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-4 border-b border-slate-200 font-medium text-slate-700">
                Pricing
              </td>
              {posSystems.map((system) => (
                <td
                  key={system.id}
                  className="text-center p-4 border-b border-slate-200"
                >
                  <span className="text-primary font-semibold">
                    {system.price}
                  </span>
                </td>
              ))}
            </tr>
            {comparisonFeatures.map((feature) => (
              <tr key={feature}>
                <td className="p-4 border-b border-slate-200 font-medium text-slate-700">
                  {feature}
                </td>
                {posSystems.map((system) => {
                  const featureData = system.features.find(
                    (f) => f.name === feature
                  );
                  return (
                    <td
                      key={system.id}
                      className="text-center p-4 border-b border-slate-200"
                    >
                      {featureData?.included ? (
                        <Check className="h-5 w-5 text-green-500 mx-auto" />
                      ) : (
                        <X className="h-5 w-5 text-slate-300 mx-auto" />
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
            <tr>
              <td className="p-4 font-medium text-slate-700">Rating</td>
              {posSystems.map((system) => (
                <td key={system.id} className="text-center p-4">
                  <div className="flex items-center justify-center gap-1">
                    <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                    <span className="font-semibold">{system.rating}</span>
                  </div>
                </td>
              ))}
            </tr>
            <tr>
              <td className="p-4"></td>
              {posSystems.map((system) => (
                <td key={system.id} className="text-center p-4">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleGetDeal(system.id)}
                  >
                    Get Deal
                  </Button>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>

      {/* Detailed Cards */}
      <h2 className="text-xl font-semibold text-slate-900 mb-4">
        Detailed Reviews
      </h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {posSystems.map((system) => (
          <Card key={system.id} className="card-hover">
            <CardHeader>
              <div className="flex items-center gap-3">
                <span className="text-3xl">{system.logo}</span>
                <div>
                  <CardTitle className="text-lg">{system.name}</CardTitle>
                  <p className="text-sm text-primary font-medium">
                    {system.price}
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-600 mb-4">
                {system.description}
              </p>

              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={cn(
                      "h-4 w-4",
                      i < Math.floor(system.rating)
                        ? "fill-amber-400 text-amber-400"
                        : "text-slate-300"
                    )}
                  />
                ))}
                <span className="text-sm text-slate-500 ml-2">
                  {system.rating} ({system.reviews.toLocaleString()} reviews)
                </span>
              </div>

              <div className="space-y-2 mb-4">
                <p className="text-sm font-medium text-slate-700">Pros:</p>
                {system.pros.slice(2).map((pro, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm">
                    <Check className="h-4 w-4 text-green-500" />
                    <span className="text-slate-600">{pro}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-2 mb-4">
                <p className="text-sm font-medium text-slate-700">Cons:</p>
                {system.cons.slice(2).map((con, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm">
                    <X className="h-4 w-4 text-red-400" />
                    <span className="text-slate-600">{con}</span>
                  </div>
                ))}
              </div>

              <Button
                className="w-full"
                variant="outline"
                onClick={() => handleGetDeal(system.id)}
              >
                Learn More
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Deal Modal */}
      {selectedSystem && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md mx-4">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">
                Get a Deal on{" "}
                {posSystems.find((s) => s.id === selectedSystem)?.name}
              </h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSelectedSystem(null)}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            <form onSubmit={handleSubmitDeal} className="space-y-4">
              <div>
                <Label htmlFor="email">Your Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="mt-1"
                />
              </div>

              <p className="text-sm text-slate-600">
                We&apos;ll send you exclusive deals and discounts for{" "}
                {posSystems.find((s) => s.id === selectedSystem)?.name}.
              </p>

              <div className="flex gap-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setSelectedSystem(null)}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button type="submit" className="flex-1">
                  Send Request
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
