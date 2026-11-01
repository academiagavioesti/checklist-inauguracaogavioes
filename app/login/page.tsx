import { LoginForm } from "@/components/login-form"
import { LOGO_GAVIOES_PNG } from "@/lib/logo-data"

export default function LoginPage() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#f8fafc] px-5 py-10 text-[#07112d]">
      <div className="pointer-events-none absolute -right-24 -top-24 size-64 rounded-full bg-[#fff4f4]" aria-hidden="true" />
      <div className="pointer-events-none absolute -bottom-32 -left-20 size-64 rounded-full bg-[#fff4f4]" aria-hidden="true" />
      <section className="relative z-10 w-full max-w-[448px]">
        <div className="mb-8 flex justify-center">
          <img src={LOGO_GAVIOES_PNG} alt="Academia Gaviões" width={180} height={105} className="h-[76px] w-[130px] object-contain" />
        </div>
        <div className="rounded-2xl border border-[#d9e0ea] bg-white px-8 py-8 shadow-[0_1px_2px_rgba(15,23,42,0.02)] sm:px-8 sm:py-9">
          <h1 className="text-center font-sans text-[25px] font-semibold tracking-[-0.03em] text-[#050b20]">Entrar na sua conta</h1>
          <p className="mt-2 text-center text-[16px] text-[#425b86]">Informe suas credenciais para acessar o sistema.</p>
          <div className="mt-6"><LoginForm /></div>
        </div>
      </section>
    </main>
  )
}
