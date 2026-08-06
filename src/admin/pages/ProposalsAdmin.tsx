import { FinancialDocs } from "@/admin/components/FinancialDocs";
export default () => <FinancialDocs table="proposals" title="Proposals" numberPrefix="PROP" numberField="proposal_number" statuses={["draft", "sent", "accepted", "rejected", "expired"]} />;
