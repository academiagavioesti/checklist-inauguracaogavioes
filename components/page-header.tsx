import type { ReactNode } from "react"

export function PageHeader({ title, description, actions }: { title: string; description?: string; actions?: ReactNode }) {
  return <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"><div><h1 className="text-balance text-2xl font-semibold tracking-tight text-foreground md:text-3xl">{title}</h1>{description && <p className="mt-1 text-pretty text-sm text-muted-foreground md:text-base">{description}</p>}</div>{actions && <div>{actions}</div>}</div>
}
