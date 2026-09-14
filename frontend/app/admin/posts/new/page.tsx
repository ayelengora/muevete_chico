import { ContentEditor } from "@/components/admin/ContentEditor";

export default function NewPostPage() {
  return (
    <div>
      <h1 className="mb-6 font-heading text-4xl">Nueva nota</h1>
      <ContentEditor kind="posts" />
    </div>
  );
}
