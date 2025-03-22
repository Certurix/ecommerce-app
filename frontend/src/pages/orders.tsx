import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "@/lib/store";

interface Order {
  id: string;
  status: string;
  total: number;
  created_at: string;
}

export function OrdersPage() {
  const { user } = useAuthStore();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      const response = await fetch(`/api/orders?user_id=${user.id}`);
      const data = await response.json();
      setOrders(data);
      setLoading(false);
    };

    if (user) {
      fetchOrders();
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
                <p className="text-sm text-gray-500">Statut: {order.status}</p>
                <p className="text-sm text-gray-500">
                  Total: ${order.total.toFixed(2)}
                </p>
                <p className="text-sm text-gray-500">
                  Passée le: {new Date(order.created_at).toLocaleDateString()}
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
