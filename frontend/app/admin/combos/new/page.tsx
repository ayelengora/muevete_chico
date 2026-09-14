import { ContentEditor } from "@/components/admin/ContentEditor";

export default function NewComboPage() {
  return (
    <div>
      <h1 className="mb-6 font-heading text-4xl">Nuevo combo</h1>
      <ContentEditor kind="combos" />
    </div>
  );
}
