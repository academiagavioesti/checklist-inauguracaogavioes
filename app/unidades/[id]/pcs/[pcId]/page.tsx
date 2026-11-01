import { PcChecklist } from "@/components/pc-checklist"
export default async function Page({params}:{params:Promise<{id:string;pcId:string}>}){const {id,pcId}=await params;return <PcChecklist unidadeId={id} pcId={pcId}/>}
