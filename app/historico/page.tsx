import { Historico } from "@/components/historico"
import { PageHeader } from "@/components/page-header"

export default function Page() { return <div className="mx-auto w-full max-w-6xl px-4 py-6 md:px-8 md:py-8"><PageHeader title="Histórico" description="Consulte e baixe novamente os termos registrados." /><Historico /></div> }
