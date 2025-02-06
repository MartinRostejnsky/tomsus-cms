import PostPreview from "@/components/posts/PostPreview";
import { prisma } from "@/lib/prisma";

export default async function Home() {
    const posts = await prisma.post.findMany({
        include: {
            author: true,
            tags: true
        }
    });
    
    return (<>
        <p className="text-4xl font-bold ">  
            Articles for you
        </p>
        {posts.map((post) => (
            <PostPreview key={post.id} post={{
                id: post.id.toString(),
                title: post.title,
                content: post.content,
                createdAt: post.published,
                author: post.author.name,
                tags: post.tags
            }} />
        ))}
        </>
    );
}