# 🚀 Quick Start Guide

Bem-vindo ao LivroSolidário Frontend! Este guia ajudará você a começar em 5 minutos.

## ⚡ 5 Minutos de Setup

### 1. Clone e Instale
```bash
# Navegar até o projeto
cd sistema-doacao-livros-frontend

# Instalar dependências
npm install
```

### 2. Inicie o Servidor
```bash
npm run dev
```

### 3. Abra no Browser
```
http://localhost:3000
```

**Pronto!** 🎉 Você verá a página inicial do LivroSolidário.

---

## 📱 Testar as Páginas

1. **Home** - http://localhost:3000
2. **Catálogo** - http://localhost:3000/catalog
3. **Doar** - http://localhost:3000/donate
4. **Solicitações** - http://localhost:3000/requests
5. **Mapa** - http://localhost:3000/map

---

## 🛠️ Desenvolvimento

### Estrutura de Pastas Rápida

```
src/
├── app/           # Páginas (use aqui para novas rotas)
├── components/    # Componentes React
│   ├── ui/        # Componentes básicos
│   ├── shared/    # Componentes compartilhados
│   └── home/      # Seções da home
└── lib/           # Utilitários
```

### Criar Nova Página

```bash
# 1. Criar pasta na estrutura do app router
mkdir src/app/minha-pagina

# 2. Criar arquivo page.tsx
echo "export default function MinhaPage() {
  return <div>Minha Página</div>
}" > src/app/minha-pagina/page.tsx

# 3. Acessar em http://localhost:3000/minha-pagina
```

### Criar Novo Componente

```typescript
// src/components/shared/meu-componente.tsx

import { Button } from '@/components/ui/button'

export function MeuComponente() {
  return (
    <div>
      <Button>Clique aqui</Button>
    </div>
  )
}
```

### Usar Componente

```typescript
import { MeuComponente } from '@/components/shared/meu-componente'

export default function MinhaPage() {
  return <MeuComponente />
}
```

---

## 🎨 Componentes Disponíveis

### UI Components

```typescript
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

// Button
<Button>Default</Button>
<Button variant="outline">Outline</Button>
<Button size="lg">Large</Button>

// Card
<Card>
  <CardHeader>
    <CardTitle>Título</CardTitle>
  </CardHeader>
  <CardContent>Conteúdo</CardContent>
</Card>

// Badge
<Badge>Categoria</Badge>
<Badge variant="blue">Info</Badge>
```

### Shared Components

```typescript
import { Header } from '@/components/shared/header'
import { BookCard } from '@/components/shared/book-card'

// Já está no layout raiz
<Header activeTab="home" />

// Usar em uma página
<BookCard
  title="Livro"
  author="Autor"
  condition="Bom"
  location="São Paulo"
  donor="João"
  category="Ficção"
/>
```

---

## 🎨 Tailwind CSS - Dicas Rápidas

### Classes Úteis

```html
<!-- Padding -->
<div className="p-4">Padding 4</div>
<div className="px-6 py-2">Padding horizontal e vertical</div>

<!-- Margin -->
<div className="m-4">Margin 4</div>
<div className="mx-auto">Centralizar horizontal</div>

<!-- Colors -->
<div className="text-primary">Texto primário</div>
<div className="bg-accent">Fundo accent</div>
<div className="border border-border">Border</div>

<!-- Layout -->
<div className="flex gap-4">Flex com gap</div>
<div className="grid grid-cols-3 gap-4">Grid 3 colunas</div>

<!-- Responsive -->
<div className="hidden md:block">Visível apenas em desktop</div>
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
  Responsivo
</div>

<!-- Hover & Transitions -->
<button className="hover:opacity-90 transition-opacity">Hover</button>

<!-- Text -->
<h1 className="text-3xl font-bold">Título Grande</h1>
<p className="text-sm text-muted-foreground">Texto pequeno</p>
```

---

## 🔍 Debugging

### Console do Browser
```typescript
// Ver dados de debug
console.log('Meu estado:', state)

// Verificar componentes React
// Instalar React Developer Tools (Chrome/Firefox)
```

### Next.js DevTools
```typescript
// Usar em qualquer página
export default function Debug() {
  return (
    <div>
      {process.env.NODE_ENV === 'development' && (
        <div style={{ position: 'fixed', bottom: 0, right: 0, background: 'red', color: 'white', padding: '10px' }}>
          DEBUG MODE
        </div>
      )}
    </div>
  )
}
```

---

## 📝 Exemplos Rápidos

### State + Form

```typescript
'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'

export default function Form() {
  const [name, setName] = useState('')

  return (
    <div>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Nome"
        className="border rounded px-4 py-2"
      />
      <Button onClick={() => console.log(name)}>
        Enviar
      </Button>
    </div>
  )
}
```

### Condicional + List

```typescript
export default function List() {
  const items = ['A', 'B', 'C']
  const isEmpty = items.length === 0

  return (
    <div>
      {isEmpty ? (
        <p>Lista vazia</p>
      ) : (
        <ul>
          {items.map(item => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      )}
    </div>
  )
}
```

### Effects

```typescript
'use client'

import { useEffect, useState } from 'react'

export default function Example() {
  const [data, setData] = useState(null)

  useEffect(() => {
    // Executar quando componente monta
    console.log('Componente montado')
    
    return () => {
      // Cleanup quando desmonta
      console.log('Componente desmontado')
    }
  }, []) // Sem dependências = executa só na montagem

  return <div>{data}</div>
}
```

---

## 🐛 Problemas Comuns

### Erro: "Cannot find module"
```
Solução: Verificar caminho e se arquivo existe
- Usar @/ para imports do root (src/)
- Exemplo: @/components/ui/button
```

### Erro: "Hydration mismatch"
```
Solução: Adicionar 'use client' no topo do arquivo
'use client'

export default function MyComponent() { ... }
```

### Estilo não aparece
```
Solução: Verificar classes Tailwind
- Classes devem ser strings estáticas
- Não funcionam com: `"p-" + number`
- Use array: `["p-4", "p-6"][index]`
```

---

## 🚀 Deploy Local

### Build para Produção
```bash
npm run build
npm run start
```

Abra http://localhost:3000

---

## 📚 Mais Informações

| Documento | Conteúdo |
|-----------|----------|
| [DOCUMENTATION.md](./DOCUMENTATION.md) | Documentação completa |
| [COMPONENTS.md](./COMPONENTS.md) | API dos componentes |
| [ARCHITECTURE.md](./ARCHITECTURE.md) | Arquitetura do projeto |
| [INTEGRATION.md](./INTEGRATION.md) | Integração com backend |

---

## ❓ Ajuda Rápida

### Criar novo branch
```bash
git checkout -b feature/minha-feature
```

### Fazer push
```bash
git add .
git commit -m "Adicionar minha feature"
git push origin feature/minha-feature
```

### Parar servidor
```bash
Ctrl + C (ou Cmd + C no Mac)
```

### Reinstalar dependências
```bash
rm -rf node_modules
npm install
```

---

## ✨ Bom Desenvolvimento!

Qualquer dúvida, consulte:
- Documentação Next.js: https://nextjs.org/docs
- Tailwind CSS: https://tailwindcss.com/docs
- Radix UI: https://www.radix-ui.com

**Happy coding!** 🎉

---

**Versão**: 1.0.0  
**Last Updated**: Maio 2026
