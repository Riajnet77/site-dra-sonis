import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { z } from 'zod'

const schema = z.object({
  nome:        z.string().min(3, 'Nome obrigatório'),
  telefone:    z.string().min(10, 'Telefone inválido'),
  email:       z.string().email('E-mail inválido').optional().or(z.literal('')),
  data_hora:   z.string(), // ISO string
  servico:     z.string().default('Avaliação Inicial'),
  observacoes: z.string().optional(),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const dados = schema.parse(body)

    // Verifica se o slot ainda está disponível
    const { data: existe } = await supabase
      .from('agendamentos')
      .select('id')
      .eq('data_hora', dados.data_hora)
      .neq('status', 'cancelado')
      .single()

    if (existe) {
      return NextResponse.json(
        { error: 'Este horário já foi reservado. Por favor, escolha outro.' },
        { status: 409 }
      )
    }

    // Insere o agendamento
    const { data: agendamento, error } = await supabase
      .from('agendamentos')
      .insert({
        nome:        dados.nome,
        telefone:    dados.telefone,
        email:       dados.email || null,
        data_hora:   dados.data_hora,
        servico:     dados.servico,
        observacoes: dados.observacoes || null,
        status:      'pendente',
      })
      .select()
      .single()

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json({ error: 'Erro ao salvar agendamento' }, { status: 500 })
    }

    return NextResponse.json({ agendamento }, { status: 201 })
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.errors[0].message }, { status: 400 })
    }
    console.error('Erro:', err)
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 })
  }
}
