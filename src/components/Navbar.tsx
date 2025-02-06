import { Home } from "lucide-react";
import Link from "next/link";
import CurrentUser from "./auth/CurrentUser";
import LogoutButton from "./auth/LogoutButton";

const routes = [
    {
        name: "Home",
        route: "/",
        icon: <Home size={24} />
    }
]

const Navbar = () => {
    return (
        <div className="bg-[var(--background2)] p-4 flex justify-between items-center">
            <nav>
                <menu className="flex gap-4">
                    {routes.map((route,i) => (
                        <Link href={route.route} key={i}>                  
                            <li className="px-4 py-2 flex items-center rounded-md cursor-pointer hover:bg-[var(--background3)]">
                                {route.icon}
                                <span className="ml-2 font-bold">{route.name}</span>
                            </li>
                        </Link>

                    ))}
                </menu>
                
            </nav>
            <div className="flex gap-4">
                <CurrentUser />
                <LogoutButton />
            </div>
        </div>
    )
}

export default Navbar;