import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuthStore } from '@/lib/store';

interface OrderItem {
  id: string;
  product: {
    name: string;
    price: number;
    image_url: string;
  };
  quantity: number;
  price: number;
}

interface Order {
  id: string;
  status: string;
  total: number;
  shipping_address: string;
  created_at: string;
  items: OrderItem[];
}

export function OrderDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuthStore();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      const response = await fetch(`/api/orders/${id}?user_id=${user.id}`);
      const data = await response.json();
      setOrder(data);
      setLoading(false);
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
          <p className="mt-2">Statut: {order.status}</p>
          <p className="mt-2">Total: ${order.total.toFixed(2)}</p>
          <p className="mt-2">Adresse de livraison: {order.shipping_address}</p>
            <p className="mt-2">Passée le: {new Date(order.created_at).toLocaleDateString()}</p>
        </div>
        <div className="mb-4">
          <h2 className="text-lg font-medium">Items</h2>
          <div className="grid grid-cols-1 gap-6">
            {order.items.map((item) => (
              <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center">
                  <img src={item.product.image_url} alt={item.product.name} className="w-20 h-20 rounded-lg" />
                  <div className="ml-4">
                    <h3 className="text-lg font-medium">{item.product.name}</h3>
                    <p className="text-sm text-gray-500">${item.price.toFixed(2)} x {item.quantity}</p>
                  </div>
                </div>
                <div className="text-lg font-medium">${(item.price * item.quantity).toFixed(2)}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}