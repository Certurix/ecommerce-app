import { useEffect, useState } from 'react';
import { ProductCard } from '@/components/product-card';

interface Product {
  id: string;
  nom: string;
  prix: number;
  image_url: string;
  categorie: string;
}

export function HomePage() {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      const response = await fetch('http://localhost:5000/api/products/latest');
      const data = await response.json();
      setFeaturedProducts(data);
      setLoading(false);
    };

    fetchFeaturedProducts();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

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
              src="https://images.unsplash.com/photo-1510124948545-a2b79a488ea5"
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
                  Parcourir
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
                  Parcourir
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}