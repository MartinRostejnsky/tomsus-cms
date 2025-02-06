import authOptions from "@/app/utils/auth.options";
import { getServerSession } from "next-auth";
import Link from "next/link";

const CurrentUser = async () => {
    const session = await getServerSession(authOptions);

    return (
        <div className="flex items-center gap-2">
        {session ? (<>
        <div className="flex items-center gap-2">
            <span className="font-bold">{session.user?.name}</span>
            <span className="text-sm">({session.user?.email})</span>
        </div>
        </>) : (

            <div className="flex items-center gap-2">
                <span>Not signed in</span>
                <Link href="/auth/login">
                    <span className="font-bold text-[var(--primary)]">Sign in</span>
                </Link>
            </div>)}
        </div>
    )
}

export default CurrentUser;