import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/lib/store";

interface User {
  id: string;
  email: string;
  name: string;
}

export function AccountPage() {
  const { user, signOut } = useAuthStore();
  const navigate = useNavigate();
  const [userData, setUserData] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      const response = await fetch('http://localhost:5000/api/auth/me', {
        headers: {
          'x-user-id': user?.id,
        },
      });
      const data = await response.json();
      setUserData(data.user);
      setLoading(false);
    };

    if (user) {
      fetchUserData();
    }
  }, [user]);

  const handleSignOut = async () => {
    await signOut();
    navigate("/login");
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!userData) {
    return <div>User not found.</div>;
  }

  return (
    <div className="container py-12">
      <h1 className="mb-8 text-3xl font-bold">Détails du compte</h1>
      <div className="p-6 border rounded-lg shadow-lg bg-white">
        <div className="mb-6">
          <h2 className="text-xl font-semibold">Informations du profil</h2>
          <p className="mt-2 text-gray-700"><strong>Email:</strong> {userData.email}</p>
        </div>
        <button onClick={() => navigate('/orders')} className="px-4 py-2 font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600">
          Mes commandes
        </button>
        <div className="mb-6">
          <h2 className="text-xl font-semibold">Actions du compte</h2>
          <button
            onClick={handleSignOut}
            className="px-4 py-2 mt-4 font-medium text-white bg-red-500 rounded-lg hover:bg-red-600"
          >
            Se déconnecter
          </button>
        </div>
      </div>
    </div>
  );
}