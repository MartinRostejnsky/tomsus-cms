"use client";

import create from "@/actions/posts/create";

export default function Home() {
    return (
        <>
        <button onClick={() => {
            console.log('vytvořit')
            create({
                post: {
                    title: 'test',
                    content: 'test',
                }
            })
        }}>vytvořit</button>
        </>
    )
}