import { PostCard } from "@/components/site/Cards";
import { api } from "@/lib/api";

export const metadata = { title: "Blog" };

export default async function BlogPage() {
  const posts = await api.posts();

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:py-16">
      <p className="kicker">Notas de ruta</p>
      <h1 className="mt-3 font-heading text-4xl leading-[1.08] sm:text-5xl">Blog</h1>
      <p className="mt-4 max-w-xl text-muted-foreground">
        Guías, pueblos y tips para viajar mejor, con más aire que en Instagram.
      </p>
      {posts.length === 0 ? (
        <p className="mt-10 text-muted-foreground">Todavía no hay notas publicadas.</p>
      ) : (
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}
