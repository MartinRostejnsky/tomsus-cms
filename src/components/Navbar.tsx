import { AppWindowMac, Home, PlusCircle } from "lucide-react";
import Link from "next/link";
import CurrentUser from "./auth/CurrentUser";
import LogoutButton from "./auth/LogoutButton";
import { getServerSession } from "next-auth";
import authOptions from "@/app/utils/auth.options";

const routes = [
    {
        name: "Home",
        route: "/",
        icon: <Home size={24} />,
        authorized: false
    },
    {
        name: "Post",
        route: "/post/new",
        icon: <PlusCircle size={24} />,
        authorized: true
    },
    {
        name: "Dashboard",
        route: "/dashboard",
        icon: <AppWindowMac size={24} />,
        authorized: true
    },
]

const Navbar = async () => {
    const session = await getServerSession(authOptions);
    return (
        <div className="bg-[var(--background2)] px-8 flex justify-between items-center">
            <nav className="h-full">
                <menu className="flex gap-4 h-full py-1">
                    {routes.filter((route) => {
                        return !route.authorized || session
                    }).map((route,i) => {

                        return (
                            <Link href={route.route} key={i}>                  
                                <li className="px-4 py-4 flex items-center rounded-md cursor-pointer hover:bg-[var(--background3)] h-full">
                                    {route.icon}
                                    <span className="ml-2 font-bold">{route.name}</span>
                                </li>
                            </Link>
                        )
                    })}
                </menu>
                
            </nav>
            <div className="flex gap-4">
                <CurrentUser />
                {session && <LogoutButton />}
            </div>
        </div>
    )
}

export default Navbar;