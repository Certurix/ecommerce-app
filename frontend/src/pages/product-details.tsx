import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useCartStore } from '@/lib/store';

interface Product {
  id: string;
  reference: string;
  nom: string;
  description: string;
  prix: number;
  stock: number;
  categorie_id: number;
  image_url: string;
}

export function ProductDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCartStore();

  useEffect(() => {
    const fetchProductDetails = async () => {
      const response = await fetch(`http://localhost:5000/api/products/${id}`);
      const data = await response.json();
      setProduct(data);
      setLoading(false);
    };

    if (id) {
      fetchProductDetails();
    }
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!product) {
    return <div>Product not found.</div>;
  }

  const handleAddToCart = () => {
    addToCart(product, 1);
  };

  return (
    <div className="container py-12">
      <div className="flex flex-col lg:flex-row gap-12">
        <div className="lg:w-1/2">
          <img
            src={product.image_url}
            alt={product.nom}
            className="w-full h-auto rounded-lg shadow-lg"
          />
        </div>
        <div className="lg:w-1/2">
          <h1 className="text-4xl font-bold mb-4">{product.nom}</h1>
          <p className="text-2xl text-gray-800 mb-4">{product.prix} €</p>
          <p className="text-lg text-gray-600 mb-6">{product.description}</p>
          <div className="flex items-center mb-6">
            <span className="text-lg font-medium"></span>
            <span className="ml-2 text-lg">{product.stock > 0 ? `En stock (${product.stock})` : 'Hors stock'}</span>
          </div>
          <button
            onClick={handleAddToCart}
            className="w-full px-6 py-3 text-lg font-medium text-white bg-primary rounded-lg hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          >
            Ajouter au panier
          </button>
        </div>
      </div>
    </div>
  );
}