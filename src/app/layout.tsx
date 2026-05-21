import type { Metadata } from "next"
import { Header } from "@/components/shared/header"
import "@/app/globals.css"

export const metadata: Metadata = {
  title: "LivroSolidário - Compartilhando Conhecimento",
  description: "Uma plataforma que conecta doadores de livros a escolas públicas e pessoas interessadas",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className="bg-background text-foreground">
        <Header activeTab="home" />
        <main className="min-h-screen">
          {children}
        </main>
        <footer className="bg-slate-900 text-white mt-16">
          <div className="max-w-7xl mx-auto px-4 py-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
              <div>
                <h3 className="font-semibold mb-4">Sobre</h3>
                <p className="text-sm text-slate-400">
                  LivroSolidário é uma plataforma que conecta doadores de livros a quem precisa.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-4">Navegação</h3>
                <ul className="text-sm space-y-2 text-slate-400">
                  <li><a href="/" className="hover:text-white transition">Início</a></li>
                  <li><a href="/catalog" className="hover:text-white transition">Catálogo</a></li>
                  <li><a href="/donate" className="hover:text-white transition">Doar</a></li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-4">Legal</h3>
                <ul className="text-sm space-y-2 text-slate-400">
                  <li><a href="#" className="hover:text-white transition">Privacidade</a></li>
                  <li><a href="#" className="hover:text-white transition">Termos</a></li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-4">Contato</h3>
                <p className="text-sm text-slate-400">
                  Email: contato@livrosolidario.com.br
                </p>
              </div>
            </div>
            <div className="border-t border-slate-800 pt-8 text-center text-sm text-slate-400">
              <p>&copy; 2026 LivroSolidário. Todos os direitos reservados.</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}
