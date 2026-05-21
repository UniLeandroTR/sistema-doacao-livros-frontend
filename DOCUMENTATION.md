# LivroSolidário - Frontend (Next.js)

Uma plataforma moderna para conectar doadores de livros a escolas públicas e pessoas interessadas em fomentar a leitura.

## 🚀 Começando

### Pré-requisitos
- Node.js 18+
- npm ou yarn

### Instalação

```bash
# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento
npm run dev

# Build para produção
npm run build

# Iniciar servidor de produção
npm start
```

Abra [http://localhost:3000](http://localhost:3000) no seu navegador.

## 📁 Estrutura do Projeto

```
src/
├── app/                          # App Router
│   ├── layout.tsx               # Layout raiz com Header e Footer
│   ├── page.tsx                 # Home page
│   ├── globals.css              # Estilos globais
│   ├── catalog/
│   │   └── page.tsx             # Catálogo com busca e filtros
│   ├── donate/
│   │   └── page.tsx             # Formulário de doação
│   ├── requests/
│   │   └── page.tsx             # Gerenciar solicitações
│   └── map/
│       └── page.tsx             # Mapa de pontos de encontro
│
├── components/
│   ├── shared/
│   │   ├── header.tsx           # Cabeçalho/Navegação
│   │   └── book-card.tsx        # Cartão de livro
│   ├── ui/
│   │   ├── button.tsx           # Componente botão
│   │   ├── card.tsx             # Componente card
│   │   └── badge.tsx            # Componente badge
│   └── home/
│       └── sections.tsx         # Seções da home
│
└── lib/
    └── utils.ts                 # Utilitários (cn function)
```

## 🎨 Páginas

### Home (`/`)
- Hero section com call-to-actions
- Como funciona (3 passos)
- Público beneficiado com estatísticas
- CTA final

### Catálogo (`/catalog`)
- Busca de livros por título, autor ou categoria
- Filtros por categoria
- Grid de cartões de livros
- Informações do doador e avaliações

### Doar (`/donate`)
- Formulário completo para cadastro de livro
- Validação de campos
- Suporte a múltiplas categorias
- Informações de localização (cidade/estado)

### Solicitações (`/requests`)
- Dashboard com estatísticas (pendentes, aprovadas, recusadas)
- Lista de solicitações com justificativas
- Ações para aprovar/recusar
- Contato com solicitantes

### Mapa (`/map`)
- Visualização interativa de pontos de encontro
- Filtro por raio de busca
- Marcar favoritos
- Informações detalhadas de cada ponto

## 🛠️ Componentes Reutilizáveis

### UI Components
- **Button**: Múltiplas variantes (default, outline, secondary, ghost, destructive)
- **Card**: Sistema de card com headers, content, footer
- **Badge**: Status badges com cores específicas

### Shared Components
- **Header**: Navegação principal com mobile menu
- **BookCard**: Cartão de livro com informações do doador

### Home Sections
- **HeroSection**: Banner principal
- **HowItWorksSection**: Processo em 3 passos
- **BeneficiariesSection**: Público beneficiado
- **CallToActionSection**: CTA final

## 🎯 Features Implementadas

✅ App Router Next.js com páginas otimizadas
✅ Componentes reutilizáveis e bem estruturados
✅ Design responsivo (mobile-first)
✅ Search e filtering com estado local
✅ Formulários com validação
✅ UI consistente com Tailwind CSS
✅ Integração com Radix UI
✅ Ícones com Lucide React

## 🔄 Dados de Amostra

Atualmente o projeto utiliza dados em memória para demonstração:
- 6 livros no catálogo
- 4 solicitações de exemplo
- 5 pontos de encontro

## 📝 Próximos Passos

1. **Backend Integration**
   - Conectar com API Backend
   - Implementar autenticação
   - Sincronizar dados reais

2. **Enhancements**
   - Upload de imagens de livros
   - Sistema de comentários/avaliações
   - Filtros avançados
   - Geolocalização real
   - Notificações em tempo real

3. **Performance**
   - Image optimization
   - Code splitting
   - Caching strategy

4. **SEO**
   - Meta tags otimizadas
   - Sitemap
   - Schema.org markup

## 📦 Dependências Principais

- **next**: 16.2.6 - Framework React
- **react**: 19.2.4 - Biblioteca UI
- **tailwindcss**: 4.x - Utilitários CSS
- **@radix-ui**: Componentes headless
- **lucide-react**: 0.487.0 - Ícones
- **class-variance-authority**: CVA para componentes
- **clsx & tailwind-merge**: Utilitários CSS

## 🎨 Customização de Temas

As cores são definidas em `src/app/globals.css` usando CSS variables:

```css
--color-primary: #2563eb
--color-secondary: #f3f4f6
--color-accent: #f5f5f5
```

Modifique o arquivo para alterar o tema globalmente.

## 📄 Licença

Este projeto está sob licença privada.

## 👥 Contribuições

Para contribuir, entre em contato com a equipe de desenvolvimento.

---

**LivroSolidário** - Compartilhando conhecimento ✨
