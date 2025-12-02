import { ItemCard } from "@/components/ItemCard";

const dummyItems = [
  { id: 1, title: "Calculus Textbook", price: "£15.00" },
  { id: 2, title: "Desk Lamp", price: "£8.00" },
  { id: 3, title: "Mini Fridge", price: "£45.00" },
  { id: 4, title: "Bluetooth Speaker", price: "£20.00" },
  { id: 5, title: "Study Chair", price: "£30.00" },
  { id: 6, title: "Laptop Stand", price: "£12.00" },
  { id: 7, title: "Psychology Notes Bundle", price: "£5.00" },
  { id: 8, title: "Coffee Maker", price: "£25.00" },
  { id: 9, title: "Headphones", price: "£35.00" },
  { id: 10, title: "Bike Lock", price: "£10.00" },
  { id: 11, title: "Art Supplies Set", price: "£18.00" },
  { id: 12, title: "Dorm Rug", price: "£22.00" },
];

export default function MarketplacePage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 bg-white dark:bg-black min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-black dark:text-white md:text-4xl">
          Marketplace
        </h1>
        <p className="mt-2 text-gray-500 dark:text-gray-400">
          Find great deals from fellow students
        </p>
      </div>

      <div className="mb-6 flex flex-wrap gap-2">
        {["All", "Textbooks", "Electronics", "Furniture", "Clothing"].map(
          (cat) => (
            <button
              key={cat}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                cat === "All"
                  ? "bg-red-800 text-white dark:bg-red-700"
                  : "bg-gray-100 dark:bg-neutral-800 text-gray-600 dark:text-gray-300 hover:bg-red-100 dark:hover:bg-red-900/30"
              }`}
            >
              {cat}
            </button>
          )
        )}
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6">
        {dummyItems.map((item) => (
          <ItemCard key={item.id} title={item.title} price={item.price} />
        ))}
      </div>
    </div>
  );
}
