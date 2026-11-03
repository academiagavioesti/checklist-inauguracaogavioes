"use client"
import Link from "next/link"
import { useState } from "react"
import { Building2 } from "lucide-react"
import { PageHeader } from "@/components/page-header"
import { ModalUnidade } from "@/components/checklist-modals"
import { useChecklist, tipoLabel, progresso } from "@/lib/checklist"

export function Unidades(){
 const {data,error,isLoading}=useChecklist(); const [modal,setModal]=useState(false)
 if(isLoading)return <div className="p-6 text-muted-foreground">Carregando unidades...</div>
 if(error||!data)return <div className="p-6 text-destructive">Não foi possível carregar as unidades.</div>
 return <div className="mx-auto w-full max-w-[1400px] px-4 py-5 md:px-6"><PageHeader title="Unidades" description="Acompanhe a preparação das unidades para a inauguração."/><div className="mb-5 flex justify-end"><button type="button" onClick={()=>setModal(true)} className="rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground">+ Nova unidade</button></div><div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">{data.unidades.map(u=>{const pcs=data.pcs.filter(p=>p.unidade_id===u.id);const totals=pcs.reduce((a,p)=>{const x=progresso(data,p);return{f:a.f+x.feitos,t:a.t+x.total}},{f:0,t:0});const pct=totals.t?Math.round(totals.f/totals.t*100):0;return <Link key={u.id} href={`/unidades/${u.id}`} className="rounded-xl border bg-card p-5 transition-shadow hover:shadow-md"><div className="flex items-start justify-between"><div><h2 className="text-xl font-semibold">{u.nome}</h2><span className="mt-2 inline-flex rounded-full bg-secondary px-2.5 py-1 text-xs">{tipoLabel(u.tipo)}</span></div><Building2 className="size-5 text-muted-foreground"/></div><div className="mt-6 flex justify-between text-sm text-muted-foreground"><span>{pcs.length} computadores</span><strong className="text-foreground">{pct===100?"Completo":`${pct}%`}</strong></div><div className="mt-2 h-2 overflow-hidden rounded-full bg-muted"><div className="h-full bg-primary transition-all" style={{width:`${pct}%`}}/></div><p className="mt-2 text-xs text-muted-foreground">{totals.f}/{totals.t} itens configurados</p></Link>})}</div>{!data.unidades.length&&<p className="rounded-lg border border-dashed p-6 text-sm text-muted-foreground">Nenhuma unidade cadastrada.</p>}<ModalUnidade open={modal} onClose={()=>setModal(false)}/></div>
}
