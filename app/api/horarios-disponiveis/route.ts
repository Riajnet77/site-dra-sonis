import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { addMinutes, format, parseISO, setHours, setMinutes } from 'date-fns'

const DURACAO_SLOT = 60 // minutos por consulta

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const dataParam = searchParams.get('data') // formato: YYYY-MM-DD

  if (!dataParam) {
    return NextResponse.json({ error: 'Parâmetro data obrigatório' }, { status: 400 })
  }

  try {
    const data = parseISO(dataParam)
    const diaSemana = data.getDay() // 0=dom, 1=seg...

    // 1. Busca horário de trabalho para o dia
    const { data: horario, error: errHorario } = await supabase
      .from('horarios_trabalho')
      .select('*')
      .eq('dia_semana', diaSemana)
      .eq('ativo', true)
      .single()

    if (errHorario || !horario) {
      return NextResponse.json({ horarios: [] }) // dia não trabalhado
    }

    // 2. Verifica se a data está bloqueada
    const { data: bloqueio } = await supabase
      .from('datas_bloqueadas')
      .select('id')
      .eq('data', dataParam)
      .single()

    if (bloqueio) {
      return NextResponse.json({ horarios: [] })
    }

    // 3. Busca agendamentos já marcados nessa data
    const iniciodia = `${dataParam}T00:00:00`
    const fimDia    = `${dataParam}T23:59:59`

    const { data: ocupados } = await supabase
      .from('agendamentos')
      .select('data_hora')
      .gte('data_hora', iniciodia)
      .lte('data_hora', fimDia)
      .neq('status', 'cancelado')

    const horariosOcupados = new Set(
      (ocupados || []).map(a => a.data_hora.substring(11, 16))
    )

    // 4. Gera slots disponíveis
    const [hIni, mIni] = horario.hora_inicio.split(':').map(Number)
    const [hFim, mFim] = horario.hora_fim.split(':').map(Number)

    let atual = setMinutes(setHours(data, hIni), mIni)
    const fim = setMinutes(setHours(data, hFim), mFim)

    const slots: string[] = []
    const agora = new Date()

    while (addMinutes(atual, DURACAO_SLOT) <= fim) {
      const horaStr = format(atual, 'HH:mm')
      const isFuturo = atual > agora
      const isLivre  = !horariosOcupados.has(horaStr)

      if (isFuturo && isLivre) {
        slots.push(horaStr)
      }
      atual = addMinutes(atual, DURACAO_SLOT)
    }

    return NextResponse.json({ horarios: slots })
  } catch (err) {
    console.error('Erro ao buscar horários:', err)
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 })
  }
}
