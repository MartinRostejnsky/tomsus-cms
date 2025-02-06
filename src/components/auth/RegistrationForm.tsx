"use client";

import register from "@/actions/auth/register";
import Button from "@/components/common/Button";
import Input from "@/components/forms/Input";
import { useRef, useState } from "react";

const RegistrationForm = () => {
    const [loading, setLoading] = useState(false);

    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const nameRef = useRef<HTMLInputElement>(null);

    return (
        <form className="flex flex-col items-center w-full gap-2">
            <Input ref={emailRef} placeholder="Email"></Input>
            <Input ref={passwordRef} type="password" placeholder="Password"></Input>
            <Input ref={nameRef} placeholder="Name"></Input>
            <Button style="font-bold" type="submit" loading={loading}
            onClick={() => {
                const email = emailRef.current?.value
                const password = passwordRef.current?.value
                const name = nameRef.current?.value

                if (email && password && name) {
                    setLoading(true);

                    register({
                            email,
                            password,
                            name,
                    })
    
                    setLoading(false);
                }
            }}
            >
                Register
            </Button>
        </form>
    );
}

export default RegistrationForm;