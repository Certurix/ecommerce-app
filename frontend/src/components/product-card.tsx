import { Link } from 'react-router-dom';

interface ProductCardProps {
  id: string;
  nom: string;
  prix: number;
  image_url: string;
  categorie: string;
}

export function ProductCard({ id, nom, prix, image_url, categorie }: ProductCardProps) {
  return (
    <Link to={`/product/${id}`} className="group">
      <div className="aspect-square overflow-hidden rounded-lg bg-gray-100">
        <img
          src={image_url}
          alt={nom}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="mt-4">
        <p className="text-sm text-gray-500">{categorie}</p>
        <h3 className="mt-1 text-lg font-medium">{nom}</h3>
        <p className="mt-1 text-lg font-semibold">{Number(prix).toFixed(2)} €</p>
      </div>
    </Link>
  );
}