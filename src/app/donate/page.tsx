'use client'

import { Upload, BookPlus, AlertCircle } from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

export default function DonatePage() {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    isbn: '',
    category: '',
    condition: '',
    description: '',
    city: '',
    state: ''
  })

  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Formulário enviado:', formData)
    setSubmitted(true)
    setTimeout(() => {
      setFormData({
        title: '',
        author: '',
        isbn: '',
        category: '',
        condition: '',
        description: '',
        city: '',
        state: ''
      })
      setSubmitted(false)
    }, 3000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      {/* Page Header */}
      <div className="text-center mb-8">
        <BookPlus className="w-12 h-12 text-primary mx-auto mb-4" />
        <h1 className="text-4xl font-bold mb-2">Doar um Livro</h1>
        <p className="text-muted-foreground text-lg">
          Preencha as informações do livro que você deseja doar
        </p>
      </div>

      {/* Important Info Alert */}
      <Card className="bg-blue-50 border-blue-200 p-4 mb-8">
        <div className="flex gap-3">
          <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-blue-900">
            <p className="font-medium mb-2">Informações importantes:</p>
            <ul className="list-disc list-inside space-y-1 text-blue-800">
              <li>Você receberá notificações de solicitações de interessados</li>
              <li>Pode aceitar ou recusar solicitações com base na justificativa</li>
              <li>A combinação de entrega é feita diretamente entre doador e receptor</li>
            </ul>
          </div>
        </div>
      </Card>

      {/* Submission Success Message */}
      {submitted && (
        <Card className="bg-green-50 border-green-200 p-4 mb-8">
          <div className="flex gap-3">
            <div className="text-sm text-green-900">
              <p className="font-medium">✓ Livro cadastrado com sucesso!</p>
              <p>Em breve você receberá notificações de solicitações.</p>
            </div>
          </div>
        </Card>
      )}

      {/* Form */}
      <Card className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Book Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Informações do Livro</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="title" className="block text-sm font-medium mb-2">
                  Título *
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                  placeholder="Ex: Dom Casmurro"
                />
              </div>

              <div>
                <label htmlFor="author" className="block text-sm font-medium mb-2">
                  Autor *
                </label>
                <input
                  type="text"
                  id="author"
                  name="author"
                  value={formData.author}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                  placeholder="Ex: Machado de Assis"
                />
              </div>

              <div>
                <label htmlFor="isbn" className="block text-sm font-medium mb-2">
                  ISBN
                </label>
                <input
                  type="text"
                  id="isbn"
                  name="isbn"
                  value={formData.isbn}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                  placeholder="Ex: 978-8535904765"
                />
              </div>

              <div>
                <label htmlFor="category" className="block text-sm font-medium mb-2">
                  Categoria *
                </label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  <option value="">Selecione uma categoria</option>
                  <option value="Literatura Brasileira">Literatura Brasileira</option>
                  <option value="Infantil">Infantil</option>
                  <option value="Ficção">Ficção</option>
                  <option value="Não-ficção">Não-ficção</option>
                  <option value="Fantasia">Fantasia</option>
                  <option value="Didático">Didático</option>
                  <option value="Científico">Científico</option>
                  <option value="Autoajuda">Autoajuda</option>
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="condition" className="block text-sm font-medium mb-2">
                Estado do Livro *
              </label>
              <select
                id="condition"
                name="condition"
                value={formData.condition}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <option value="">Selecione o estado</option>
                <option value="Como novo">Como novo</option>
                <option value="Ótimo">Ótimo</option>
                <option value="Bom">Bom</option>
                <option value="Regular">Regular</option>
              </select>
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium mb-2">
                Descrição Adicional
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                placeholder="Descreva qualquer detalhe importante sobre o livro (ex: marcas, destaques, etc)"
              />
            </div>
          </div>

          {/* Location Information */}
          <div className="space-y-4 border-t border-border pt-6">
            <h3 className="text-lg font-semibold">Localização</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="city" className="block text-sm font-medium mb-2">
                  Cidade *
                </label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                  placeholder="Ex: São Paulo"
                />
              </div>

              <div>
                <label htmlFor="state" className="block text-sm font-medium mb-2">
                  Estado *
                </label>
                <select
                  id="state"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  <option value="">Selecione um estado</option>
                  <option value="SP">São Paulo (SP)</option>
                  <option value="RJ">Rio de Janeiro (RJ)</option>
                  <option value="MG">Minas Gerais (MG)</option>
                  <option value="BA">Bahia (BA)</option>
                  <option value="PR">Paraná (PR)</option>
                  <option value="RS">Rio Grande do Sul (RS)</option>
                  <option value="SC">Santa Catarina (SC)</option>
                  <option value="ES">Espírito Santo (ES)</option>
                  <option value="PE">Pernambuco (PE)</option>
                  <option value="CE">Ceará (CE)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="border-t border-border pt-6 flex gap-4">
            <Button type="submit" size="lg">
              <BookPlus className="w-4 h-4 mr-2" />
              Cadastrar Livro para Doação
            </Button>
            <Button type="reset" variant="outline" size="lg">
              Limpar
            </Button>
          </div>
        </form>
      </Card>
    </div>
  )
}
