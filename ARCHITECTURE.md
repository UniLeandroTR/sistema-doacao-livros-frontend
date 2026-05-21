# Arquitetura e Migração - LivroSolidário Frontend

## 📊 Visão Geral da Migração

### De: Vite + React (figma-design)
- Configuração Vite para desenvolvimento rápido
- MUI e Radix UI misturados
- Context local para gerenciamento de estado
- SSR não disponível
- Sem otimizações de performance nativa

### Para: Next.js 16 + App Router (sistema-doacao-livros-frontend)
- App Router com otimizações automáticas
- Radix UI para componentes headless
- Tailwind CSS v4 para estilos
- Suporte a SSR/SSG por padrão
- Image optimization automática
- API routes integradas
- Melhor SEO

---

## 🏗️ Arquitetura

```
┌─────────────────────────────────────────────────────────────┐
│                    NEXT.JS APP ROUTER                       │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐       │
│  │   /home      │  │ /catalog     │  │  /donate     │       │
│  │ (landing)    │  │ (search)     │  │ (form)       │       │
│  └──────────────┘  └──────────────┘  └──────────────┘       │
│                                                               │
│  ┌──────────────┐  ┌──────────────┐                          │
│  │ /requests    │  │  /map        │                          │
│  │ (dashboard)  │  │ (locations)  │                          │
│  └──────────────┘  └──────────────┘                          │
│                                                               │
├─────────────────────────────────────────────────────────────┤
│                    COMPONENTES COMPARTILHADOS                │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  Header ─────────────────────── Footer                       │
│    │                                                          │
│    ├── Navigation                                            │
│    ├── Mobile Menu                                           │
│    └── Auth Links                                            │
│                                                               │
├─────────────────────────────────────────────────────────────┤
│                    COMPONENTES REUTILIZÁVEIS                 │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌─────────────────┐  ┌─────────────────┐  ┌────────────┐   │
│  │   UI Layer      │  │  Shared Layer   │  │ Home Layer │   │
│  │                 │  │                 │  │            │   │
│  │ • Button        │  │ • Header        │  │ • Sections │   │
│  │ • Card          │  │ • BookCard      │  │            │   │
│  │ • Badge         │  │                 │  │            │   │
│  └─────────────────┘  └─────────────────┘  └────────────┘   │
│                                                               │
├─────────────────────────────────────────────────────────────┤
│                      UTILITY LAYER                           │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  • cn() - Class Name Merger                                 │
│  • API Client (Futuro)                                      │
│  • Auth Context (Futuro)                                    │
│                                                               │
├─────────────────────────────────────────────────────────────┤
│                    STYLING & THEME                           │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  Tailwind CSS v4 + CSS Variables                            │
│  ├── Primary: #2563eb (Blue)                                │
│  ├── Secondary: #f3f4f6 (Gray)                              │
│  └── Accent: #f5f5f5 (Light)                                │
│                                                               │
└─────────────────────────────────────────────────────────────┘
```

---

## 📁 Estrutura de Arquivos

```
sistema-doacao-livros-frontend/
│
├── src/
│   ├── app/                      # App Router Pages
│   │   ├── layout.tsx            # Root layout com Header/Footer
│   │   ├── page.tsx              # Home page
│   │   ├── globals.css           # Estilos globais
│   │   ├── catalog/
│   │   │   └── page.tsx
│   │   ├── donate/
│   │   │   └── page.tsx
│   │   ├── requests/
│   │   │   └── page.tsx
│   │   └── map/
│   │       └── page.tsx
│   │
│   ├── components/               # React Components
│   │   ├── ui/                   # Componentes headless
│   │   │   ├── button.tsx        # Button com CVA
│   │   │   ├── card.tsx          # Card system
│   │   │   └── badge.tsx         # Badge variants
│   │   │
│   │   ├── shared/               # Componentes compartilhados
│   │   │   ├── header.tsx        # Navigation
│   │   │   └── book-card.tsx     # Book display
│   │   │
│   │   └── home/                 # Componentes home
│   │       └── sections.tsx      # Hero, Stats, etc
│   │
│   └── lib/                      # Utilities & Helpers
│       └── utils.ts              # cn() function
│
├── public/                       # Assets estáticos
│
├── package.json
├── tailwind.config.ts            # Tailwind configuration
├── tsconfig.json
├── next.config.ts
│
├── DOCUMENTATION.md              # Documentação do projeto
├── COMPONENTS.md                 # API Reference dos componentes
└── INTEGRATION.md                # Guia de integração com backend
```

---

## 🔄 Fluxo de Dados

### Home Page
```
Home (page.tsx)
├── HeroSection
├── HowItWorksSection
├── BeneficiariesSection
└── CallToActionSection
```

### Catalog Page
```
CatalogPage (page.tsx)
├── Search Input
├── Category Filters
└── BookCard Grid
    └── [BookCard, BookCard, BookCard...]
        └── onRequest callback
```

### Donate Page
```
DonatePage (page.tsx)
├── Form (6 sections)
│   ├── Book Information
│   │   ├── Title
│   │   ├── Author
│   │   ├── ISBN
│   │   ├── Category
│   │   └── Condition
│   ├── Description
│   └── Location
│       ├── City
│       └── State
└── Submit / Success State
```

### Requests Page
```
RequestsPage (page.tsx)
├── Statistics Cards
│   ├── Pending Count
│   ├── Approved Count
│   └── Rejected Count
└── Requests List
    └── [RequestCard, RequestCard...]
        ├── Approve Button
        ├── Reject Button
        └── Message Button
```

### Map Page
```
MapPage (page.tsx)
├── Interactive Map
│   └── Markers
│       ├── Location Controls
│       └── Radius Filter
└── Sidebar
    └── [MeetupPointCard, MeetupPointCard...]
        ├── Favorite Toggle
        ├── Verified Badge
        └── Details Button
```

---

## 🎨 Componentes Reutilizáveis

### Estratégia CVA (Class Variance Authority)

```typescript
// Button com variantes
const buttonVariants = cva(
  "base-classes",
  {
    variants: {
      variant: {
        default: "...",
        outline: "...",
        secondary: "..."
      },
      size: {
        default: "...",
        sm: "...",
        lg: "..."
      }
    }
  }
)

// Uso
<Button variant="outline" size="lg">Click</Button>
```

### Composição de Cards

```typescript
<Card>
  <CardHeader>
    <CardTitle>Título</CardTitle>
  </CardHeader>
  <CardContent>Conteúdo</CardContent>
  <CardFooter>Ações</CardFooter>
</Card>
```

---

## 📊 Performance

### Otimizações Implementadas

1. **Code Splitting**: Páginas são carregadas sob demanda
2. **Image Optimization**: Next.js Image component ready
3. **CSS-in-JS**: Tailwind CSS com purge automático
4. **Tree Shaking**: Apenas código usado é incluído no bundle
5. **Component Lazy Loading**: Suporte a dynamic imports

### Pronto Para

- ✅ Static Site Generation (SSG)
- ✅ Server-Side Rendering (SSR)
- ✅ Incremental Static Regeneration (ISR)
- ✅ Middleware
- ✅ API Routes

---

## 🔐 Segurança

### Implementações de Segurança

1. **XSS Protection**: React sanitiza por padrão
2. **CSRF**: Next.js fornece proteção nativa
3. **Content Security Policy**: Configurável em headers
4. **Environment Variables**: `.env.local` para secrets
5. **Input Validation**: Validar no frontend e backend

### Próximas Etapas

- [ ] Adicionar autenticação JWT
- [ ] Implementar rate limiting
- [ ] CORS configuration
- [ ] Helmet.js para headers de segurança

---

## 🚀 Deployment

### Opcões de Deploy

1. **Vercel** (Recomendado para Next.js)
   ```bash
   npm install -g vercel
   vercel
   ```

2. **Docker**
   ```dockerfile
   FROM node:18-alpine
   WORKDIR /app
   COPY package*.json ./
   RUN npm ci --only=production
   COPY . .
   RUN npm run build
   EXPOSE 3000
   CMD ["npm", "start"]
   ```

3. **Self-Hosted**
   ```bash
   npm run build
   npm run start
   ```

---

## 📈 Escalabilidade

### Estratégias para Crescimento

1. **State Management**
   - Adicionar Redux/Zustand se necessário
   - Começar com Context API (atual)

2. **Data Fetching**
   - Implementar SWR para caching
   - React Query para queries complexas

3. **Testing**
   - Jest para unit tests
   - Cypress para E2E

4. **Monitoramento**
   - Sentry para error tracking
   - Google Analytics para insights

5. **Performance**
   - Next.js Analyzer para bundle size
   - Lighthouse CI para audits

---

## 🔧 Desenvolvimento Local

### Setup Inicial

```bash
# 1. Instalar dependências
npm install

# 2. Iniciar servidor
npm run dev

# 3. Abrir http://localhost:3000
```

### Scripts Disponíveis

```json
{
  "dev": "next dev",           // Desenvolvimento
  "build": "next build",       // Build de produção
  "start": "next start",       // Iniciar produção
  "lint": "next lint"          // Verificar linting
}
```

---

## 📚 Stack Tecnológico

| Categoria | Tecnologia | Versão |
|-----------|-----------|--------|
| Framework | Next.js | 16.2.6 |
| React | React | 19.2.4 |
| Styling | Tailwind CSS | 4.x |
| UI Components | Radix UI | 1.x |
| Icons | Lucide React | 0.487.0 |
| Utilities | CVA, clsx, tw-merge | Latest |
| Language | TypeScript | 5.x |

---

## 📝 Convenções de Código

### Naming
- Componentes: PascalCase (`Header.tsx`)
- Arquivos: kebab-case (`book-card.tsx`)
- Funções: camelCase (`fetchBooks()`)
- Constantes: UPPER_SNAKE_CASE (`API_BASE_URL`)

### File Organization
```
component-name/
├── component-name.tsx      # Componente
├── component-name.module.css  # Estilos (se necessário)
└── index.ts                # Export público
```

### Import Organization
```typescript
// 1. Imports do React
import { useState } from 'react'

// 2. Imports de bibliotecas externas
import Link from 'next/link'

// 3. Imports locais
import { Button } from '@/components/ui/button'

// 4. Tipos
import type { Book } from '@/types'
```

---

## 🐛 Troubleshooting

### Problema: Build falha com erro TypeScript
```bash
# Solução: Verificar tipos
npx tsc --noEmit
```

### Problema: Estilos Tailwind não aparecem
```bash
# Solução: Verificar content em tailwind.config.ts
# Deve incluir todos os arquivos com classes
```

### Problema: Imagens não carregam
```bash
# Solução: Usar next/image e configurar remotePatterns
```

---

## 📚 Recursos Úteis

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Radix UI Documentation](https://www.radix-ui.com/docs/primitives/overview/introduction)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

---

## 🎯 Próximas Fases

### Fase 1 (Atual)
✅ Estrutura base com componentes
✅ Páginas principais criadas
✅ Styling com Tailwind
❌ Backend integration

### Fase 2 (Próximo)
- [ ] Integração com API Backend
- [ ] Autenticação
- [ ] State management
- [ ] Testing

### Fase 3 (Futuro)
- [ ] Progressive Web App (PWA)
- [ ] Offline support
- [ ] Notificações em tempo real
- [ ] Multiidioma

---

**Última atualização**: Maio 2026

Para dúvidas ou contribuições, entre em contato com a equipe.
