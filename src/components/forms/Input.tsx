"use client";

import { Ref } from "react";

type InputProps = {
    ref: Ref<HTMLInputElement> | undefined;
    placeholder: string;
    type?: string;
    maxlength?: number;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    errorMessages?: string[];
}

const Input: React.FC<InputProps> = (props) => {
    return (
        <div className="w-full flex flex-col justify-end">
            <div>
                {props.errorMessages && props.errorMessages.length > 0 && (
                    <ul className="text-[var(--error)]">
                        {props.errorMessages.map((error, index) => {
                            return (
                            
                            <li key={index}>error</li>
                        )})}
                    </ul>
                )}
            </div>
            <input
                    onChange={props.onChange}
                    maxLength={props.maxlength || 255}
                    ref={props.ref}
                    type={props.type}
                    placeholder={props.placeholder}
                    className="w-full p-2 rounded-lg focus:border-[var(--primary2)] hover:border-[var(--primary)] focus:outline-none text-[var(--foreground4)] border border-[var(--background3)]"
                />
        </div>
    );
}

export default Input;