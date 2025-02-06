import { LoaderCircle } from "lucide-react";

interface ButtonProps {
    children?: React.ReactNode;
    type?: "button" | "submit" | "reset" | undefined;
    onClick?: () => void;
    style?: string
    color?: ButtonColor;
    active?: boolean;
    loading?: boolean;
    disabled?: boolean;
    title?: string;
}

export enum ButtonColor {
    GREEN = "green",
    RED = "red",
    BLUE = "blue",
    BORDERLESS = "borderless",
}

const colorMap = {
    [ButtonColor.GREEN]: "bg-[var(--primary)] text-[var(--background)] hover:bg-[var(--primary2)]",
    [ButtonColor.RED]: "bg-[var(--error2)] text-[var(--background)] hover:bg-[var(--error)]",
    [ButtonColor.BLUE]: "bg-[var(--primary)] text-[var(--background)] hover:bg-[var(--primary2)]",
    [ButtonColor.BORDERLESS]: "bg-transparent text-[var(--foreground4)] hover:bg-[var(--background3)]",
};

const Button: React.FC<ButtonProps> = (props) => {
    return (
    <button
        title={props.title}
        type={props.type}
        disabled={props.loading || props.disabled}
        onClick={(e) => {
            e.stopPropagation();
            props.onClick && props.onClick();
        }}
        className={`cursor-pointer focus:outline-none origin-center transition hover:scale-101 flex justify-center flex-row gap-2 items-center w-full p-2 rounded-lg  ease-in-out duration-300 ${props.active && "font-semibold"} ${colorMap[props.color ?? ButtonColor.GREEN]} ${props.style} ${(props.loading || props.disabled) && "cursor-not-allowed opacity-60"}`}
    >
        {props.loading ? <LoaderCircle className="animate-spin" size={24}/> : props.children}
    </button>
    );
}

export default Button;