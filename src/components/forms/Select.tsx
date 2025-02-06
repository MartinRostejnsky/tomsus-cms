import { Ref } from "react";

interface SelectProps {
    children?: React.ReactNode;
    onChange?: (selected: string) => void;
    ref?: Ref<HTMLSelectElement>;
}

const Select = (props: SelectProps) => {
    return (
        <select 
        ref={props.ref}
        onChange={(e) => {
            if (props.onChange) {
                props.onChange(e.target.value);
            }
        }} className="bg[var(--background)] focus:outline-none w-full p-2 border border-[var(--background3)]-300 rounded-lg focus:border-[var(--primary2)] hover:border-[var(--primary)] focus:outline-none text-[var(--foreground4)]" >
            {props.children}
        </select>
    );
}

export default Select;