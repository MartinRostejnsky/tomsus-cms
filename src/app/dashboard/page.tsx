import PostPreview from "@/components/posts/PostPreview";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import authOptions from "../utils/auth.options";

export default async function Home() {
    const session = await getServerSession(authOptions);
    const posts = await prisma.post.findMany({
        include: {
            author: true
        },
        where: {
            authorId: Number(session?.user.id)
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
                author: post.author.name
            }} />
        ))}
        </>
    );
}