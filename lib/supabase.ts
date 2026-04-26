import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
// Suporte à chave nova (publishable) e à chave legada (anon)
const supabaseKey = (
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ??
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export const supabase = createClient(supabaseUrl, supabaseKey)

export type Agendamento = {
  id: string
  nome: string
  telefone: string
  email?: string
  data_hora: string
  servico: string
  observacoes?: string
  status: 'pendente' | 'confirmado' | 'cancelado' | 'concluido'
  criado_em: string
}

export type HorarioTrabalho = {
  id: number
  dia_semana: number
  hora_inicio: string
  hora_fim: string
  ativo: boolean
}

export type DataBloqueada = {
  id: number
  data: string
  motivo?: string
}
