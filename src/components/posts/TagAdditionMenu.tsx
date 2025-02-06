"use client";

import { useEffect, useRef, useState } from "react";
import Input from "../forms/Input";
import Select from "../forms/Select";
import Button from "../common/Button";
import { PlusCircle } from "lucide-react";
import create from "@/actions/tags/create";
import get from "@/actions/tags/get";
import add from "@/actions/tags/add";


const TagAdditionMenu = ({
    onClose,
    post_id,
} : {
    onClose: () => void;
    post_id: number;
}) => {
    const newTagRef = useRef<HTMLInputElement>(null);
    const selectedTagRef = useRef<HTMLSelectElement>(null);

    const [tags, setTags] = useState<{
        id: number;
        name: string;
    }[]>([]);

    useEffect(() => {
        const fetchTags = async () => {
            const tags = await get();
            setTags(tags);
        }
        fetchTags();
    }, []);

    return (
        <div onClick={() => {
            onClose();
        }} className={`fixed top-0 left-0 w-full h-full bg-[var(--foreground)]/50 z-50`}>
            <div onClick={(e) => {
                e.stopPropagation();
            }} className="w-96 bg-[var(--background3)] p-8 rounded-lg flex flex-col gap-4 items-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <Select ref={selectedTagRef}>
                    {tags.map((tag, i) => {
                        return (
                        <option value={tag.id} key={tag.id}>{tag.name}</option>
                    )})}
                </Select>
                <p>or create new</p>
                <Input ref={newTagRef} placeholder="Tag name" />
                <Button style="font-bold" onClick={() => {
                    console.log(newTagRef.current?.value);
                    const getTagId = async () => {
                        if (newTagRef.current?.value === "" || newTagRef.current?.value === null || !newTagRef.current?.value) {
                            if (!selectedTagRef.current?.value) return;
                            return parseInt(selectedTagRef.current?.value);

                        } else {
                            return await create({name: newTagRef.current?.value})
                        }
                    }
                    getTagId().then((tag_id) => {
                        console.log(tag_id);
                        if (!tag_id) return;
                        add({tag: tag_id, post: post_id}).then(() => {
                            onClose();
                        });
                    });
                } }>Add <PlusCircle /></Button>    
            </div>
        </div>
    );
}

export default TagAdditionMenu;