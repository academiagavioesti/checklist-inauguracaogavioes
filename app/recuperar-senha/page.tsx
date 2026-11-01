import Link from "next/link"

export default function RecuperarSenhaPage() {
  return <main className="flex min-h-screen items-center justify-center bg-[#f8fafc] px-5"><section className="w-full max-w-md rounded-2xl border border-[#d9e0ea] bg-white p-8 text-center"><h1 className="font-sans text-2xl font-semibold text-[#050b20]">Recuperar senha</h1><p className="mt-2 text-sm text-[#425b86]">Entre em contacto com a equipa de T.I. para recuperar o acesso.</p><Link href="/login" className="mt-6 inline-block text-sm font-medium text-[#f04444] underline-offset-2 hover:underline">Voltar ao login</Link></section></main>
}
