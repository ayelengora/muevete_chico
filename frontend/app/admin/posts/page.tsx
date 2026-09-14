"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { adminRequest } from "@/lib/api";
import { getAdminToken } from "@/lib/auth";
import type { Post } from "@/lib/types";

export default function AdminPostsPage() {
  const [posts, setPosts] = useState<Post[]>([]);

  function load(token: string) {
    adminRequest<Post[]>("/api/v1/admin/posts", token).then(setPosts);
  }

  useEffect(() => {
    const token = getAdminToken();
    if (token) load(token);
  }, []);

  async function remove(id: number) {
    const token = getAdminToken();
    if (!token || !confirm("¿Borrar esta nota?")) return;
    await adminRequest(`/api/v1/admin/posts/${id}`, token, { method: "DELETE" });
    load(token);
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-heading text-4xl">Blogs</h1>
        <Link href="/admin/posts/new" className="inline-flex h-8 items-center rounded-full bg-ink px-3 text-sm text-cream">
          Nueva nota
        </Link>
      </div>
      <div className="mt-6 space-y-3">
        {posts.length === 0 ? (
          <p className="text-muted-foreground">Todavía no hay notas. Subí la primera.</p>
        ) : (
          posts.map((post) => (
            <div key={post.id} className="surface flex items-center justify-between px-4 py-3">
              <div>
                <p className="font-medium">{post.title}</p>
                <p className="text-xs text-muted-foreground">
                  {post.published ? "Publicada" : "Borrador"} · {post.destination}
                </p>
              </div>
              <div className="flex gap-2">
                <Link href={`/admin/posts/${post.id}`} className="inline-flex h-7 items-center rounded-lg border border-border px-2.5 text-[0.8rem]">
                  Editar
                </Link>
                <Button variant="destructive" size="sm" onClick={() => remove(post.id)}>
                  Borrar
                </Button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
