// pages/index.tsx
import { GetServerSideProps } from "next";
import { prisma } from "@/lib/prisma";
import { Post, User } from "@prisma/client";

type PostWithAuthor = Post & {
  author: User;
};

export const getServerSideProps: GetServerSideProps = async () => {
  // Získáme pouze publikované příspěvky
  const posts = await prisma.post.findMany({
    where: { published: true },
    include: { author: true },
  });

  return {
    props: {
      posts: JSON.parse(JSON.stringify(posts)) as PostWithAuthor[],
    },
  };
};

export default function Home({ posts }: { posts: PostWithAuthor[] }) {
  return (
    <div style={{ margin: "0 auto", maxWidth: "600px" }}>
      <h1>Public Posts</h1>
      {posts.length === 0 && <p>No published posts yet.</p>}
      {posts.map((post) => (
        <article key={post.id} style={{ marginBottom: 20 }}>
          <h2>{post.title}</h2>
          <p>{post.content}</p>
          <small>By {post.author.name}</small>
        </article>
      ))}
    </div>
  );
}
