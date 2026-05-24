'use client'

import { MapPin, Navigation, Filter, Layers, CheckCircle, Heart } from 'lucide-react'
import { useState } from 'react'
import dynamic from 'next/dynamic'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

const Map = dynamic(() => import('@/components/shared/map-component'), { ssr: false })

interface MeetupPoint {
  id: number
  name: string
  type: string
  verified: boolean
  donations: number
  favorite: boolean
  lat: number
  lng: number
}

const PALMAS_CENTER: [number, number] = [-10.1689, -48.3317]

const MEETUP_POINTS: MeetupPoint[] = [
  {
    id: 1,
    name: 'Praça dos Girassóis',
    type: 'Praça Pública',
    verified: true,
    donations: 145,
    favorite: true,
    lat: -10.1889,
    lng: -48.3317
  },
  {
    id: 2,
    name: 'Centro Cultural de Palmas',
    type: 'Centro Cultural',
    verified: true,
    donations: 310,
    favorite: true,
    lat: -10.1689,
    lng: -48.3517
  },
  {
    id: 3,
    name: 'Biblioteca Pública de Palmas',
    type: 'Biblioteca',
    verified: true,
    donations: 89,
    favorite: false,
    lat: -10.1489,
    lng: -48.3117
  },
  {
    id: 4,
    name: 'Escola Municipal Santos Dumont',
    type: 'Escola Pública',
    verified: false,
    donations: 12,
    favorite: false,
    lat: -10.1989,
    lng: -48.3617
  },
  {
    id: 5,
    name: 'Parque Cesamar',
    type: 'Parque',
    verified: true,
    donations: 56,
    favorite: false,
    lat: -10.1589,
    lng: -48.3717
  },
]

export default function MapPage() {
  const [searchRadius, setSearchRadius] = useState('10')
  const [favorites, setFavorites] = useState<number[]>(
    MEETUP_POINTS.filter(p => p.favorite).map(p => p.id)
  )

  const toggleFavorite = (id: number) => {
    setFavorites(prev =>
      prev.includes(id) ? prev.filter(fav => fav !== id) : [...prev, id]
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Pontos de Encontro para Doação</h1>
        <p className="text-muted-foreground text-lg">
          Encontre locais seguros e verificados para realizar a entrega ou troca de livros
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Map Area */}
        <div className="lg:col-span-2">
          <Card className="overflow-hidden">
            {/* Real Map */}
            <div className="relative h-[600px] border-b border-border">
              <Map
                points={MEETUP_POINTS}
                center={PALMAS_CENTER}
                zoom={13}
              />

              {/* Search Radius Control */}
              <div className="absolute top-4 left-4 z-[1000] bg-white rounded-lg p-4 shadow-lg">
                <label className="text-xs text-muted-foreground block mb-2">
                  Raio de busca
                </label>
                <select
                  value={searchRadius}
                  onChange={(e) => setSearchRadius(e.target.value)}
                  className="px-3 py-1 border border-border rounded bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  <option value="5">5 km</option>
                  <option value="10">10 km</option>
                  <option value="20">20 km</option>
                  <option value="50">50 km</option>
                </select>
              </div>

              {/* Location Buttons */}
              <div className="absolute top-4 right-4 z-[1000] space-y-2">
                <Button size="sm" className="flex gap-2">
                  <Navigation className="w-4 h-4" />
                  Minha Localização
                </Button>
              </div>
            </div>

            {/* Map Controls */}
            <div className="flex gap-2 p-4 border-t border-border bg-background flex-wrap">
              <Button size="sm" variant="outline" className="flex gap-2">
                <Filter className="w-4 h-4" />
                Filtros
              </Button>
              <Button size="sm" variant="outline" className="flex gap-2">
                <Layers className="w-4 h-4" />
                Camadas
              </Button>
            </div>
          </Card>
        </div>

        {/* Sidebar: Meetup Points List */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold mb-4">Pontos de Encontro Próximos</h3>

          {MEETUP_POINTS.map((point) => (
            <Card key={point.id} className="p-4 hover:shadow-md transition-shadow cursor-pointer">
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-semibold text-sm">{point.name}</h4>
                    {point.verified && (
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">{point.type}</p>
                </div>
                <button
                  onClick={() => toggleFavorite(point.id)}
                  className="p-1"
                >
                  {favorites.includes(point.id) ? (
                    <Heart className="w-5 h-5 text-red-500 fill-red-500" />
                  ) : (
                    <Heart className="w-5 h-5 text-muted-foreground" />
                  )}
                </button>
              </div>

              {/* Stats */}
              <div className="flex items-center gap-2 text-xs mb-3">
                <Badge variant="secondary" className="text-xs">
                  {point.donations} doações
                </Badge>
                {point.verified && (
                  <Badge variant="green" className="text-xs">
                    Verificado
                  </Badge>
                )}
              </div>

              {/* Action */}
              <Button size="sm" className="w-full">
                <MapPin className="w-3 h-3 mr-1" />
                Ver Detalhes
              </Button>
            </Card>
          ))}

          {/* Info Box */}
          <Card className="p-4 bg-blue-50 border-blue-200">
            <p className="text-xs text-blue-900">
              <span className="font-semibold">Dica:</span> Escolha um local público e seguro para realizar a entrega dos livros.
            </p>
          </Card>
        </div>
      </div>
    </div>
  )
}
