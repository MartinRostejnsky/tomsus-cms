import LoginForm from "@/components/auth/LoginForm";
import { LogIn } from "lucide-react";

const RegisterPage = () => {
    return (
        <>
        <LogIn size={48}/>
        <p className="font-bold text-2xl">Sign In</p>
        <LoginForm />
        </>
    );
};

export default RegisterPage;