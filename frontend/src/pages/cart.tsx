import { useCartStore } from "@/lib/store";
import { Link } from "react-router-dom";

export function CartPage() {
  const { items, updateQuantity, removeFromCart } = useCartStore();

  const handleQuantityChange = (productId: string, quantity: number) => {
    updateQuantity(productId, quantity);
  };

  const handleRemove = (productId: string) => {
    removeFromCart(productId);
  };

  const total = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  return (
    <div className="container py-12">
      <h1 className="mb-8 text-3xl font-bold">Panier</h1>
      {items.length === 0 ? (
        <p>
          Votre panier est vide.{" "}
          <Link to="/" className="text-primary">
            Continuer à acheter
          </Link>
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <div className="flex items-center">
                  <img
                    src={item.product.image_url}
                    alt={item.product.name}
                    className="w-20 h-20 rounded-lg"
                  />
                  <div className="ml-4">
                    <h2 className="text-lg font-medium">{item.product.name}</h2>
                    <p className="text-sm text-gray-500">
                      ${item.product.price.toFixed(2)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) =>
                      handleQuantityChange(
                        item.product_id,
                        parseInt(e.target.value)
                      )
                    }
                    className="w-16 p-2 border rounded-lg"
                  />
                  <button
                    onClick={() => handleRemove(item.product_id)}
                    className="ml-4 text-red-500 hover:underline"
                  >
                    Supprimer
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="p-4 border rounded-lg">
            <h2 className="text-lg font-medium">Résumé de commande</h2>
            <div className="mt-4">
              <div className="flex justify-between">
                <span>Sous-total</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Livraison</span>
                <span>Gratuite</span>
              </div>
              <div className="flex justify-between mt-4 font-bold">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <button className="w-full px-4 py-2 mt-6 font-medium text-white bg-primary rounded-lg hover:bg-primary-dark">
                Payer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
