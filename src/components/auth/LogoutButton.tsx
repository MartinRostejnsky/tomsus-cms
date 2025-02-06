"use client";

import { signOut } from "next-auth/react";
import Button from "../common/Button";
import { LogOut } from "lucide-react";

const LogoutButton = () => {
    return (
        <Button style="font-bold gap-2" onClick={() => signOut()}>
        <LogOut size={24} />
        Sign Out
        </Button>
    );
};

export default LogoutButton;