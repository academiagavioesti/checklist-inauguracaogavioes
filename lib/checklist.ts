"use client"
import useSWR from "swr"
import { createClient } from "@/lib/supabase/client"

export type Unidade={id:string;nome:string;tipo:"franquia"|"franquia_administrada"|"administrada";data_inauguracao:string|null;created_at:string}
export type Pc={id:string;unidade_id:string;nome:string;tipo_pc:string;sem_catraca:boolean;created_at:string}
export type TipoPc={chave:string;nome:string;icone:string;ordem:number}
export type Categoria={id:string;nome:string;ordem:number}
export type ItemBase={id:string;categoria_id:string;txt:string;franquia:boolean;ordem:number}
export type Extra={id:string;tipo_chave:string;txt:string;ordem:number}
export type Marcacao={pc_id:string;item_key:string;feito_por:string|null;feito_por_nome:string|null;feito_em:string|null}
export type ChecklistData={unidades:Unidade[];pcs:Pc[];tipos:TipoPc[];categorias:Categoria[];itens:ItemBase[];extras:Extra[];marcacoes:Marcacao[]}
const fetcher=async():Promise<ChecklistData>=>{const s=createClient();const [u,p,t,c,i,e,m]=await Promise.all([s.from("unidades").select("*").order("nome"),s.from("computadores").select("*").order("nome"),s.from("tipos_pc").select("*").order("ordem"),s.from("categorias_base").select("*").order("ordem"),s.from("itens_base").select("*").order("ordem"),s.from("tipo_pc_extras").select("*").order("ordem"),s.from("checklist_itens").select("*")]);for(const r of [u,p,t,c,i,e,m])if(r.error)throw r.error;return{unidades:u.data??[],pcs:p.data??[],tipos:t.data??[],categorias:c.data??[],itens:i.data??[],extras:e.data??[],marcacoes:m.data??[]}}
export function useChecklist(){return useSWR("checklist-data",fetcher,{revalidateOnFocus:false})}
export const tipoLabel=(t:Unidade["tipo"])=>t==="franquia"?"Franquia":t==="franquia_administrada"?"Franquia administrada":"Administrada"
export function aplicaveis(data:ChecklistData,pc:Pc){const u=data.unidades.find(x=>x.id===pc.unidade_id);const allow=u?.tipo==="franquia"||u?.tipo==="franquia_administrada";const hidden=pc.sem_catraca?/catraca|facial|biom[eé]tric/i:null;const base=data.itens.filter(i=>(!i.franquia||allow)&&(!hidden||!hidden.test(i.txt))).map(i=>({key:`base-${i.id}`,txt:i.txt,cat:i.categoria_id,franquia:i.franquia}));const extra=data.extras.filter(i=>i.tipo_chave===pc.tipo_pc&&(!hidden||!hidden.test(i.txt))).map(i=>({key:`extra-${i.id}`,txt:i.txt,cat:"extras",franquia:false}));return[...base,...extra]}
export const progresso=(data:ChecklistData,pc:Pc)=>{const all=aplicaveis(data,pc),done=new Set(data.marcacoes.filter(m=>m.pc_id===pc.id).map(m=>m.item_key));return{total:all.length,feitos:all.filter(i=>done.has(i.key)).length,pct:all.length?Math.round(all.filter(i=>done.has(i.key)).length/all.length*100):0}}
export function useChecklistActions(){const s=createClient();const toggle=async(pcId:string,key:string,checked:boolean)=>checked?await s.from("checklist_itens").delete().eq("pc_id",pcId).eq("item_key",key):await s.from("checklist_itens").insert({pc_id:pcId,item_key:key});return{toggle}}
