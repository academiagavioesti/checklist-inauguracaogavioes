const REMEMBER_KEY = "termos-ti:remember"
const EMAIL_KEY = "termos-ti:email"
const SESSION_COOKIE = "termos-ti-alive=1; path=/; SameSite=Lax"

export function setRemember(remember: boolean, email: string) {
  localStorage.setItem(REMEMBER_KEY, remember ? "1" : "0")
  if (remember) localStorage.setItem(EMAIL_KEY, email)
  else localStorage.removeItem(EMAIL_KEY)
  document.cookie = SESSION_COOKIE
}

export function rememberedEmail() {
  return localStorage.getItem(EMAIL_KEY) ?? ""
}

export function rememberedChecked() {
  return localStorage.getItem(REMEMBER_KEY) === "1"
}

export function sessionExpired() {
  return localStorage.getItem(REMEMBER_KEY) === "0" && !document.cookie.split(";").some((cookie) => cookie.trim().startsWith("termos-ti-alive="))
}
