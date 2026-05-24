'use client'

import { Search, Filter } from 'lucide-react'
import { useState } from 'react'
import { BookCard } from '@/components/shared/book-card'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

const SAMPLE_BOOKS = [
  {
    id: 1,
    title: 'Dom Casmurro',
    author: 'Machado de Assis',
    condition: 'Bom',
    location: 'São Paulo, SP',
    donor: 'Maria Silva',
    donorRating: 4.8,
    category: 'Literatura Brasileira',
    distance: '2.5 km',
    imageUrl: '/covers/dom-casmurro.jpg'
  },
  {
    id: 2,
    title: 'O Pequeno Príncipe',
    author: 'Antoine de Saint-Exupéry',
    condition: 'Ótimo',
    location: 'Rio de Janeiro, RJ',
    donor: 'João Santos',
    donorRating: 4.2,
    category: 'Infantil',
    distance: '5.8 km',
    imageUrl: '/covers/pequeno-principe.jpg'
  },
  {
    id: 3,
    title: '1984',
    author: 'George Orwell',
    condition: 'Bom',
    location: 'Belo Horizonte, MG',
    donor: 'Ana Costa',
    donorRating: 5.0,
    category: 'Ficção',
    distance: '1.2 km',
    imageUrl: '/covers/1984.jpg'
  },
  {
    id: 4,
    title: 'Sapiens',
    author: 'Yuval Noah Harari',
    condition: 'Ótimo',
    location: 'Curitiba, PR',
    donor: 'Pedro Oliveira',
    donorRating: 3.5,
    category: 'Não-ficção',
    distance: '3.7 km',
    imageUrl: '/covers/sapiens.jpg'
  },
  {
    id: 5,
    title: 'Harry Potter e a Pedra Filosofal',
    author: 'J.K. Rowling',
    condition: 'Bom',
    location: 'Porto Alegre, RS',
    donor: 'Carla Mendes',
    donorRating: 4.9,
    category: 'Fantasia',
    distance: '4.1 km',
    imageUrl: '/covers/harry-potter.jpg'
  },
  {
    id: 6,
    title: 'Matemática Básica',
    author: 'Diversos Autores',
    condition: 'Regular',
    location: 'Salvador, BA',
    donor: 'Escola Municipal',
    donorRating: 4.5,
    category: 'Didático',
    distance: '6.3 km',
    imageUrl: '/covers/matematica-basica.jpg'
  },
  {
    id: 7,
    title: 'BLAME!',
    author: 'Tsutomu Nihei',
    condition: 'Bom',
    location: 'Belo Horizonte, MG',
    donor: 'Ana Costa',
    donorRating: 5.0,
    category: 'Ficção',
    distance: '1.2 km',
    imageUrl: '/covers/blame.jpg'
  }
]

const CATEGORIES = ['Todas', 'Literatura Brasileira', 'Infantil', 'Ficção', 'Não-ficção', 'Fantasia', 'Didático']

export default function CatalogPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('Todas')

  const filteredBooks = SAMPLE_BOOKS.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         book.category.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'Todas' || book.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Catálogo de Livros Disponíveis</h1>
        <p className="text-muted-foreground text-lg">
          Explore nossa coleção de livros disponíveis para doação
        </p>
      </div>

      {/* Search and Filters */}
      <Card className="p-6 mb-8">
        {/* Search Bar */}
        <div className="mb-4">
          <label htmlFor="search" className="block text-sm font-medium mb-2">
            Buscar Livros
          </label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              id="search"
              type="text"
              placeholder="Buscar por título, autor ou categoria..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
        </div>

        {/* Category Filters */}
        <div>
          <label className="block text-sm font-medium mb-3">
            Categorias
          </label>
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </Card>

      {/* Results Info */}
      <div className="mb-6">
        <p className="text-sm text-muted-foreground">
          {filteredBooks.length} livro{filteredBooks.length !== 1 ? 's' : ''} encontrado{filteredBooks.length !== 1 ? 's' : ''}
        </p>
      </div>

      {/* Books Grid */}
      {filteredBooks.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBooks.map((book) => (
            <BookCard
              key={book.id}
              {...book}
              onRequest={() => console.log(`Solicitação para: ${book.title}`)}
            />
          ))}
        </div>
      ) : (
        <Card className="p-12 text-center">
          <p className="text-muted-foreground text-lg">
            Nenhum livro encontrado com os critérios de busca.
          </p>
          <Button
            variant="ghost"
            className="mt-4"
            onClick={() => {
              setSearchTerm('')
              setSelectedCategory('Todas')
            }}
          >
            Limpar filtros
          </Button>
        </Card>
      )}
    </div>
  )
}
