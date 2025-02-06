"use client";

import Button from "@/components/common/Button";
import Input from "@/components/forms/Input";
import { signIn } from "next-auth/react";
import { useRef, useState } from "react";

const LoginForm = () => {
    const [loading, setLoading] = useState(false);

    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    return (
        <form className="flex flex-col items-center w-full gap-2" onSubmit={async (e) => {
            e.preventDefault();
            const email = emailRef.current?.value
                const password = passwordRef.current?.value

                console.log(email, password);
                setLoading(true);
                const signInResult = async () => {
                    console.log("Signing in");
                    const result = await signIn("credentials", {
                        email,
                        password,
                        redirect: true,
                        callbackUrl: "/",
                    });

                    console.log(result);
                };
                await signInResult();
                setLoading(false);
        }}>
            <Input ref={emailRef} placeholder="Email"></Input>
            <Input ref={passwordRef} type="password" placeholder="Password"></Input>
            <Button style="font-bold" type="submit" loading={loading}>
                Sign In
            </Button>
        </form>
    );
}

export default LoginForm;