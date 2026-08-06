import { FinancialDocs } from "@/components/admin/FinancialDocs";
export default () => <FinancialDocs table="invoices" title="Invoices" numberPrefix="INV" numberField="invoice_number" statuses={["draft", "sent", "paid", "overdue", "void"]} />;
