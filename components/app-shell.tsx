"use client"

import type { ReactNode } from "react"
import { usePathname } from "next/navigation"
import { Sidebar } from "@/components/sidebar"
import { AccessGuard } from "@/components/access-guard"

export function AppShell({ children }: { children: ReactNode }) {
  if (["/login","/criar-conta"].includes(usePathname())) return <>{children}</>
  return <AccessGuard><div className="flex min-h-screen bg-background"><a href="#conteudo" className="sr-only focus:not-sr-only fixed left-3 top-3 z-[60] rounded-md bg-sidebar-primary px-3 py-2 text-sm text-sidebar-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sidebar-ring">Pular para o conteúdo</a><Sidebar /><div className="min-w-0 flex-1 pt-14 md:pt-0"><main id="conteudo" tabIndex={-1}>{children}</main></div></div></AccessGuard>
}
