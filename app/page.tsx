import { PageHeader } from "@/components/page-header"
import { TermoForm } from "@/components/termo-form"

export default function Page() { return <div className="mx-auto w-full max-w-[1400px] px-4 py-4 md:px-6 md:py-5"><PageHeader title="Gerar novo termo" description="Preencha os dados e gere o PDF com os dois termos prontos para assinatura." /><TermoForm /></div> }
