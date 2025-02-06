"use client";

import create from "@/actions/posts/create";
import Button from "@/components/common/Button";
import { useRef } from "react";

export default function Home() {
    const titleRef = useRef<HTMLInputElement>(null);
    const contentRef = useRef<HTMLTextAreaElement>(null);

    return (
        <>
        <p className="text-4xl font-bold ">  
            Vytvořit nový příspěvek
        </p>
        <input ref={titleRef} className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none hover:border-[var(--primary)] focus:border-[var(--primary2)]" placeholder="Titulek"></input>
        <textarea ref={contentRef} className="resize-none w-full h-96 p-4 border border-gray-300 rounded-lg focus:outline-none hover:border-[var(--primary)] focus:border-[var(--primary2)]" placeholder="Napište něco..."></textarea>
        <div className="flex justify-end">
            <Button style="max-w-40 font-bold" onClick={() => {
                if (!titleRef.current?.value || !contentRef.current?.value) {
                    return;
                }
                create({ post: { title: titleRef.current?.value, content: contentRef.current.value } })
                titleRef.current.value = "";
                contentRef.current.value = "";
            }}>Vytvořit</Button>
        </div>
        </>
    )
}