import { CrudManager } from "@/components/admin/CrudManager";

export default function VaultAdmin() {
  return (
    <CrudManager
      table="aos_vault_files"
      title="AOS · File Vault"
      listColumns={["name", "version", "mime_type"]}
      fields={[
        { key: "client_id", label: "Client ID (UUID)", required: true },
        { key: "name", label: "File Name", required: true },
        { key: "url", label: "File (upload)", type: "image", required: true },
        { key: "version", label: "Version", type: "number" },
        { key: "mime_type", label: "Mime Type" },
        { key: "size_bytes", label: "Size (bytes)", type: "number" },
        { key: "tags", label: "Tags (comma-separated)", type: "tags" },
      ]}
    />
  );
}
