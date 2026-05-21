import { MapPin, Calendar, User, Star } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'

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

export function BookCard({
  title,
  author,
  condition,
  location,
  donor,
  donorRating = 0,
  category,
  imageUrl,
  distance,
  onRequest
}: BookCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      {/* Image Section */}
      <div className="h-48 bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center overflow-hidden">
        {imageUrl ? (
          <img src={imageUrl} alt={title} className="w-full h-full object-cover" />
        ) : (
          <div className="text-6xl">📚</div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-4">
        {/* Category Badge */}
        <div className="mb-3">
          <Badge variant="blue" className="text-xs">
            {category}
          </Badge>
        </div>

        {/* Book Info */}
        <h3 className="font-semibold mb-1 line-clamp-2">{title}</h3>
        <p className="text-sm text-muted-foreground mb-4">por {author}</p>

        {/* Details */}
        <div className="space-y-2 text-sm mb-4">
          {/* Donor */}
          <div className="flex items-center gap-2 text-muted-foreground">
            <User className="w-4 h-4 flex-shrink-0" />
            <div className="flex items-center gap-1">
              <span className="truncate">{donor}</span>
              {donorRating > 0 && (
                <span className="flex items-center text-yellow-500 text-xs ml-1 font-medium whitespace-nowrap">
                  ★ {donorRating.toFixed(1)}
                </span>
              )}
            </div>
          </div>

          {/* Location */}
          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin className="w-4 h-4 flex-shrink-0" />
            <div className="flex items-center gap-2 text-xs">
              <span className="truncate">{location}</span>
              {distance && <span>• {distance}</span>}
            </div>
          </div>

          {/* Condition */}
          <div className="flex items-center gap-2 text-muted-foreground">
            <Calendar className="w-4 h-4 flex-shrink-0" />
            <span>Estado: {condition}</span>
          </div>
        </div>

        {/* Action Button */}
        <Button
          className="w-full"
          size="sm"
          onClick={onRequest}
        >
          Solicitar Livro
        </Button>
      </div>
    </Card>
  )
}
