import { jsPDF } from "jspdf"
import { getTermoRecebimento, getTermoResponsabilidade, type Block, type TermoData } from "./termos"
import { LOGO_GAVIOES_PNG } from "./logo-data"

const PAGE_W = 210, PAGE_H = 297, MARGIN_X = 20, MARGIN_TOP = 22, MARGIN_BOTTOM = 24, CONTENT_W = PAGE_W - MARGIN_X * 2, LINE_H = 6

class PdfWriter {
  doc: jsPDF
  y = MARGIN_TOP
  constructor() { this.doc = new jsPDF({ unit: "mm", format: "a4" }) }
  private ensureSpace(needed: number) { if (this.y + needed > PAGE_H - MARGIN_BOTTOM) { this.doc.addPage(); this.y = MARGIN_TOP } }
  private writeLines(text: string, size: number, style: "normal" | "bold", indent = 0) {
    this.doc.setFont("helvetica", style); this.doc.setFontSize(size)
    for (const line of this.doc.splitTextToSize(text, CONTENT_W - indent) as string[]) { this.ensureSpace(LINE_H); this.doc.text(line, MARGIN_X + indent, this.y); this.y += LINE_H }
  }
  renderBlock(block: Block) {
    switch (block.type) {
      case "title": this.y += 2; this.writeLines(block.text, 13, "bold"); this.y += 2; break
      case "heading": this.y += 1; this.writeLines(block.text, 11, "bold"); break
      case "paragraph": this.writeLines(block.text, 10.5, "normal"); break
      case "bullet": this.doc.setFont("helvetica", "normal"); this.doc.setFontSize(10.5); this.ensureSpace(LINE_H); this.doc.text("•", MARGIN_X + 2, this.y); this.writeLines(block.text, 10.5, "normal", 7); break
      case "field": {
        this.ensureSpace(LINE_H); this.doc.setFont("helvetica", "bold"); this.doc.setFontSize(10.5); const label = `${block.label}: `; this.doc.text(label, MARGIN_X, this.y); const labelW = this.doc.getTextWidth(label); this.doc.setFont("helvetica", "normal"); const lines = this.doc.splitTextToSize(block.value, CONTENT_W - labelW) as string[]; this.doc.text(lines[0] ?? "", MARGIN_X + labelW, this.y); this.y += LINE_H; for (const line of lines.slice(1)) { this.ensureSpace(LINE_H); this.doc.text(line, MARGIN_X, this.y); this.y += LINE_H } break
      }
      case "spacer": this.y += (block.size ?? 1) * 2; break
    }
  }
  renderSignatures(signers: { label: string; nome: string }[]) {
    const colW = (CONTENT_W - 14) / 2
    for (let i = 0; i < signers.length; i += 2) {
      this.ensureSpace(32); this.y += 8
      const leftX = MARGIN_X, rightX = MARGIN_X + colW + 14, lineY = this.y
      this.doc.setDrawColor(60); this.doc.setLineWidth(0.3); this.doc.line(leftX, lineY, leftX + colW, lineY)
      if (signers[i + 1]) this.doc.line(rightX, lineY, rightX + colW, lineY)
      this.y += 5; this.doc.setFont("helvetica", "bold"); this.doc.setFontSize(9.5); this.doc.text(signers[i].label, leftX, this.y); if (signers[i + 1]) this.doc.text(signers[i + 1].label, rightX, this.y)
      this.y += 5; this.doc.setFont("helvetica", "normal"); this.doc.setFontSize(9); if (signers[i].nome) this.doc.text(signers[i].nome, leftX, this.y); if (signers[i + 1]?.nome) this.doc.text(signers[i + 1].nome, rightX, this.y); this.y += 4
    }
  }
  renderSingleSignature(nome: string) { this.ensureSpace(24); this.y += 12; this.doc.setDrawColor(60); this.doc.line(MARGIN_X, this.y, MARGIN_X + CONTENT_W * 0.6, this.y); this.y += 5; this.doc.setFont("helvetica", "normal"); this.doc.setFontSize(9); if (nome) this.doc.text(nome, MARGIN_X, this.y) }
  addResponsibilityHeader() { this.doc.addImage(LOGO_GAVIOES_PNG, "PNG", 20, 22, 35, 20.4, undefined, "FAST"); this.y = 49 }
  addPage() { this.doc.addPage(); this.y = MARGIN_TOP }
}

export function generateTermoPdf(data: TermoData): jsPDF { const w = new PdfWriter(); w.addResponsibilityHeader(); for (const block of getTermoResponsabilidade(data)) w.renderBlock(block); w.renderSignatures(data.signers); w.addPage(); for (const block of getTermoRecebimento(data)) w.renderBlock(block); w.renderSingleSignature(data.colaborador.nome); return w.doc }
export function slugify(text: string): string { return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-zA-Z0-9]+/g, "-").replace(/^-+|-+$/g, "").toLowerCase() }
