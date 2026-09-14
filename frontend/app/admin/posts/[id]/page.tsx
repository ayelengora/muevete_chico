"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { ContentEditor } from "@/components/admin/ContentEditor";
import { adminRequest } from "@/lib/api";
import { getAdminToken } from "@/lib/auth";
import type { Post } from "@/lib/types";

export default function EditPostPage() {
  const params = useParams<{ id: string }>();
  const [post, setPost] = useState<Post | null>(null);

  useEffect(() => {
    const token = getAdminToken();
    if (!token) return;
    adminRequest<Post>(`/api/v1/admin/posts/${params.id}`, token).then(setPost);
  }, [params.id]);

  if (!post) return <p>Cargando...</p>;

  return (
    <div>
      <h1 className="mb-6 font-heading text-4xl">Editar nota</h1>
      <ContentEditor kind="posts" initial={post} />
    </div>
  );
}
