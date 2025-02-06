import authOptions from "@/app/utils/auth.options";
import PostEditMenu from "@/components/posts/PostEditMenu";
import PostPreview from "@/components/posts/PostPreview";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";

export default async function Home({params} : {params: {id: string}}) {
    const { id } = await params;
    const session = await getServerSession(authOptions);

    const post = await prisma.post.findFirst({
        where: {
            id: Number(id)
        },
        include: {
            author: true,
            tags: true
        }
    })
    console.log(session?.user.id, post?.authorId);

    const isAuthor = Number(session?.user.id) === post?.authorId;

    return (<>
        {isAuthor && (
            <PostEditMenu post_id={Number(id)} />
        )}
        {post && <PostPreview post={{
            id: post?.id.toString(),
            title: post.title,
            content: post.content,
            author: post.author.name,
            createdAt: new Date(),
            tags: post.tags
        }} />}
        </>
    )
}