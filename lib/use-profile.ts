"use client"

import useSWR from "swr"
import { createClient } from "@/lib/supabase/client"

export type CurrentProfile = {
  id: string
  nome: string
  email: string
  role: "admin" | "user"
}

async function loadProfile(): Promise<CurrentProfile | null> {
  const supabase = createClient()
  const { data } = await supabase.auth.getUser()
  const user = data.user
  if (!user) return null
  const { data: profile } = await supabase.from("profiles").select("nome,email,role").eq("id", user.id).maybeSingle()
  return {
    id: user.id,
    nome: profile?.nome || user.email || "",
    email: profile?.email || user.email || "",
    role: profile?.role === "admin" ? "admin" : "user",
  }
}

export function useProfile() {
  const { data, isLoading } = useSWR("me-profile", loadProfile, { revalidateOnFocus: false })
  return { profile: data ?? null, isAdmin: data?.role === "admin", loading: isLoading }
}
