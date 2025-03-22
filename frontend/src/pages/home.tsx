import { ProductCard } from "@/components/product-card";

const featuredProducts = [
  {
    id: "1",
    name: "Luxury Men's Watch",
    price: 299.99,
    image: "https://images.unsplash.com/photo-1623998021450-85c29c644e0d",
    category: "Men's Watches",
  },
  {
    id: "2",
    name: "Sport Women's Watch",
    price: 199.99,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
    category: "Women's Watches",
  },
  {
    id: "3",
    name: "Casual Kids' Watch",
    price: 49.99,
    image: "https://images.unsplash.com/photo-1518552783698-9a5e4d3e7d0b",
    category: "Kids' Watches",
  },
  {
    id: "4",
    name: "Fitness Smart Watch",
    price: 149.99,
    image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12",
    category: "Smart Watches",
  },
];

export function HomePage() {
  return (
    <div className="py-12">
      <div className="container">
        <div className="relative mb-12 h-[500px] overflow-hidden rounded-lg">
          <img
            src="https://images.unsplash.com/photo-1526743655626-e3d757b13d61"
            alt="Collection Printemps 2025"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 flex items-center bg-black/40 p-12">
            <div className="max-w-lg text-white">
              <h1 className="text-5xl font-bold">Collection Printemps 2025</h1>
              <p className="mt-4 text-lg">
                Découvrez nos dernières nouveautés avec des styles frais et des
                couleurs vibrantes parfaites pour la saison.
              </p>
              <button className="mt-6 rounded-lg bg-white px-6 py-3 text-lg font-medium text-black transition-colors hover:bg-gray-100">
                Découvrir
              </button>
            </div>
          </div>
        </div>

        <div className="mb-12">
          <h2 className="mb-8 text-3xl font-bold">Produits Vedettes</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="relative h-[400px] overflow-hidden rounded-lg">
            <img
              src="https://images.unsplash.com/photo-1510124948545-a2b79a488ea5?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Collection femme"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 flex items-center bg-black/30 p-12">
              <div className="text-white">
                <h3 className="text-3xl font-bold">Collection Femme</h3>
                <p className="mt-2">
                  Découvrez notre sélection de montres pour femmes
                </p>
                <button className="mt-4 rounded-lg bg-white px-6 py-2 text-sm font-medium text-black transition-colors hover:bg-gray-100">
                  Shop Women
                </button>
              </div>
            </div>
          </div>
          <div className="relative h-[400px] overflow-hidden rounded-lg">
            <img
              src="https://images.unsplash.com/photo-1507680434567-5739c80be1ac"
              alt="Collection femme"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 flex items-center bg-black/30 p-12">
              <div className="text-white">
                <h3 className="text-3xl font-bold">Collection Homme</h3>
                <p className="mt-2">
                  Découvrez les dernières nouveautés en montres pour hommes
                </p>
                <button className="mt-4 rounded-lg bg-white px-6 py-2 text-sm font-medium text-black transition-colors hover:bg-gray-100">
                  Shop Men
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
