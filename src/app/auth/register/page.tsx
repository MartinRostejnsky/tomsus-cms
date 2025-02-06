import RegistrationForm from "@/components/auth/RegistrationForm";
import { UserPlus } from "lucide-react";

const RegisterPage = () => {
    return (
        <>
        <UserPlus size={48}/>
        <p className="font-bold text-2xl">Register</p>
        <RegistrationForm />
        </>
    );
};

export default RegisterPage;