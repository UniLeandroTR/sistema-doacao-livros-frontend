# Componentes - API Reference

## UI Components

### Button

Componente de botão com múltiplas variantes.

```tsx
import { Button } from '@/components/ui/button'

<Button variant="default" size="lg">
  Click me
</Button>
```

**Props:**
- `variant`: `'default' | 'outline' | 'secondary' | 'ghost' | 'destructive'`
- `size`: `'default' | 'sm' | 'lg' | 'icon'`

### Card

Sistema de card para layouts estruturados.

```tsx
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card'

<Card>
  <CardHeader>
    <CardTitle>Título</CardTitle>
  </CardHeader>
  <CardContent>Conteúdo</CardContent>
  <CardFooter>Rodapé</CardFooter>
</Card>
```

### Badge

Badge para status e categorias.

```tsx
import { Badge } from '@/components/ui/badge'

<Badge variant="blue">Categoria</Badge>
<Badge variant="green">Disponível</Badge>
<Badge variant="yellow">Pendente</Badge>
<Badge variant="red">Urgente</Badge>
```

**Variantes:** `'default' | 'secondary' | 'destructive' | 'outline' | 'blue' | 'green' | 'yellow' | 'red'`

---

## Shared Components

### Header

Cabeçalho com navegação.

```tsx
import { Header } from '@/components/shared/header'

<Header activeTab="home" />
```

**Props:**
- `activeTab`: String da rota ativa (opcional)

**Features:**
- Navegação responsiva
- Mobile menu
- Links para todas as páginas

### BookCard

Cartão exibindo informações de um livro.

```tsx
import { BookCard } from '@/components/shared/book-card'

<BookCard
  title="Dom Casmurro"
  author="Machado de Assis"
  condition="Bom"
  location="São Paulo, SP"
  donor="Maria Silva"
  donorRating={4.8}
  category="Literatura Brasileira"
  distance="2.5 km"
  onRequest={() => console.log('Solicitação')}
/>
```

**Props:**
```tsx
interface BookCardProps {
  title: string
  author: string
  condition: string
  location: string
  donor: string
  donorRating?: number
  category: string
  imageUrl?: string
  distance?: string
  onRequest?: () => void
}
```

---

## Home Sections

Componentes para a página inicial.

```tsx
import {
  HeroSection,
  HowItWorksSection,
  BeneficiariesSection,
  CallToActionSection
} from '@/components/home/sections'

export default function Home() {
  return (
    <>
      <HeroSection />
      <HowItWorksSection />
      <BeneficiariesSection />
      <CallToActionSection />
    </>
  )
}
```

---

## Utilities

### cn() - Class Name Merger

Mescla classes Tailwind com segurança.

```tsx
import { cn } from '@/lib/utils'

const buttonClass = cn(
  "px-4 py-2 rounded",
  isActive && "bg-blue-500",
  className
)
```

---

## Padrões de Uso

### State Management

```tsx
'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'

export default function Example() {
  const [count, setCount] = useState(0)
  
  return (
    <Button onClick={() => setCount(count + 1)}>
      Clique: {count}
    </Button>
  )
}
```

### Forms

```tsx
'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

export default function FormExample() {
  const [formData, setFormData] = useState({ name: '' })
  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }
  
  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(formData)
  }
  
  return (
    <Card className="p-6">
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded"
          placeholder="Nome"
        />
        <Button type="submit" className="mt-4">
          Enviar
        </Button>
      </form>
    </Card>
  )
}
```

### Conditional Rendering

```tsx
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

export default function StatusDisplay({ status }) {
  return (
    <div>
      {status === 'pending' && <Badge variant="yellow">Pendente</Badge>}
      {status === 'approved' && <Badge variant="green">Aprovado</Badge>}
      {status === 'rejected' && <Badge variant="red">Recusado</Badge>}
    </div>
  )
}
```

---

## Cores do Tema

```css
--color-primary: #2563eb (azul)
--color-primary-foreground: #ffffff
--color-secondary: #f3f4f6 (cinza claro)
--color-secondary-foreground: #1f2937
--color-accent: #f5f5f5
--color-muted: #9ca3af
--color-muted-foreground: #6b7280
--color-background: #ffffff
--color-foreground: #171717 (preto)
--color-border: #e5e7eb
--color-ring: #2563eb
```

Para customizar, edite `src/app/globals.css`.

---

## Estrutura de Pasta para Novos Features

```
src/
├── app/
│   └── nova-pagina/
│       └── page.tsx          # Página principal
├── components/
│   └── nova-pagina/
│       ├── component-a.tsx   # Componente específico
│       └── component-b.tsx
└── lib/
    └── nova-pagina/
        └── utils.ts          # Utilitários
```

---

## Tips & Tricks

### Responsive Design

```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {/* Mobile: 1 coluna, Tablet: 2 colunas, Desktop: 3 colunas */}
</div>
```

### Hover States

```tsx
<Button className="hover:opacity-90 transition-opacity">
  Hover me
</Button>
```

### Loading State

```tsx
'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'

export default function Example() {
  const [isLoading, setIsLoading] = useState(false)
  
  const handleSubmit = async () => {
    setIsLoading(true)
    // Fazer algo
    setIsLoading(false)
  }
  
  return (
    <Button onClick={handleSubmit} disabled={isLoading}>
      {isLoading ? 'Carregando...' : 'Enviar'}
    </Button>
  )
}
```

---

Para mais informações, veja [DOCUMENTATION.md](./DOCUMENTATION.md)
