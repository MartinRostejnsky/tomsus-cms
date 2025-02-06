"use client";

import { CirclePlus, Trash2 } from "lucide-react";
import Button, { ButtonColor } from "../common/Button"
import remove from "@/actions/posts/remove";
import { redirect } from "next/navigation";

const PostEditMenu = ({post_id} : {post_id : number}) => {
    return (
        <div className="w-full flex justify-between">
            <Button onClick={() => {
                console.log("Add tag");
            }} style="max-w-40 font-bold">Add tag <CirclePlus/></Button>
            <Button onClick={() => {
                remove({post: post_id}).then(() => {
                    redirect("/dashboard");
                });
            }} color={ButtonColor.RED} style="max-w-40 font-bold">Remove <Trash2 /></Button>
        </div>
    )
}

export default PostEditMenu;