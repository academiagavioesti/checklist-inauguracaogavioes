// Configuração central dos tipos de equipamento.
// Para adicionar um novo tipo, basta incluir um item neste array.

export type SpecificField = {
  key: string
  label: string
  placeholder?: string
}

export type EquipmentType = {
  /** identificador usado internamente */
  id: string
  /** nome exibido no seletor */
  label: string
  /** como o equipamento aparece no texto do termo (ex: "aparelho celular") */
  nomeNoTermo: string
  /** campo variável específico do tipo (IMEI, P/N, número de série...) */
  specificField: SpecificField
}

export const EQUIPMENT_TYPES: EquipmentType[] = [
  {
    id: "celular",
    label: "Celular",
    nomeNoTermo: "celular",
    specificField: { key: "identificacao", label: "Número de série / identificação" },
  },
  {
    id: "notebook",
    label: "Notebook",
    nomeNoTermo: "notebook",
    specificField: { key: "identificacao", label: "Número de série / identificação" },
  },
  {
    id: "carregador",
    label: "Carregador / Adaptador AC",
    nomeNoTermo: "adaptador AC",
    specificField: { key: "identificacao", label: "Número de série / identificação" },
  },
  {
    id: "teclado",
    label: "Teclado",
    nomeNoTermo: "teclado",
    specificField: { key: "identificacao", label: "Número de série / identificação" },
  },
  {
    id: "mouse",
    label: "Mouse",
    nomeNoTermo: "mouse",
    specificField: { key: "identificacao", label: "Número de série / identificação" },
  },
  {
    id: "monitor",
    label: "Monitor",
    nomeNoTermo: "monitor",
    specificField: { key: "identificacao", label: "Número de série / identificação" },
  },
  { id: "outros", label: "Outros", nomeNoTermo: "equipamento", specificField: { key: "identificacao", label: "Número de série / identificação" } },
]

export const OUTROS_ID = "outros"

export function getEquipmentType(id: string): EquipmentType | undefined {
  return EQUIPMENT_TYPES.find((e) => e.id === id)
}

export const DEFAULT_COMPANY = {
  // Usados no Termo de Responsabilidade
  razaoSocial: "ACADEMIA GAVIOES FRANQUEADORA LTDA",
  cnpj: "34.265.772/0001-77",
  // Nome citado no Termo de Recebimento ("entregue pela empresa ...")
  nomeMarca: "Academia Gaviões",
  // Unidade citada no Termo de Recebimento
  unidadeRazaoSocial: "MARINHO ADMINISTRADORA LTDA",
  unidadeCnpj: "58.848.187/0001-68",
}
