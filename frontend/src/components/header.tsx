import { useState } from "react";
import { ShoppingCart, User, Menu, X } from "lucide-react";
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
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b bg-white">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link to="/" className="text-2xl font-bold">
            ChronoTime
          </Link>
          <div className="hidden lg:block">
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
              </NavigationMenuList>
            </NavigationMenu>
          </div>
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

          <Link
            to={user ? "/account" : "/login"}
            className={user ? "" : "text-sm font-medium"}
          >
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
          {!user && (
            <Link to="/register" className="text-sm font-medium">
              S'inscrire
            </Link>
          )}
          <button
            className="block lg:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>
      {menuOpen && (
        <div className="lg:hidden">
          <NavigationMenu>
            <NavigationMenuList>
              {Object.entries(categories).map(([category, subcategories]) => (
                <NavigationMenuItem key={category}>
                  <NavigationMenuTrigger>{category}</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-full gap-3 p-4">
                      {subcategories.map((subcategory) => (
                        <li key={subcategory}>
                          <Link
                            to={`/category/${category.toLowerCase()}/${subcategory.toLowerCase()}`}
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                            onClick={() => setMenuOpen(false)}
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
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      )}
    </header>
  );
}