import { PostCard } from "@/components/site/Cards";
import { PageIntro } from "@/components/site/PageIntro";
import { Reveal } from "@/components/site/Reveal";
import { api } from "@/lib/api";

export const metadata = { title: "Blog" };

export default async function BlogPage() {
  const posts = await api.posts();
  const [lead, ...rest] = posts;

  return (
    <div className="mx-auto max-w-[1400px] px-4 pb-16 sm:px-6 sm:pb-20">
      <PageIntro kicker="Notas de ruta" title="Blog">
        Guías, pueblos y tips para viajar mejor, con más aire que en Instagram.
      </PageIntro>
      {posts.length === 0 ? (
        <p className="mt-10 text-muted-foreground">Todavía no hay notas publicadas.</p>
      ) : (
        <div className="mt-10 grid gap-6">
          {lead ? (
            <Reveal>
              <PostCard post={lead} featured />
            </Reveal>
          ) : null}
          {rest.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {rest.map((post, index) => (
                <Reveal key={post.id} delay={index * 80}>
                  <PostCard post={post} />
                </Reveal>
              ))}
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
}
