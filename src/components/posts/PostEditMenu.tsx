"use client";

import { CirclePlus, Trash2 } from "lucide-react";
import Button, { ButtonColor } from "../common/Button"
import remove from "@/actions/posts/remove";
import { redirect } from "next/navigation";
import { useState } from "react";
import { createPortal } from "react-dom";
import TagAdditionMenu from "./TagAdditionMenu";

const PostEditMenu = ({post_id} : {post_id : number}) => {
    const [showTagWizard, setShowTagWizard] = useState(false);
    return (
        <div className="w-full flex justify-between">
            <Button onClick={() => {
                setShowTagWizard(true);
            }} style="max-w-40 font-bold">Add tag <CirclePlus/></Button>
            <Button onClick={() => {
                remove({post: post_id}).then(() => {
                    redirect("/dashboard");
                });
            }} color={ButtonColor.RED} style="max-w-40 font-bold">Remove <Trash2 /></Button>
            {showTagWizard && (
                createPortal((
                    <TagAdditionMenu post_id={post_id} onClose={() => {
                        setShowTagWizard(false);
                    }} />
                ),document.body)
            )}
        </div>
    )
}

export default PostEditMenu;