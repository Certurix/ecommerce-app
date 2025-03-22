import { ShoppingCart, User } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuContent,
} from "@/components/ui/navigation-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Link } from "react-router-dom";
import { useAuthStore, useCartStore } from "@/lib/store";

const categories = {
  "Montres Hommes": ["Luxe", "Sport", "Casual"],
  "Montres Femmes": ["Luxe", "Sport", "Casual"],
  "Montres Enfants": ["Digital", "Analogique"],
};

export function Header() {
  const { user } = useAuthStore();
  const { items } = useCartStore();
  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="border-b">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link to="/" className="text-2xl font-bold">
            ChronoTime
          </Link>
          <NavigationMenu>
            <NavigationMenuList>
              {Object.entries(categories).map(([category, subcategories]) => (
                <NavigationMenuItem key={category}>
                  <NavigationMenuTrigger>{category}</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                      {subcategories.map((subcategory) => (
                        <li key={subcategory}>
                          <Link
                            to={`/category/${category.toLowerCase()}/${subcategory.toLowerCase()}`}
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          >
                            <div className="text-sm font-medium leading-none">
                              {subcategory}
                            </div>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              ))}
              <NavigationMenuItem>
                <Link
                  to="/new-arrivals"
                  className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
                >
                  Nouveautés
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link
                  to="/sale"
                  className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
                >
                  Soldes
                </Link>
              </NavigationMenuItem>
              {!user && (
                <NavigationMenuItem>
                  <Link
                    to="/register"
                    className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
                  >
                    S'inscrire
                  </Link>
                </NavigationMenuItem>
              )}
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        <div className="flex items-center gap-4">
            {user && (
            <Link to="/cart" className="relative">
              <ShoppingCart className="h-6 w-6" />
              {cartCount > 0 && (
              <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                {cartCount}
              </span>
              )}
            </Link>
            )}
            <Link to={user ? "/account" : "/login"} className={user ? "" : "text-sm font-medium"}>
            {user ? (
              <Avatar>
              <AvatarFallback>
                <User className="h-5 w-5" />
              </AvatarFallback>
              </Avatar>
            ) : (
              "Se connecter"
            )}
            </Link>
        </div>
      </div>
    </header>
  );
}
