import { PostCard } from "@/components/site/Cards";
import { api } from "@/lib/api";

export const metadata = { title: "Blog" };

export default async function BlogPage() {
  const posts = await api.posts();

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <p className="text-xs tracking-[0.25em] uppercase">Notas de ruta</p>
      <h1 className="mt-2 font-heading text-4xl">Blog de viajes</h1>
      <p className="mt-3 max-w-2xl text-muted-foreground">
        Guías, pueblos, tips para viajar mejor y los recursos que dejo en Instagram,
        acá con más aire.
      </p>
      {posts.length === 0 ? (
        <p className="mt-10 text-muted-foreground">Todavía no hay notas publicadas.</p>
      ) : (
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}
