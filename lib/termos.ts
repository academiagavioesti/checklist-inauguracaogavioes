import { getEquipmentType } from "./equipment-config"

export type Signer = { id: string; label: string; nome?: string; kind?: "usuario" }
export type Clause = { id: string; title: string; text?: string; bullets?: string[] }

export type TermoData = {
  company: { razaoSocial: string; cnpj: string; nomeMarca: string; unidadeRazaoSocial: string; unidadeCnpj: string }
  colaborador: { nome: string; cpf: string; data: string }
  equipamento: { tipo: string; marca: string; modelo: string; specificValue: string; acessorios: string; outroNome?: string }
  signers: { label: string; nome: string }[]
  clauses: Clause[]
}

export type Block =
  | { type: "title"; text: string }
  | { type: "heading"; text: string }
  | { type: "paragraph"; text: string }
  | { type: "field"; label: string; value: string }
  | { type: "bullet"; text: string }
  | { type: "spacer"; size?: number }

export function getEquipmentName(eq: TermoData["equipamento"]): string {
  const type = getEquipmentType(eq.tipo)
  return eq.tipo === "outros" && eq.outroNome?.trim() ? eq.outroNome.trim().toLowerCase() : type?.nomeNoTermo ?? "equipamento"
}

function replaceCompany(text: string, razaoSocial: string): string {
  return text.replaceAll("{{razaoSocial}}", razaoSocial)
}

export function getTermoResponsabilidade(data: TermoData): Block[] {
  const { razaoSocial, cnpj } = data.company
  const blocks: Block[] = [
    { type: "title", text: "TERMO DE RESPONSABILIDADE PARA UTILIZAÇÃO DE EQUIPAMENTOS DE T.I" },
    { type: "spacer", size: 4 }, { type: "heading", text: razaoSocial }, { type: "paragraph", text: `CNPJ: ${cnpj}` }, { type: "spacer", size: 2 },
    { type: "paragraph", text: `Pelo presente termo, o(a) abaixo-assinado(a) se compromete a utilizar os equipamentos de T.I fornecidos pela ${razaoSocial}, de acordo com as normas estabelecidas e reconhece a responsabilidade por qualquer dano causado por mal uso do equipamento.` },
    { type: "spacer", size: 2 }, { type: "field", label: "NOME DO COLABORADOR", value: data.colaborador.nome }, { type: "field", label: "CPF DO COLABORADOR", value: data.colaborador.cpf }, { type: "spacer", size: 2 },
  ]
  const clauses = data.clauses.filter((clause) => {
    const title = clause.title.trim()
    const text = clause.text?.trim()
    const bullets = clause.bullets?.map((bullet) => bullet.trim()).filter(Boolean) ?? []
    return Boolean(title || text || bullets.length > 0)
  })
  clauses.forEach((clause, index) => {
    const title = clause.title.trim()
    const text = clause.text?.trim()
    const bullets = clause.bullets?.map((bullet) => bullet.trim()).filter(Boolean) ?? []
    blocks.push({ type: "heading", text: `${index + 1}. ${title.toUpperCase()}` })
    if (text) blocks.push({ type: "paragraph", text: replaceCompany(text, razaoSocial) })
    bullets.forEach((bullet) => blocks.push({ type: "bullet", text: replaceCompany(bullet, razaoSocial) }))
    blocks.push({ type: "spacer", size: 2 })
  })
  blocks.push({ type: "spacer", size: 4 }, { type: "paragraph", text: "Declaro que li e concordo com os termos acima." }, { type: "spacer", size: 2 }, { type: "paragraph", text: `DATA ${data.colaborador.data}` })
  return blocks
}

export function getTermoRecebimento(data: TermoData): Block[] {
  const nomeEquip = getEquipmentName(data.equipamento)
  const type = getEquipmentType(data.equipamento.tipo)
  const campoLabel = "Número de série / identificação"
  const nome = data.colaborador.nome || "________________"
  return [
    { type: "title", text: `TERMO DE RECEBIMENTO DE ${nomeEquip.toUpperCase()}` }, { type: "spacer", size: 3 },
    { type: "paragraph", text: `Eu, ${nome}, Declaro que recebi, em bom estado de conservação e funcionamento, o ${nomeEquip} abaixo descrito, entregue pela empresa ${data.company.nomeMarca}.` },
    { type: "spacer", size: 2 }, { type: "heading", text: "Informações do Equipamento:" },
    { type: "bullet", text: `Modelo: ${data.equipamento.modelo || ""}` }, { type: "bullet", text: `Marca: ${data.equipamento.marca || ""}` }, { type: "bullet", text: `${campoLabel}: ${data.equipamento.specificValue || ""}` }, { type: "bullet", text: `Acessórios (se houver): ${data.equipamento.acessorios || ""}` },
    { type: "spacer", size: 2 }, { type: "paragraph", text: `Este ${nomeEquip} será de minha responsabilidade a partir da data de recebimento.` }, { type: "spacer", size: 2 },
    { type: "paragraph", text: `Unidade: ${data.company.unidadeRazaoSocial}` }, { type: "paragraph", text: `CNPJ: ${data.company.unidadeCnpj}` }, { type: "paragraph", text: `Data: ${data.colaborador.data}` }, { type: "spacer", size: 2 }, { type: "paragraph", text: "Assinatura do Recebedor:" },
  ]
}
