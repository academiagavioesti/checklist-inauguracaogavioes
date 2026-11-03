import { UnidadeDetalhe } from "@/components/unidade-detalhe"
export default async function Page({params}:{params:Promise<{id:string}>}){const {id}=await params;return <UnidadeDetalhe id={id}/>}
