'use client'

import { Check, X, Clock, MessageSquare, User, Book, Star } from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

type RequestStatus = 'pending' | 'approved' | 'rejected'

interface DonationRequest {
  id: number
  book: string
  requester: string
  requesterType: string
  requesterRating: number
  date: string
  status: RequestStatus
  justification: string
}

const SAMPLE_REQUESTS: DonationRequest[] = [
  {
    id: 1,
    book: 'Dom Casmurro',
    requester: 'Carlos Mendes',
    requesterType: 'Pessoa Física',
    requesterRating: 4.9,
    date: '2026-04-25',
    status: 'pending',
    justification: 'Sou estudante de Letras e preciso deste livro para meu trabalho de conclusão de curso sobre Machado de Assis. Seria de grande ajuda para minha formação acadêmica.'
  },
  {
    id: 2,
    book: 'O Pequeno Príncipe',
    requester: 'Escola Municipal Santos Dumont',
    requesterType: 'Escola Pública',
    requesterRating: 5.0,
    date: '2026-04-24',
    status: 'pending',
    justification: 'Nossa biblioteca está formando um acervo de literatura infantil para incentivar a leitura entre nossos 300 alunos do ensino fundamental.'
  },
  {
    id: 3,
    book: 'Sapiens',
    requester: 'Mariana Costa',
    requesterType: 'Pessoa Física',
    requesterRating: 3.2,
    date: '2026-04-23',
    status: 'approved',
    justification: 'Tenho interesse em história e antropologia, mas não tenho condições financeiras de comprar o livro no momento.'
  },
  {
    id: 4,
    book: '1984',
    requester: 'Roberto Silva',
    requesterType: 'Pessoa Física',
    requesterRating: 4.5,
    date: '2026-04-22',
    status: 'rejected',
    justification: 'Gostaria de ler este clássico da literatura distópica.'
  }
]

export default function RequestsPage() {
  const [requests, setRequests] = useState<DonationRequest[]>(SAMPLE_REQUESTS)
  const [selectedRequest, setSelectedRequest] = useState<DonationRequest | null>(null)

  const getStatusBadge = (status: RequestStatus) => {
    switch (status) {
      case 'pending':
        return (
          <Badge variant="yellow" className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            Pendente
          </Badge>
        )
      case 'approved':
        return (
          <Badge variant="green" className="flex items-center gap-1">
            <Check className="w-3 h-3" />
            Aprovada
          </Badge>
        )
      case 'rejected':
        return (
          <Badge variant="red" className="flex items-center gap-1">
            <X className="w-3 h-3" />
            Recusada
          </Badge>
        )
    }
  }

  const stats = {
    pending: requests.filter(r => r.status === 'pending').length,
    approved: requests.filter(r => r.status === 'approved').length,
    rejected: requests.filter(r => r.status === 'rejected').length,
  }

  const handleApprove = (id: number) => {
    setRequests(requests.map(r => r.id === id ? { ...r, status: 'approved' as RequestStatus } : r))
    setSelectedRequest(null)
  }

  const handleReject = (id: number) => {
    setRequests(requests.map(r => r.id === id ? { ...r, status: 'rejected' as RequestStatus } : r))
    setSelectedRequest(null)
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Solicitações de Livros</h1>
        <p className="text-muted-foreground text-lg">
          Gerencie as solicitações recebidas para seus livros doados
        </p>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Card className="bg-yellow-50 border-yellow-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-yellow-700 mb-1">Pendentes</p>
              <p className="text-3xl font-bold text-yellow-900">{stats.pending}</p>
            </div>
            <Clock className="w-8 h-8 text-yellow-600" />
          </div>
        </Card>

        <Card className="bg-green-50 border-green-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-green-700 mb-1">Aprovadas</p>
              <p className="text-3xl font-bold text-green-900">{stats.approved}</p>
            </div>
            <Check className="w-8 h-8 text-green-600" />
          </div>
        </Card>

        <Card className="bg-red-50 border-red-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-red-700 mb-1">Recusadas</p>
              <p className="text-3xl font-bold text-red-900">{stats.rejected}</p>
            </div>
            <X className="w-8 h-8 text-red-600" />
          </div>
        </Card>
      </div>

      {/* Requests List */}
      <div className="space-y-4">
        {requests.length > 0 ? (
          requests.map((request) => (
            <Card key={request.id} className="p-6">
              <div className="flex items-start justify-between gap-4">
                {/* Request Info */}
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <Book className="w-5 h-5 text-primary flex-shrink-0" />
                    <h3 className="text-lg font-semibold">{request.book}</h3>
                    {getStatusBadge(request.status)}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 text-sm">
                    {/* Requester */}
                    <div className="flex items-start gap-2">
                      <User className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-muted-foreground">Solicitante</p>
                        <p className="font-medium">{request.requester}</p>
                        <p className="text-xs text-muted-foreground">{request.requesterType}</p>
                        {request.requesterRating > 0 && (
                          <p className="text-xs text-yellow-600 font-medium mt-1">
                            ★ {request.requesterRating.toFixed(1)} avaliação
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Date */}
                    <div>
                      <p className="text-muted-foreground">Data da Solicitação</p>
                      <p className="font-medium">
                        {new Date(request.date).toLocaleDateString('pt-BR')}
                      </p>
                    </div>

                    {/* Justification Preview */}
                    <div>
                      <p className="text-muted-foreground">Justificativa</p>
                      <p className="font-medium text-sm line-clamp-2">
                        {request.justification}
                      </p>
                    </div>
                  </div>

                  {/* Full Justification */}
                  <div className="bg-accent p-3 rounded-lg">
                    <p className="text-sm">
                      <span className="font-semibold">Justificativa completa:</span>{' '}
                      {request.justification}
                    </p>
                  </div>
                </div>

                {/* Actions */}
                {request.status === 'pending' && (
                  <div className="flex flex-col gap-2">
                    <Button
                      size="sm"
                      className="bg-green-600 hover:bg-green-700"
                      onClick={() => handleApprove(request.id)}
                    >
                      <Check className="w-4 h-4 mr-1" />
                      Aprovar
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleReject(request.id)}
                    >
                      <X className="w-4 h-4 mr-1" />
                      Recusar
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                    >
                      <MessageSquare className="w-4 h-4 mr-1" />
                      Enviar Msg
                    </Button>
                  </div>
                )}
                {request.status === 'approved' && (
                  <div className="flex flex-col gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-green-600 border-green-600"
                    >
                      <MessageSquare className="w-4 h-4 mr-1" />
                      Contato
                    </Button>
                  </div>
                )}
              </div>
            </Card>
          ))
        ) : (
          <Card className="p-12 text-center">
            <p className="text-muted-foreground text-lg">
              Nenhuma solicitação recebida ainda.
            </p>
          </Card>
        )}
      </div>
    </div>
  )
}
