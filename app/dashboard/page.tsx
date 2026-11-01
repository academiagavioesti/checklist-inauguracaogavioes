import { Dashboard } from "@/components/dashboard"
import { PageHeader } from "@/components/page-header"

export default function Page() { return <div className="mx-auto w-full max-w-6xl px-4 py-6 md:px-8 md:py-8"><PageHeader title="Dashboard" description="Visão geral dos termos gerados." /><Dashboard /></div> }
