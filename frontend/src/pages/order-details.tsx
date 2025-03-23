import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuthStore } from '@/lib/store';

interface OrderItem {
  id: string;
  product: {
    nom: string;
    prix: number;
    image_url: string;
  };
  quantity: number;
  prix: number;
}

interface Order {
  id: string;
  statut: string;
  total: number;
  adresse: string;
  date_commande: string;
  items: OrderItem[];
}

export function OrderDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuthStore();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/orders/${id}?user_id=${user.id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch order details');
        }
        const data = await response.json();
        setOrder(data);
      } catch (error) {
        console.error('Error fetching order details:', error);
      } finally {
        setLoading(false);
      }
    };

    if (user && id) {
      fetchOrderDetails();
    }
  }, [user, id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!order) {
    return <div>Order not found.</div>;
  }

  return (
    <div className="container py-12">
      <h1 className="mb-8 text-3xl font-bold">Commande #{order.id}</h1>
      <div className="p-4 border rounded-lg">
        <div className="mb-4">
          <h2 className="text-lg font-medium">Détails</h2>
          <p className="mt-2">Statut: {order.statut}</p>
          <p className="mt-2">Total: {typeof order.total === 'number' ? order.total.toFixed(2) : order.total} €</p>
          <p className="mt-2">Adresse de livraison: {order.adresse}</p>
          <p className="mt-2">Passée le: {new Date(order.date_commande).toLocaleDateString()}</p>
        </div>
        <div className="mb-4">
          <h2 className="text-lg font-medium">Items</h2>
          <div className="grid grid-cols-1 gap-6">
            {order.items && order.items.map((item) => (
              <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center">
                  <img src={item.product.image_url} alt={item.product.nom} className="w-20 h-20 rounded-lg" />
                  <div className="ml-4">
                    <h3 className="text-lg font-medium">{item.product.nom}</h3>
                    <p className="text-sm text-gray-500">{item.prix.toFixed(2)} € x {item.quantity}</p>
                  </div>
                </div>
                <div className="text-lg font-medium">{(item.prix * item.quantity).toFixed(2)} €</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}