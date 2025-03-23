import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "@/lib/store";

interface Order {
  id: string;
  statut: string;
  total: number;
  date_commande: string;
}

export function OrdersPage() {
  const { user } = useAuthStore();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      const response = await fetch(`http://localhost:5000/api/orders?user_id=${user.id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch orders');
      }
      const data = await response.json();
      setOrders(data);
      setLoading(false);
    };

    if (user) {
      fetchOrders().catch(error => {
        console.error('Error fetching orders:', error);
        setLoading(false);
      });
    }
  }, [user]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (orders.length === 0) {
    return <div>No orders found.</div>;
  }

  return (
    <div className="container py-12">
      <h1 className="mb-8 text-3xl font-bold">Mes commandes</h1>
      <div className="grid grid-cols-1 gap-6">
        {orders.map((order) => (
          <div key={order.id} className="p-4 border rounded-lg">
            <div className="flex justify-between">
              <div>
                <h2 className="text-lg font-medium">Commande #{order.id}</h2>
                <p className="text-sm text-gray-500">Statut: {order.statut}</p>
                <p className="text-sm text-gray-500">
                  Total: {typeof order.total === 'number' ? order.total.toFixed(2) : order.total} €
                </p>
                <p className="text-sm text-gray-500">
                  Passée le: {new Date(order.date_commande).toLocaleDateString()}
                </p>
              </div>
              <Link
                to={`/orders/${order.id}`}
                className="text-primary hover:underline"
              >
                Voir la commande
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}