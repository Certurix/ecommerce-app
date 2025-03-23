import { useAuthStore } from "@/lib/store";
import { useNavigate } from "react-router-dom";

export function AccountPage() {
  const { user, signOut } = useAuthStore();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate("/login");
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container py-12">
      <h1 className="mb-8 text-3xl font-bold">Détails du compte</h1>
      <div className="p-4 border rounded-lg">
        <div className="mb-4">
          <h2 className="text-lg font-medium">Informations du profil</h2>
          <p className="mt-2">Nom: {user.name}</p>
          <p className="mt-2">Email: {user.email}</p>
        </div>
        <div className="mb-4">
          <h2 className="text-lg font-medium">Actions du compte</h2>
          <button
            onClick={handleSignOut}
            className="px-4 py-2 mt-2 font-medium text-white bg-red-500 rounded-lg hover:bg-red-600"
          >
            Se déconnecter
          </button>
        </div>
      </div>
    </div>
  );
}
