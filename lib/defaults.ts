import type { Clause, Signer } from "./termos"

export const DEFAULT_SIGNERS: Signer[] = [
  { id: "usuario", label: "Ass. do Usuário", kind: "usuario" },
  { id: "supervisor", label: "Ass. do Supervisor" },
  { id: "tech-manager", label: "Ass. do Tech Manager" },
  { id: "head-ti", label: "Ass. do Head TI" },
]

export const DEFAULT_CLAUSES: Clause[] = [
  { id: "responsabilidade", title: "RESPONSABILIDADE", text: "O usuário se responsabiliza por:", bullets: ["Manter os equipamentos em bom estado de conservação.", "Utilizar o equipamento de acordo com as normas de uso estabelecidas pela academia.", "Arcar com os custos de reparo ou substituição do equipamento em caso de danos provocados por mau uso, negligência ou descuido.", "Notificar imediatamente a administração em caso de perda, roubo ou furto do equipamento."] },
  { id: "termos-uso", title: "TERMOS DE USO", bullets: ["O uso dos equipamentos é restrito a atividades relacionadas à academia.", "É proibido o uso do equipamento para fins pessoais ou que não estejam relacionados às atividades da {{razaoSocial}}.", "O usuário não deve instalar softwares ou aplicativos sem autorização prévia da administração.", "O usuário deve garantir que o equipamento seja utilizado em ambientes seguros e protegidos."] },
  { id: "protecao-dados", title: "PROTEÇÃO DE DADOS", text: "O usuário compromete-se a respeitar a Lei Geral de Proteção de Dados (LGPD), garantindo a confidencialidade e a segurança das informações dos clientes da academia a que tiver acesso durante a utilização dos equipamentos. É vedado o uso ou compartilhamento indevido de dados pessoais. O usuário deve notificar imediatamente a administração em caso de violação de dados." },
  { id: "devolucao", title: "DEVOLUÇÃO DO EQUIPAMENTO", text: "Os equipamentos deverão ser devolvidos à {{razaoSocial}} nas mesmas condições em que foi recebido, salvo desgaste natural. A devolução deve ocorrer no término do uso ou sempre que solicitado pela administração." },
  { id: "penalidades", title: "PENALIDADES", text: "Em caso de descumprimento dos termos aqui estabelecidos, o usuário poderá ser responsabilizado civil e criminalmente, além de responder por possíveis perdas e danos à academia. O usuário também poderá perder o direito de utilizar o equipamento no futuro." },
  { id: "auditoria", title: "ACOMPANHAMENTO E AUDITORIA", text: "A administração da {{razaoSocial}} reserva-se o direito de realizar auditorias periódicas no uso dos equipamentos, incluindo verificação de instalação de software e integridade do equipamento." },
  { id: "modificacoes", title: "MODIFICAÇÕES NO TERMO", text: "Este termo poderá ser modificado a qualquer momento pela administração, sendo as alterações comunicadas ao usuário. O uso contínuo dos equipamentos após a notificação de mudanças implica aceitação das novas condições." },
  { id: "vigencia", title: "VIGÊNCIA", text: "Este termo tem validade enquanto o usuário estiver em posse do equipamento, podendo ser revogado a qualquer momento pela administração da academia." },
]
