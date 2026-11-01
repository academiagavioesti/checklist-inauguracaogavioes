"use client"
import { Fragment, useState } from "react"
import useSWR from "swr"
import { createClient } from "@/lib/supabase/client"
import { Section } from "./termo-form"
import { Ban, ChevronDown, ChevronRight, FilePlus, Pencil, ShieldCheck, Trash2, Users } from "lucide-react"

type Profile = { id: string; nome: string | null; email: string | null; role: "admin" | "user"; ativo: boolean; created_at: string }
type Atividade = { id: string; user_id: string | null; acao: string; detalhe: string | null; em: string }
type Data = { me: string; items: Profile[]; atividades: Atividade[] }

const ACOES: Record<string, string> = { criou_termo: "Gerou termo", excluiu_termo: "Excluiu termo", adicionou_clausula: "Adicionou cláusula", editou_clausula: "Editou cláusula", removeu_clausula: "Removeu cláusula", adicionou_assinatura: "Adicionou assinatura", editou_assinatura: "Editou assinatura", removeu_assinatura: "Removeu assinatura", alterou_perfil: "Alterou perfil de usuário", bloqueou_usuario: "Bloqueou usuário", liberou_usuario: "Liberou usuário" }
const ACTION_ICONS: Record<string, typeof FilePlus> = { criou_termo: FilePlus, excluiu_termo: Trash2, adicionou_clausula: FilePlus, editou_clausula: Pencil, removeu_clausula: Trash2, adicionou_assinatura: FilePlus, editou_assinatura: Pencil, removeu_assinatura: Trash2, alterou_perfil: ShieldCheck, bloqueou_usuario: Ban, liberou_usuario: ShieldCheck }
const destructiveActions = new Set(["excluiu_termo", "removeu_clausula", "removeu_assinatura", "bloqueou_usuario"])

const fmt = (iso: string) => new Date(iso).toLocaleString("pt-BR", { day: "2-digit", month: "2-digit", year: "2-digit", hour: "2-digit", minute: "2-digit" })

async function load(): Promise<Data | null> {
  const supabase = createClient()
  const { data: auth } = await supabase.auth.getUser()
  if (!auth.user) return null
  const { data: me } = await supabase.from("profiles").select("role").eq("id", auth.user.id).maybeSingle()
  if (me?.role !== "admin") return null
  const [p, a] = await Promise.all([
    supabase.from("profiles").select("id,nome,email,role,ativo,created_at").order("created_at", { ascending: true }),
    supabase.from("atividades").select("id,user_id,acao,detalhe,em").order("em", { ascending: false }).limit(1000),
  ])
  if (p.error) throw p.error
  return { me: auth.user.id, items: (p.data ?? []) as Profile[], atividades: (a.data ?? []) as Atividade[] }
}

export function UsersAdmin() {
  const { data, error, mutate } = useSWR("admin-panel", load)
  const [message, setMessage] = useState("")
  const [open, setOpen] = useState<string | null>(null)
  if (!data) return error ? <p className="text-sm text-destructive">Não foi possível carregar o painel.</p> : null

  async function update(id: string, patch: Partial<Pick<Profile, "role" | "ativo">>) {
    setMessage("")
    if (!data || id === data.me) return
    const { error } = await createClient().from("profiles").update(patch).eq("id", id)
    if (error) setMessage("Não foi possível atualizar este usuário.")
    else await mutate()
  }

  return (
    <Section icon={<Users className="size-5" />} title="Painel de usuários" description="Todos os e-mails cadastrados, o que cada pessoa fez no sistema e a permissão de acesso. Só administradores veem esta área.">
      {message && <p className="mb-3 text-sm text-destructive">{message}</p>}
      <div className="overflow-x-auto rounded-lg border">
        <table className="w-full min-w-[720px] text-sm">
          <thead className="border-b bg-muted/40 text-left text-xs uppercase text-muted-foreground">
            <tr><th className="px-4 py-3">Pessoa</th><th className="px-4 py-3">Atividade</th><th className="px-4 py-3">Perfil</th><th className="px-4 py-3">Acesso</th></tr>
          </thead>
          <tbody>
            {data.items.map((item) => {
              const mine = data.atividades.filter((a) => a.user_id === item.id && ACOES[a.acao])
              const isOpen = open === item.id
              const self = item.id === data.me
              return (
                <Fragment key={item.id}>
                  <tr className="border-b last:border-0">
                    <td className="px-4 py-3">
                      <p className="font-medium">{item.nome || "Sem nome"}{self && <span className="ml-2 text-xs font-normal text-muted-foreground">(você)</span>}</p>
                      <p className="text-xs text-muted-foreground">{item.email}</p>
                      <p className="text-xs text-muted-foreground">Cadastro em {fmt(item.created_at)}</p>
                    </td>
                    <td className="px-4 py-3">
                      <button type="button" onClick={() => setOpen(isOpen ? null : item.id)} aria-expanded={isOpen} className="inline-flex items-center gap-1 text-left hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                        {isOpen ? <ChevronDown className="size-4" aria-hidden="true" /> : <ChevronRight className="size-4" aria-hidden="true" />}
                        <span>{mine.length} {mine.length === 1 ? "ação" : "ações"}</span>
                      </button>
                      <p className="text-xs text-muted-foreground">{mine[0] ? `Última: ${fmt(mine[0].em)}` : "Sem atividade"}</p>
                    </td>
                    <td className="px-4 py-3">
                      <select aria-label={`Perfil de ${item.email ?? item.id}`} disabled={self} value={item.role} onChange={(e) => void update(item.id, { role: e.target.value as Profile["role"] })} className="rounded-md border bg-background px-2 py-1.5 disabled:opacity-60">
                        <option value="user">Usuário</option>
                        <option value="admin">Administrador</option>
                      </select>
                    </td>
                    <td className="px-4 py-3">
                      <label className="flex items-center gap-2">
                        <input type="checkbox" checked={item.ativo} disabled={self} onChange={(e) => void update(item.id, { ativo: e.target.checked })} className="size-4 accent-primary" />
                        <span>{item.ativo ? "Ativo" : "Bloqueado"}</span>
                      </label>
                    </td>
                  </tr>
                  {isOpen && (
                    <tr className="border-b bg-muted/30 last:border-0">
                      <td colSpan={4} className="px-4 py-3">
                        {mine.length === 0 ? <p className="text-sm text-muted-foreground">Nenhuma ação registrada ainda.</p> : (
                          <ul className="grid max-h-64 gap-1.5 overflow-y-auto text-sm">
                            {mine.slice(0, 50).map((a) => (
                              <li key={a.id} className="flex flex-wrap gap-x-3">
                                <span className="w-28 shrink-0 text-xs text-muted-foreground">{fmt(a.em)}</span>
                                {(() => { const Icon = ACTION_ICONS[a.acao] ?? ShieldCheck; return <Icon className={`size-4 shrink-0 ${destructiveActions.has(a.acao) ? "text-destructive" : "text-muted-foreground"}`} aria-hidden="true" /> })()}<span className={`font-medium ${destructiveActions.has(a.acao) ? "text-destructive" : ""}`}>{ACOES[a.acao]}</span>
                                {a.detalhe && <span className="text-muted-foreground">{a.detalhe}</span>}
                              </li>
                            ))}
                          </ul>
                        )}
                      </td>
                    </tr>
                  )}
                </Fragment>
              )
            })}
          </tbody>
        </table>
      </div>
      <p className="mt-3 text-xs text-muted-foreground">Registramos apenas ações críticas: geração e exclusão de termos, mudanças em cláusulas e assinaturas e alterações de permissão. Contas só são criadas com e-mail @academiagavioes24h.com.br ou @academiagavioes.com.br.</p>
    </Section>
  )
}
