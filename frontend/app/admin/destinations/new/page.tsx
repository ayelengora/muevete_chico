import { ContentEditor } from "@/components/admin/ContentEditor";

export default function NewDestinationPage() {
  return (
    <div>
      <h1 className="mb-6 font-heading text-4xl">Nuevo destino</h1>
      <ContentEditor kind="destinations" />
    </div>
  );
}
