'use client'

import emailjs from '@emailjs/browser'
import { BookHeart, Menu, User, X } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { useState } from 'react'

interface HeaderProps {
  activeTab?: string
}

export function Header({ activeTab = usePathname() }: HeaderProps) {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [email, setEmail] = useState('')
  const [emailError, setEmailError] = useState('')
  const [success, setSuccess] = useState(false)

  const openModal = () => {
    setEmail('')
    setEmailError('')
    setSuccess(false)
    setModalOpen(true)
  }

  const closeModal = () => {
    setModalOpen(false)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError('Por favor, insira um e-mail válido.')
      return
    }
    setEmailError('')
    try {
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        { user_email: email },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      )
      setSuccess(true)
      setTimeout(() => {
        setModalOpen(false)
      }, 3000)
    } catch (error) {
      setEmailError('Erro ao enviar. Tente novamente.')
    }
  }

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/'
    }
    return pathname.startsWith(href)
  }

  const navItems = [
    { href: '/', label: 'Início' },
    { href: '/catalog', label: 'Catálogo' },
    { href: '/donate', label: 'Doar Livro' },
    { href: '/requests', label: 'Solicitações' },
    { href: '/map', label: 'Mapa' },
  ]

  return (
    <>
    <header className="bg-white border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <BookHeart className="w-8 h-8 text-primary" />
            <div>
              <h1 className="text-xl font-semibold">LivroSolidário</h1>
              <p className="text-xs text-muted-foreground">Compartilhando conhecimento</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  isActive(item.href)
                    ? 'bg-primary text-primary-foreground'
                    : 'hover:bg-accent text-foreground'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              className="hidden md:flex items-center gap-2"
              onClick={openModal}
            >
              <User className="w-4 h-4" />
              Entrar
            </Button>
            <button
              className="md:hidden p-2 hover:bg-accent rounded-lg transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden mt-4 space-y-2 border-t border-border pt-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block px-4 py-2 rounded-lg hover:bg-accent transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Button variant="outline" className="w-full justify-center gap-2" onClick={openModal}>
              <User className="w-4 h-4" />
              Entrar
            </Button>
          </nav>
        )}
      </div>

    </header>

    {/* Interest Modal - FORA do header */}
    {modalOpen && (
      <div
        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50"
        onClick={(e) => { if (e.target === e.currentTarget) closeModal() }}
      >
        <Card className="w-full max-w-md mx-4 p-6 relative">
          <button
            className="absolute top-4 right-4 p-1 hover:bg-accent rounded-lg transition-colors"
            onClick={closeModal}
            aria-label="Fechar"
          >
            <X className="w-5 h-5" />
          </button>

          <h2 className="text-xl font-semibold mb-1">Demonstre seu interesse</h2>
          <p className="text-sm text-muted-foreground mb-6">
            Deixe seu e-mail para fazer parte do LivroSolidário
          </p>

          {success ? (
            <div className="py-6 text-center">
              <p className="text-green-700 font-medium text-lg">Obrigado! Seu interesse foi registrado.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="interest-email" className="block text-sm font-medium mb-2">
                  E-mail *
                </label>
                <input
                  id="interest-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seu@email.com"
                  required
                  className="w-full px-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                />
                {emailError && (
                  <p className="text-sm text-red-600 mt-1">{emailError}</p>
                )}
              </div>
              <div className="flex gap-3 pt-2">
                <Button type="submit" className="flex-1">
                  Enviar interesse
                </Button>
                <Button type="button" variant="outline" onClick={closeModal}>
                  Cancelar
                </Button>
              </div>
            </form>
          )}
        </Card>
      </div>
    )}
    </>
  )
}
