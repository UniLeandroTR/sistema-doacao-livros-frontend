import { Book, School, Users, MapPin, Heart, TrendingUp } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export function HeroSection() {
  return (
    <section className="bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 -mx-4 px-4 py-16 md:py-24">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          Conectando Livros a Quem Precisa
        </h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Uma plataforma que une doadores de livros a escolas públicas e pessoas interessadas,
          promovendo o acesso à leitura e ao conhecimento.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/donate">
            <Button size="lg">
              Doar um Livro
            </Button>
          </Link>
          <Link href="/catalog">
            <Button variant="outline" size="lg">
              Buscar Livros
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}

export function HowItWorksSection() {
  const steps = [
    {
      icon: Book,
      title: 'Cadastre seu Livro',
      description: 'Pessoas físicas ou jurídicas podem cadastrar livros disponíveis para doação de forma simples e rápida.',
      color: 'bg-blue-100',
      iconColor: 'text-blue-600'
    },
    {
      icon: Users,
      title: 'Solicitação com Justificativa',
      description: 'Interessados podem solicitar livros com uma breve justificativa, e o doador decide se aceita ou não.',
      color: 'bg-purple-100',
      iconColor: 'text-purple-600'
    },
    {
      icon: MapPin,
      title: 'Geolocalização Inteligente',
      description: 'Sistema de geolocalização facilita a logística e conexão entre doadores e receptores próximos.',
      color: 'bg-pink-100',
      iconColor: 'text-pink-600'
    },
  ]

  return (
    <section className="max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-12">Como Funciona</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {steps.map((step, index) => {
          const IconComponent = step.icon
          return (
            <div key={index} className="text-center p-6">
              <div className={`w-16 h-16 ${step.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                <IconComponent className={`w-8 h-8 ${step.iconColor}`} />
              </div>
              <h3 className="text-lg font-semibold mb-3">{step.title}</h3>
              <p className="text-muted-foreground">
                {step.description}
              </p>
            </div>
          )
        })}
      </div>
    </section>
  )
}

export function BeneficiariesSection() {
  const stats = [
    { label: 'Livros Doados', value: '1.234' },
    { label: 'Doadores Ativos', value: '567' },
    { label: 'Escolas Parceiras', value: '89' },
    { label: 'Cidades Atendidas', value: '34' },
  ]

  return (
    <section className="max-w-7xl mx-auto bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl p-8 md:p-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Left: Text content */}
        <div>
          <h2 className="text-3xl font-bold mb-6">Público Beneficiado</h2>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <School className="w-6 h-6 text-purple-600 mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-semibold mb-1">Escolas Públicas</h4>
                <p className="text-muted-foreground text-sm">
                  Instituições podem se cadastrar como receptoras e ampliar seus acervos.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Heart className="w-6 h-6 text-pink-600 mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-semibold mb-1">Pessoas Físicas</h4>
                <p className="text-muted-foreground text-sm">
                  Qualquer pessoa interessada pode solicitar livros para seu desenvolvimento pessoal.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Statistics Grid */}
        <div className="grid grid-cols-2 gap-4">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white p-6 rounded-xl text-center">
              <div className="text-3xl font-bold mb-2">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function CallToActionSection() {
  return (
    <section className="max-w-7xl mx-auto text-center">
      <h2 className="text-3xl font-bold mb-6">Comece a Fazer Diferença Hoje</h2>
      <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
        Seja um doador voluntário ou encontre aquele livro que você sempre procurou.
        Juntos, podemos democratizar o acesso à leitura!
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link href="/donate">
          <Button size="lg">
            Quero Doar
          </Button>
        </Link>
        <Link href="/catalog">
          <Button variant="outline" size="lg">
            Explorar Catálogo
          </Button>
        </Link>
      </div>
    </section>
  )
}
