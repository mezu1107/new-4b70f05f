import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import logoSrc from "@/assets/logo.png";

interface LineItem { description: string; quantity: number; unit_price: number; }

interface DocData {
  numberLabel: string; // "Invoice" or "Proposal"
  number: string;
  client_name: string;
  client_email?: string;
  client_address?: string;
  issue_date?: string;
  due_date?: string;
  valid_until?: string;
  title?: string;
  scope?: string;
  notes?: string;
  currency: string;
  subtotal: number;
  tax_rate?: number;
  tax_amount?: number;
  total: number;
  line_items: LineItem[];
  status?: string;
}

interface CompanyInfo {
  name: string;
  email?: string;
  phone?: string;
  address?: string;
  logoUrl?: string;
}

const loadImage = (src: string): Promise<string> =>
  new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width; canvas.height = img.height;
      canvas.getContext("2d")!.drawImage(img, 0, 0);
      try { resolve(canvas.toDataURL("image/png")); } catch { resolve(""); }
    };
    img.onerror = () => resolve("");
    img.src = src;
  });

export const generateDocPDF = async (doc: DocData, company: CompanyInfo) => {
  const pdf = new jsPDF({ unit: "pt", format: "a4" });
  const W = pdf.internal.pageSize.getWidth();
  const H = pdf.internal.pageSize.getHeight();
  const M = 40;

  const PRIMARY: [number, number, number] = [15, 76, 129];
  const ACCENT: [number, number, number] = [255, 140, 0];
  const MUTED: [number, number, number] = [100, 116, 139];

  // Header band
  pdf.setFillColor(...PRIMARY);
  pdf.rect(0, 0, W, 90, "F");

  // Logo
  const logoData = await loadImage(company.logoUrl || logoSrc);
  if (logoData) {
    try { pdf.addImage(logoData, "PNG", M, 18, 54, 54); } catch {}
  }

  pdf.setTextColor(255, 255, 255);
  pdf.setFont("helvetica", "bold"); pdf.setFontSize(20);
  pdf.text(company.name, M + 70, 40);
  pdf.setFont("helvetica", "normal"); pdf.setFontSize(9);
  let cy = 56;
  if (company.address) { pdf.text(company.address, M + 70, cy); cy += 12; }
  const cl: string[] = [];
  if (company.phone) cl.push(`Tel: ${company.phone}`);
  if (company.email) cl.push(company.email);
  if (cl.length) pdf.text(cl.join("  •  "), M + 70, cy);

  // Doc title block (right)
  pdf.setFont("helvetica", "bold"); pdf.setFontSize(28);
  pdf.text(doc.numberLabel.toUpperCase(), W - M, 40, { align: "right" });
  pdf.setFont("helvetica", "normal"); pdf.setFontSize(10);
  pdf.text(`# ${doc.number}`, W - M, 60, { align: "right" });
  if (doc.status) pdf.text(`Status: ${doc.status.toUpperCase()}`, W - M, 75, { align: "right" });

  // Reset text color
  pdf.setTextColor(20, 20, 20);

  // Bill To / Meta
  let y = 120;
  pdf.setFont("helvetica", "bold"); pdf.setFontSize(11);
  pdf.setTextColor(...PRIMARY);
  pdf.text(doc.numberLabel === "Invoice" ? "BILL TO" : "PREPARED FOR", M, y);
  pdf.setTextColor(20, 20, 20);
  pdf.setFont("helvetica", "normal"); pdf.setFontSize(10);
  let by = y + 16;
  pdf.setFont("helvetica", "bold"); pdf.text(doc.client_name, M, by); by += 13;
  pdf.setFont("helvetica", "normal");
  if (doc.client_email) { pdf.text(doc.client_email, M, by); by += 13; }
  if (doc.client_address) {
    pdf.splitTextToSize(doc.client_address, 220).forEach((l: string) => { pdf.text(l, M, by); by += 13; });
  }

  // Right meta
  const metaX = W - M - 200;
  let my = y;
  pdf.setFont("helvetica", "bold"); pdf.setFontSize(11); pdf.setTextColor(...PRIMARY);
  pdf.text("DETAILS", metaX, my); my += 16;
  pdf.setTextColor(20, 20, 20); pdf.setFontSize(10);
  const meta: [string, string][] = [];
  if (doc.issue_date) meta.push(["Issue Date", doc.issue_date]);
  if (doc.due_date) meta.push(["Due Date", doc.due_date]);
  if (doc.valid_until) meta.push(["Valid Until", doc.valid_until]);
  meta.push(["Currency", doc.currency]);
  meta.forEach(([k, v]) => {
    pdf.setFont("helvetica", "normal"); pdf.setTextColor(...MUTED);
    pdf.text(k, metaX, my);
    pdf.setFont("helvetica", "bold"); pdf.setTextColor(20, 20, 20);
    pdf.text(v, metaX + 200, my, { align: "right" });
    my += 14;
  });

  y = Math.max(by, my) + 15;

  if (doc.title) {
    pdf.setFont("helvetica", "bold"); pdf.setFontSize(13);
    pdf.text(doc.title, M, y); y += 16;
  }
  if (doc.scope) {
    pdf.setFont("helvetica", "normal"); pdf.setFontSize(10); pdf.setTextColor(...MUTED);
    pdf.splitTextToSize(doc.scope, W - M * 2).forEach((l: string) => { pdf.text(l, M, y); y += 13; });
    pdf.setTextColor(20, 20, 20);
    y += 6;
  }

  // Line items table
  autoTable(pdf, {
    startY: y,
    head: [["#", "Description", "Qty", "Unit Price", "Amount"]],
    body: doc.line_items.map((it, i) => [
      String(i + 1),
      it.description,
      String(it.quantity),
      `${doc.currency} ${Number(it.unit_price).toFixed(2)}`,
      `${doc.currency} ${(Number(it.quantity) * Number(it.unit_price)).toFixed(2)}`,
    ]),
    theme: "grid",
    headStyles: { fillColor: PRIMARY, textColor: 255, fontStyle: "bold" },
    bodyStyles: { fontSize: 10 },
    columnStyles: { 0: { cellWidth: 30 }, 2: { halign: "right", cellWidth: 50 }, 3: { halign: "right", cellWidth: 90 }, 4: { halign: "right", cellWidth: 90 } },
    margin: { left: M, right: M },
  });

  let ty = (pdf as any).lastAutoTable.finalY + 12;

  // Totals box
  const boxX = W - M - 220;
  pdf.setFont("helvetica", "normal"); pdf.setFontSize(10);
  const row = (k: string, v: string, bold = false) => {
    pdf.setFont("helvetica", bold ? "bold" : "normal");
    pdf.text(k, boxX, ty);
    pdf.text(v, W - M, ty, { align: "right" });
    ty += 16;
  };
  row("Subtotal", `${doc.currency} ${doc.subtotal.toFixed(2)}`);
  if (doc.tax_amount) row(`Tax (${doc.tax_rate}%)`, `${doc.currency} ${doc.tax_amount.toFixed(2)}`);
  pdf.setDrawColor(...PRIMARY); pdf.setLineWidth(1);
  pdf.line(boxX, ty - 8, W - M, ty - 8);
  pdf.setFontSize(13); pdf.setTextColor(...PRIMARY);
  row("TOTAL", `${doc.currency} ${doc.total.toFixed(2)}`, true);
  pdf.setTextColor(20, 20, 20); pdf.setFontSize(10);

  // Notes
  if (doc.notes) {
    ty += 10;
    pdf.setFont("helvetica", "bold"); pdf.setTextColor(...PRIMARY);
    pdf.text("NOTES", M, ty); ty += 14;
    pdf.setFont("helvetica", "normal"); pdf.setTextColor(20, 20, 20);
    pdf.splitTextToSize(doc.notes, W - M * 2).forEach((l: string) => { pdf.text(l, M, ty); ty += 13; });
  }

  // Footer
  const fy = H - 50;
  pdf.setDrawColor(...PRIMARY); pdf.setLineWidth(0.5);
  pdf.line(M, fy - 10, W - M, fy - 10);
  pdf.setFont("helvetica", "bold"); pdf.setFontSize(11); pdf.setTextColor(...PRIMARY);
  pdf.text("Thank you for your business!", M, fy);
  pdf.setFont("helvetica", "normal"); pdf.setFontSize(9); pdf.setTextColor(...MUTED);
  const footerLine = [company.name, company.phone, company.email].filter(Boolean).join("  •  ");
  pdf.text(footerLine, W - M, fy, { align: "right" });
  pdf.setFontSize(8);
  pdf.text("WhatsApp: https://wa.me/923173712950", W - M, fy + 14, { align: "right" });

  pdf.save(`${doc.numberLabel}-${doc.number}.pdf`);
};
