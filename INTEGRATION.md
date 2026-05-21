# Guia de Integração - API Backend

## Visão Geral

Este guia documenta como integrar o frontend Next.js com um backend API.

## Endpoints Esperados

### Autenticação
```
POST /api/auth/login
POST /api/auth/register
POST /api/auth/logout
GET  /api/auth/me
```

### Livros
```
GET    /api/books                    # Lista de livros com filtros
GET    /api/books/:id                # Detalhes do livro
POST   /api/books                    # Criar novo livro
PUT    /api/books/:id                # Atualizar livro
DELETE /api/books/:id                # Deletar livro
POST   /api/books/:id/request        # Solicitar livro
```

### Solicitações
```
GET    /api/requests                 # Lista de solicitações
GET    /api/requests/:id             # Detalhes da solicitação
PUT    /api/requests/:id/approve     # Aprovar solicitação
PUT    /api/requests/:id/reject      # Recusar solicitação
```

### Usuários
```
GET    /api/users/:id                # Perfil do usuário
PUT    /api/users/:id                # Atualizar perfil
GET    /api/users/:id/books          # Livros do usuário
GET    /api/users/:id/requests       # Solicitações do usuário
```

### Pontos de Encontro
```
GET    /api/meetup-points            # Lista com geolocalização
GET    /api/meetup-points/:id        # Detalhes do ponto
```

---

## Exemplo de Integração

### 1. Criar um arquivo de configuração da API

**`src/lib/api.ts`**
```typescript
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api'

interface ApiOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE'
  body?: any
  headers?: Record<string, string>
}

export async function apiCall(endpoint: string, options: ApiOptions = {}) {
  const url = `${API_BASE_URL}${endpoint}`
  
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...options.headers
  }
  
  // Adicionar token de autenticação se existir
  const token = localStorage.getItem('authToken')
  if (token) {
    headers['Authorization'] = `Bearer ${token}`
  }
  
  const response = await fetch(url, {
    method: options.method || 'GET',
    headers,
    body: options.body ? JSON.stringify(options.body) : undefined
  })
  
  if (!response.ok) {
    throw new Error(`API Error: ${response.status}`)
  }
  
  return response.json()
}

// Helper methods
export const api = {
  get: (endpoint: string) => apiCall(endpoint),
  post: (endpoint: string, body: any) => 
    apiCall(endpoint, { method: 'POST', body }),
  put: (endpoint: string, body: any) => 
    apiCall(endpoint, { method: 'PUT', body }),
  delete: (endpoint: string) => 
    apiCall(endpoint, { method: 'DELETE' })
}
```

### 2. Usar em uma página

**`src/app/catalog/page.tsx`**
```typescript
'use client'

import { useEffect, useState } from 'react'
import { api } from '@/lib/api'
import { BookCard } from '@/components/shared/book-card'

interface Book {
  id: number
  title: string
  author: string
  // ... outros campos
}

export default function CatalogPage() {
  const [books, setBooks] = useState<Book[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true)
        const data = await api.get('/books')
        setBooks(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro ao carregar livros')
      } finally {
        setLoading(false)
      }
    }

    fetchBooks()
  }, [])

  if (loading) return <div>Carregando...</div>
  if (error) return <div>Erro: {error}</div>

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {books.map(book => (
        <BookCard key={book.id} {...book} />
      ))}
    </div>
  )
}
```

### 3. Usar em um formulário

**`src/app/donate/page.tsx`**
```typescript
'use client'

import { useState } from 'react'
import { api } from '@/lib/api'
import { Button } from '@/components/ui/button'

export default function DonatePage() {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    // ... outros campos
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      setIsSubmitting(true)
      setError(null)
      
      await api.post('/books', formData)
      
      // Sucesso!
      alert('Livro cadastrado com sucesso!')
      setFormData({ title: '', author: '' }) // Reset form
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao cadastrar')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      {/* Campos do formulário */}
      
      {error && <div className="text-red-600">{error}</div>}
      
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Enviando...' : 'Cadastrar'}
      </Button>
    </form>
  )
}
```

---

## Autenticação

### 1. Criar um Context de Autenticação

**`src/lib/auth-context.tsx`**
```typescript
'use client'

import { createContext, useContext, useState, useEffect } from 'react'
import { api } from './api'

interface User {
  id: string
  name: string
  email: string
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  register: (data: any) => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Verificar se usuário está autenticado ao montar
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('authToken')
      if (!token) {
        setIsLoading(false)
        return
      }

      try {
        const userData = await api.get('/auth/me')
        setUser(userData)
      } catch {
        localStorage.removeItem('authToken')
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [])

  const login = async (email: string, password: string) => {
    const response = await api.post('/auth/login', { email, password })
    localStorage.setItem('authToken', response.token)
    setUser(response.user)
  }

  const logout = () => {
    localStorage.removeItem('authToken')
    setUser(null)
  }

  const register = async (data: any) => {
    const response = await api.post('/auth/register', data)
    localStorage.setItem('authToken', response.token)
    setUser(response.user)
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de AuthProvider')
  }
  return context
}
```

### 2. Usar o AuthProvider no layout raiz

**`src/app/layout.tsx`**
```typescript
import { AuthProvider } from '@/lib/auth-context'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>
        <AuthProvider>
          {/* ... resto do layout ... */}
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}
```

### 3. Usar em componentes

```typescript
import { useAuth } from '@/lib/auth-context'

export function Profile() {
  const { user, logout } = useAuth()

  if (!user) {
    return <p>Faça login para ver seu perfil</p>
  }

  return (
    <div>
      <h2>{user.name}</h2>
      <button onClick={logout}>Logout</button>
    </div>
  )
}
```

---

## Variáveis de Ambiente

**.env.local**
```
NEXT_PUBLIC_API_URL=http://localhost:3001/api
```

**.env.production**
```
NEXT_PUBLIC_API_URL=https://api.livrosolidario.com/api
```

---

## Tratamento de Erros

### Criar um interceptor de erro global

**`src/lib/api-error.ts`**
```typescript
export class ApiError extends Error {
  constructor(
    public status: number,
    message: string
  ) {
    super(message)
  }
}

export function handleApiError(error: ApiError) {
  switch (error.status) {
    case 401:
      // Redirecionar para login
      window.location.href = '/login'
      break
    case 403:
      // Acesso negado
      console.error('Acesso negado')
      break
    case 404:
      // Não encontrado
      console.error('Recurso não encontrado')
      break
    case 500:
      // Erro do servidor
      console.error('Erro do servidor')
      break
  }
}
```

---

## Caching com SWR

Instale SWR para melhor gestão de dados:

```bash
npm install swr
```

**`src/lib/hooks/useBooks.ts`**
```typescript
import useSWR from 'swr'
import { api } from '@/lib/api'

export function useBooks() {
  const { data, error, isLoading } = useSWR('/books', 
    (url) => api.get(url)
  )

  return {
    books: data || [],
    isLoading,
    error: error?.message
  }
}
```

Uso:
```typescript
import { useBooks } from '@/lib/hooks/useBooks'

export function CatalogPage() {
  const { books, isLoading } = useBooks()
  
  if (isLoading) return <div>Carregando...</div>
  
  return <div>{/* Mostrar livros */}</div>
}
```

---

## Tipagem com TypeScript

**`src/types/index.ts`**
```typescript
export interface Book {
  id: number
  title: string
  author: string
  condition: 'Como novo' | 'Ótimo' | 'Bom' | 'Regular'
  category: string
  location: string
  donor: User
  createdAt: string
  updatedAt: string
}

export interface User {
  id: string
  name: string
  email: string
  rating: number
  totalDonations: number
}

export interface DonationRequest {
  id: number
  book: Book
  requester: User
  justification: string
  status: 'pending' | 'approved' | 'rejected'
  createdAt: string
}
```

---

## Testing

**`src/__tests__/api.test.ts`**
```typescript
import { api } from '@/lib/api'

describe('API', () => {
  it('should fetch books', async () => {
    const books = await api.get('/books')
    expect(Array.isArray(books)).toBe(true)
  })

  it('should create a book', async () => {
    const book = await api.post('/books', {
      title: 'Test Book',
      author: 'Test Author'
    })
    expect(book.id).toBeDefined()
  })
})
```

---

Para mais informações sobre o backend, consulte a documentação da API Backend.
