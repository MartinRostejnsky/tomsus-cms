import React from "react";

interface InputGroupProps {
    children?: React.ReactNode;
}

const InputGroup: React.FC<InputGroupProps> = (props) => {
    return (
        <div className="flex flex-col w-full gap-2 md:flex-row">
            {props.children}
        </div>
    );
}

export default InputGroup;