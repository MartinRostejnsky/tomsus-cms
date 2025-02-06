"use client";

import { CirclePlus, Trash2 } from "lucide-react";
import Button, { ButtonColor } from "../common/Button"

const PostEditMenu = () => {
    return (
        <div className="w-full flex justify-between">
                <Button style="max-w-40 font-bold">Add tag <CirclePlus/></Button>
                <Button color={ButtonColor.RED} style="max-w-40 font-bold">Remove <Trash2 /></Button>
        </div>
    )
}

export default PostEditMenu;