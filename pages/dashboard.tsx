// pages/dashboard.tsx

import { useSession, signOut } from "next-auth/react";
import { prisma } from "@/lib/prisma";
import { Post } from "@prisma/client";
import { GetServerSideProps } from "next";
import Link from "next/link";

type Props = {
  posts: Post[];
};

// Server-side data pro uživatele (vyžadujeme, aby byl přihlášen)
export const getServerSideProps: GetServerSideProps<Props> = async (context) => {
  // Tady byste normálně zjistili z cookies/session ID uživatele,
  // a podle toho vyfiltrovali "jeho" příspěvky.

  // Pro jednoduchost zobrazíme všechny. Ale reálně byste vyžadovali session a ID uživatele.
  const posts = await prisma.post.findMany({
    include: { author: true },
  });

  return {
    props: {
      posts: JSON.parse(JSON.stringify(posts)),
    },
  };
};

export default function Dashboard({ posts }: Props) {
  const { data: session } = useSession();

  if (!session) {
    return <p>Please <Link href="/auth/signin">Sign In</Link> first.</p>;
  }

  return (
    <div style={{ margin: "0 auto", maxWidth: 600 }}>
      <h1>Dashboard</h1>
      <p>Welcome, {session.user?.name}</p>
      <button onClick={() => signOut({ callbackUrl: "/" })}>Sign Out</button>

      <hr />
      <h2>Your Posts</h2>
      {posts.map((post) => (
        <div key={post.id}>
          <strong>{post.title}</strong> | Published: {String(post.published)}
        </div>
      ))}
    </div>
  );
}
