"use client"

import { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import {
  format, addDays, startOfDay, isSameDay,
  getDay, addMonths, subMonths, startOfMonth,
  endOfMonth, eachDayOfInterval, isBefore
} from "date-fns"
import { ptBR } from "date-fns/locale"
import { ChevronLeft, ChevronRight, Clock, Calendar, User, Phone, Mail, MessageCircle, CheckCircle2, ArrowLeft, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

// ─── Tipos ───────────────────────────────────────────────
type Etapa = 'data' | 'horario' | 'dados' | 'confirmado'

const SERVICOS = [
  'Avaliação Inicial',
  'Reabilitação Pélvica',
  'Alívio de Dor',
  'Acupuntura',
  'Auriculoterapia',
  'Laser Terapia',
  'Home Care',
]

// ─── Componente principal ────────────────────────────────
export default function AgendarPage() {
  const [etapa, setEtapa]           = useState<Etapa>('data')
  const [mesSelecionado, setMes]    = useState(new Date())
  const [dataSelecionada, setData]  = useState<Date | null>(null)
  const [horarios, setHorarios]     = useState<string[]>([])
  const [horario, setHorario]       = useState<string | null>(null)
  const [loadingSlots, setLoading]  = useState(false)
  const [enviando, setEnviando]     = useState(false)
  const [erro, setErro]             = useState<string | null>(null)
  const [agendamento, setAgendamento] = useState<{ nome: string; data_hora: string } | null>(null)

  const [form, setForm] = useState({
    nome: '', telefone: '', email: '', servico: SERVICOS[0], observacoes: ''
  })

  // Gera dias do mês atual
  const hoje = startOfDay(new Date())
  const iniciomes = startOfMonth(mesSelecionado)
  const fimmes = endOfMonth(mesSelecionado)
  const dias = eachDayOfInterval({ start: iniciomes, end: fimmes })
  const primeiroOffset = getDay(iniciomes) // 0=dom

  // Busca horários quando seleciona data
  const buscarHorarios = useCallback(async (data: Date) => {
    setLoading(true)
    setHorarios([])
    setHorario(null)
    try {
      const dataStr = format(data, 'yyyy-MM-dd')
      const res = await fetch(`/api/horarios-disponiveis?data=${dataStr}`)
      const json = await res.json()
      setHorarios(json.horarios || [])
    } catch {
      setHorarios([])
    } finally {
      setLoading(false)
    }
  }, [])

  const handleSelecionarData = (dia: Date) => {
    setData(dia)
    buscarHorarios(dia)
    setEtapa('horario')
  }

  const handleSelecionarHorario = (h: string) => {
    setHorario(h)
    setEtapa('dados')
  }

  const handleEnviar = async () => {
    if (!dataSelecionada || !horario) return
    setEnviando(true)
    setErro(null)

    const [hh, mm] = horario.split(':')
    const dataHora = new Date(dataSelecionada)
    dataHora.setHours(Number(hh), Number(mm), 0, 0)

    try {
      const res = await fetch('/api/agendamentos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nome: form.nome,
          telefone: form.telefone.replace(/\D/g, ''),
          email: form.email,
          data_hora: dataHora.toISOString(),
          servico: form.servico,
          observacoes: form.observacoes,
        }),
      })
      const json = await res.json()
      if (!res.ok) {
        setErro(json.error || 'Erro ao agendar. Tente novamente.')
        return
      }
      setAgendamento({ nome: form.nome, data_hora: dataHora.toISOString() })
      setEtapa('confirmado')
    } catch {
      setErro('Erro de conexão. Tente novamente.')
    } finally {
      setEnviando(false)
    }
  }

  // Formata telefone
  const handleTelefone = (v: string) => {
    const n = v.replace(/\D/g, '').slice(0, 11)
    const fmt = n.length <= 10
      ? n.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3')
      : n.replace(/(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3')
    setForm(f => ({ ...f, telefone: fmt }))
  }

  // ─── ETAPA: CONFIRMADO ────────────────────────────────
  if (etapa === 'confirmado' && agendamento) {
    const dt = new Date(agendamento.data_hora)
    const msgWA = encodeURIComponent(
      `Olá! Acabei de agendar uma consulta pelo site.\n\n` +
      `Nome: ${agendamento.nome}\n` +
      `Data: ${format(dt, "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}\n` +
      `Horário: ${format(dt, 'HH:mm')}`
    )
    return (
      <div className="min-h-screen bg-background floral-bg flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20">
            <CheckCircle2 className="w-10 h-10 text-primary" />
          </div>
          <h1 className="font-serif text-3xl text-foreground mb-3">Agendado!</h1>
          <p className="text-muted-foreground mb-6">
            Olá, <strong className="text-foreground">{agendamento.nome}</strong>!<br />
            Sua consulta está marcada para:
          </p>
          <div className="bg-card rounded-2xl border border-border p-6 mb-8 text-left space-y-3">
            <div className="flex items-center gap-3">
              <Calendar className="w-5 h-5 text-primary flex-shrink-0" />
              <span className="text-foreground font-medium capitalize">
                {format(dt, "EEEE, dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-primary flex-shrink-0" />
              <span className="text-foreground font-medium">{format(dt, 'HH:mm')}h</span>
            </div>
            <div className="flex items-center gap-3">
              <User className="w-5 h-5 text-primary flex-shrink-0" />
              <span className="text-foreground">{form.servico}</span>
            </div>
          </div>
          <p className="text-sm text-muted-foreground mb-6">
            A Dra. Sônis entrará em contato para confirmar. Você também pode confirmar pelo WhatsApp:
          </p>
          <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground w-full mb-4">
            <a href={`https://wa.me/5567992006609?text=${msgWA}`} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="w-5 h-5 mr-2" />
              Confirmar pelo WhatsApp
            </a>
          </Button>
          <Button asChild variant="outline" className="w-full border-border">
            <Link href="/">Voltar ao site</Link>
          </Button>
        </div>
      </div>
    )
  }

  // ─── LAYOUT BASE ─────────────────────────────────────
  return (
    <div className="min-h-screen bg-background floral-bg">
      {/* Header */}
      <header className="bg-card/95 backdrop-blur-md border-b border-border sticky top-0 z-10">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm">Voltar</span>
          </Link>
          <div className="text-center">
            <p className="font-serif text-base text-foreground">Dra. Sônis Paz</p>
            <p className="text-xs text-muted-foreground">Agendamento Online</p>
          </div>
          <div className="w-16" />
        </div>
      </header>

      {/* Progress */}
      <div className="container mx-auto px-4 pt-6 pb-0 max-w-2xl">
        <div className="flex items-center gap-2 mb-8">
          {(['data', 'horario', 'dados'] as const).map((e, i) => (
            <div key={e} className="flex items-center gap-2 flex-1">
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-medium flex-shrink-0 transition-colors ${
                etapa === e ? 'bg-primary text-primary-foreground' :
                ['data','horario','dados','confirmado'].indexOf(etapa) > i ? 'bg-primary/20 text-primary' :
                'bg-muted text-muted-foreground'
              }`}>{i + 1}</div>
              <span className={`text-xs hidden sm:block ${etapa === e ? 'text-foreground font-medium' : 'text-muted-foreground'}`}>
                {e === 'data' ? 'Data' : e === 'horario' ? 'Horário' : 'Seus dados'}
              </span>
              {i < 2 && <div className={`flex-1 h-px transition-colors ${['data','horario','dados'].indexOf(etapa) > i ? 'bg-primary/30' : 'bg-border'}`} />}
            </div>
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4 pb-16 max-w-2xl">

        {/* ── ETAPA 1: DATA ── */}
        {etapa === 'data' && (
          <div className="bg-card rounded-2xl border border-border p-6">
            <h2 className="font-serif text-2xl text-foreground mb-1">Escolha uma data</h2>
            <p className="text-muted-foreground text-sm mb-6">Segunda a sexta: 8h–18h · Sábado: 8h–12h</p>

            {/* Nav do mês */}
            <div className="flex items-center justify-between mb-4">
              <button
                onClick={() => setMes(m => subMonths(m, 1))}
                disabled={isSameDay(startOfMonth(mesSelecionado), startOfMonth(hoje))}
                className="p-2 rounded-lg hover:bg-secondary disabled:opacity-30 transition-colors"
              >
                <ChevronLeft className="w-5 h-5 text-muted-foreground" />
              </button>
              <span className="font-serif text-lg text-foreground capitalize">
                {format(mesSelecionado, 'MMMM yyyy', { locale: ptBR })}
              </span>
              <button
                onClick={() => setMes(m => addMonths(m, 1))}
                disabled={isSameDay(startOfMonth(mesSelecionado), startOfMonth(addMonths(hoje, 2)))}
                className="p-2 rounded-lg hover:bg-secondary disabled:opacity-30 transition-colors"
              >
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </button>
            </div>

            {/* Dias da semana */}
            <div className="grid grid-cols-7 mb-2">
              {['Dom','Seg','Ter','Qua','Qui','Sex','Sáb'].map(d => (
                <div key={d} className="text-center text-xs text-muted-foreground py-2 font-medium">{d}</div>
              ))}
            </div>

            {/* Grid de dias */}
            <div className="grid grid-cols-7 gap-1">
              {/* Offset do primeiro dia */}
              {Array.from({ length: primeiroOffset }).map((_, i) => <div key={`off-${i}`} />)}

              {dias.map(dia => {
                const dSem = getDay(dia)
                const isPassado = isBefore(dia, hoje)
                const isDomingo = dSem === 0
                const isHoje = isSameDay(dia, hoje)
                const isSel = dataSelecionada && isSameDay(dia, dataSelecionada)
                const disabled = isPassado || isDomingo

                return (
                  <button
                    key={dia.toISOString()}
                    disabled={disabled}
                    onClick={() => handleSelecionarData(dia)}
                    className={`aspect-square rounded-xl text-sm font-medium transition-all ${
                      isSel     ? 'bg-primary text-primary-foreground' :
                      isHoje    ? 'border-2 border-primary text-primary hover:bg-primary/10' :
                      disabled  ? 'text-muted-foreground/30 cursor-not-allowed' :
                                  'hover:bg-secondary text-foreground'
                    }`}
                  >
                    {format(dia, 'd')}
                  </button>
                )
              })}
            </div>
          </div>
        )}

        {/* ── ETAPA 2: HORÁRIO ── */}
        {etapa === 'horario' && dataSelecionada && (
          <div className="bg-card rounded-2xl border border-border p-6">
            <button onClick={() => setEtapa('data')} className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-4 transition-colors">
              <ChevronLeft className="w-4 h-4" />
              {format(dataSelecionada, "EEEE, dd 'de' MMMM", { locale: ptBR })}
            </button>
            <h2 className="font-serif text-2xl text-foreground mb-1">Escolha o horário</h2>
            <p className="text-muted-foreground text-sm mb-6">Consultas com duração de 1 hora</p>

            {loadingSlots ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="w-6 h-6 text-primary animate-spin mr-2" />
                <span className="text-muted-foreground">Verificando disponibilidade...</span>
              </div>
            ) : horarios.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground mb-4">Nenhum horário disponível neste dia.</p>
                <Button variant="outline" onClick={() => setEtapa('data')} className="border-border">
                  Escolher outra data
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                {horarios.map(h => (
                  <button
                    key={h}
                    onClick={() => handleSelecionarHorario(h)}
                    className={`py-3 px-4 rounded-xl border text-sm font-medium transition-all ${
                      horario === h
                        ? 'bg-primary text-primary-foreground border-primary'
                        : 'border-border hover:border-primary/40 hover:bg-secondary text-foreground'
                    }`}
                  >
                    <Clock className="w-3.5 h-3.5 inline mr-1.5 opacity-60" />
                    {h}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ── ETAPA 3: DADOS ── */}
        {etapa === 'dados' && dataSelecionada && horario && (
          <div className="space-y-4">
            {/* Resumo */}
            <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Calendar className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="font-medium text-foreground capitalize">
                  {format(dataSelecionada, "EEEE, dd 'de' MMMM", { locale: ptBR })}
                </p>
                <p className="text-sm text-muted-foreground">às {horario}h</p>
              </div>
              <button onClick={() => setEtapa('horario')} className="ml-auto text-xs text-primary hover:underline">
                Alterar
              </button>
            </div>

            {/* Formulário */}
            <div className="bg-card rounded-2xl border border-border p-6 space-y-4">
              <h2 className="font-serif text-2xl text-foreground mb-2">Seus dados</h2>

              {/* Serviço */}
              <div>
                <Label className="text-sm text-muted-foreground mb-1.5 block">Tipo de consulta</Label>
                <select
                  value={form.servico}
                  onChange={e => setForm(f => ({ ...f, servico: e.target.value }))}
                  className="w-full h-10 px-3 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  {SERVICOS.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>

              {/* Nome */}
              <div>
                <Label className="text-sm text-muted-foreground mb-1.5 block">
                  <User className="w-3.5 h-3.5 inline mr-1" />
                  Nome completo *
                </Label>
                <Input
                  value={form.nome}
                  onChange={e => setForm(f => ({ ...f, nome: e.target.value }))}
                  placeholder="Seu nome completo"
                  className="bg-background"
                />
              </div>

              {/* Telefone */}
              <div>
                <Label className="text-sm text-muted-foreground mb-1.5 block">
                  <Phone className="w-3.5 h-3.5 inline mr-1" />
                  WhatsApp / Telefone *
                </Label>
                <Input
                  value={form.telefone}
                  onChange={e => handleTelefone(e.target.value)}
                  placeholder="(67) 99999-9999"
                  inputMode="numeric"
                  className="bg-background"
                />
              </div>

              {/* Email */}
              <div>
                <Label className="text-sm text-muted-foreground mb-1.5 block">
                  <Mail className="w-3.5 h-3.5 inline mr-1" />
                  E-mail (opcional)
                </Label>
                <Input
                  type="email"
                  value={form.email}
                  onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                  placeholder="seu@email.com"
                  className="bg-background"
                />
              </div>

              {/* Observações */}
              <div>
                <Label className="text-sm text-muted-foreground mb-1.5 block">
                  Observações (opcional)
                </Label>
                <textarea
                  value={form.observacoes}
                  onChange={e => setForm(f => ({ ...f, observacoes: e.target.value }))}
                  placeholder="Alguma informação que queira compartilhar com antecedência..."
                  rows={3}
                  className="w-full px-3 py-2 rounded-lg border border-input bg-background text-foreground text-sm resize-none focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>

              {erro && (
                <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg text-sm text-destructive">
                  {erro}
                </div>
              )}

              <Button
                onClick={handleEnviar}
                disabled={!form.nome.trim() || !form.telefone || enviando}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-6 text-base"
              >
                {enviando ? (
                  <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Confirmando...</>
                ) : (
                  <><CheckCircle2 className="w-4 h-4 mr-2" /> Confirmar Agendamento</>
                )}
              </Button>
              <p className="text-xs text-muted-foreground text-center">
                Seus dados são protegidos e usados apenas para o agendamento.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
