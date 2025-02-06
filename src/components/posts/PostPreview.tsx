import Link from "next/link";

interface PostViewProps {
    post: {
        id: string;
        title: string;
        content: string;
        createdAt: Date;
        author: string;
    };
}

const PostPreview = (props: PostViewProps) => {
    return (
        <Link href={`/post/${props.post.id}`}>
            <div className="flex flex-col gap-4 bg-[var(--background3)] p-4 rounded-lg">
                <div className="flex flex-col">
                    <p className="text-2xl font-bold">{props.post.title}</p>
                    <p className="text-sm text-gray-500">Written by {props.post.author}</p>
                </div>
                <p>{props.post.content}</p>
                <p className="text-sm text-gray-500">{props.post.createdAt.toLocaleString()}</p>
            </div>
        </Link>
    );
}

export default PostPreview;