"use client"

import { useState, useEffect, useCallback } from "react"
import { useRouter } from "next/navigation"
import { format, parseISO } from "date-fns"
import { ptBR } from "date-fns/locale"
import {
  Calendar, Clock, User, Phone, CheckCircle2,
  XCircle, LogOut, Ban, RefreshCw, ChevronDown
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { supabase } from "@/lib/supabase"

type Agendamento = {
  id: string
  nome: string
  telefone: string
  email?: string
  data_hora: string
  servico: string
  status: "pendente" | "confirmado" | "cancelado" | "concluido"
  observacoes?: string
  criado_em: string
}

type DataBloqueada = {
  id: number
  data: string
  motivo?: string
}

const STATUS_LABELS: Record<string, { label: string; color: string }> = {
  pendente:   { label: "Pendente",   color: "bg-yellow-500/15 text-yellow-400 border-yellow-500/20" },
  confirmado: { label: "Confirmado", color: "bg-green-500/15 text-green-400 border-green-500/20" },
  cancelado:  { label: "Cancelado",  color: "bg-red-500/15 text-red-400 border-red-500/20" },
  concluido:  { label: "Concluído",  color: "bg-blue-500/15 text-blue-400 border-blue-500/20" },
}

export default function AdminDashboard() {
  const router = useRouter()
  const [agendamentos, setAgendamentos] = useState<Agendamento[]>([])
  const [bloqueios, setBloqueios] = useState<DataBloqueada[]>([])
  const [loading, setLoading] = useState(true)
  const [tab, setTab] = useState<"agendamentos" | "bloqueios">("agendamentos")
  const [filtro, setFiltro] = useState<string>("todos")
  const [novaData, setNovaData] = useState("")
  const [novoMotivo, setNovoMotivo] = useState("")
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (typeof window !== "undefined") {
      const auth = sessionStorage.getItem("admin_auth")
      if (!auth) router.push("/admin")
    }
  }, [router])

  const fetchAgendamentos = useCallback(async () => {
    setLoading(true)
    const { data } = await supabase
      .from("agendamentos")
      .select("*")
      .order("data_hora", { ascending: true })
    setAgendamentos(data || [])
    setLoading(false)
  }, [])

  const fetchBloqueios = useCallback(async () => {
    const { data } = await supabase
      .from("datas_bloqueadas")
      .select("*")
      .order("data", { ascending: true })
    setBloqueios(data || [])
  }, [])

  useEffect(() => {
    fetchAgendamentos()
    fetchBloqueios()
  }, [fetchAgendamentos, fetchBloqueios])

  const updateStatus = async (id: string, status: string) => {
    await supabase.from("agendamentos").update({ status }).eq("id", id)
    setAgendamentos(prev => prev.map(a => a.id === id ? { ...a, status: status as Agendamento["status"] } : a))
  }

  const adicionarBloqueio = async () => {
    if (!novaData) return
    setSaving(true)
    await supabase.from("datas_bloqueadas").insert({ data: novaData, motivo: novoMotivo || null })
    setNovaData("")
    setNovoMotivo("")
    await fetchBloqueios()
    setSaving(false)
  }

  const removerBloqueio = async (id: number) => {
    await supabase.from("datas_bloqueadas").delete().eq("id", id)
    setBloqueios(prev => prev.filter(b => b.id !== id))
  }

  const logout = () => {
    sessionStorage.removeItem("admin_auth")
    router.push("/admin")
  }

  const agendamentosFiltrados = agendamentos.filter(a =>
    filtro === "todos" ? true : a.status === filtro
  )

  const stats = {
    total: agendamentos.length,
    pendentes: agendamentos.filter(a => a.status === "pendente").length,
    confirmados: agendamentos.filter(a => a.status === "confirmado").length,
    hoje: agendamentos.filter(a => {
      const hoje = new Date().toISOString().split("T")[0]
      return a.data_hora.startsWith(hoje)
    }).length,
  }

  return (
    <div className="min-h-screen bg-[#1c1810]">
      {/* Header */}
      <header className="border-b border-white/8 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="font-serif text-xl text-white">Painel Admin</h1>
            <p className="text-white/40 text-xs">Dra. Sônis Paz · Fisioterapia Pélvica</p>
          </div>
          <Button onClick={logout} variant="ghost"
            className="text-white/50 hover:text-white hover:bg-white/8 gap-2">
            <LogOut className="w-4 h-4" />
            Sair
          </Button>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-8">

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total", value: stats.total, color: "text-white" },
            { label: "Hoje", value: stats.hoje, color: "text-[#c4a05a]" },
            { label: "Pendentes", value: stats.pendentes, color: "text-yellow-400" },
            { label: "Confirmados", value: stats.confirmados, color: "text-green-400" },
          ].map((stat, i) => (
            <div key={i} className="bg-white/5 border border-white/8 rounded-xl p-4 text-center">
              <p className={`font-serif text-3xl ${stat.color} mb-1`}>{stat.value}</p>
              <p className="text-white/40 text-xs">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          {[
            { key: "agendamentos", label: "Agendamentos" },
            { key: "bloqueios", label: "Bloquear Datas" },
          ].map(t => (
            <button key={t.key} onClick={() => setTab(t.key as typeof tab)}
              className={`px-5 py-2 rounded-lg text-sm font-medium transition-all ${
                tab === t.key
                  ? "bg-[#8c7642] text-white"
                  : "bg-white/5 text-white/50 hover:text-white hover:bg-white/10"
              }`}>
              {t.label}
            </button>
          ))}
          <Button onClick={fetchAgendamentos} variant="ghost" size="icon"
            className="ml-auto text-white/40 hover:text-white hover:bg-white/8">
            <RefreshCw className="w-4 h-4" />
          </Button>
        </div>

        {/* Agendamentos Tab */}
        {tab === "agendamentos" && (
          <div>
            {/* Filtros */}
            <div className="flex flex-wrap gap-2 mb-6">
              {["todos", "pendente", "confirmado", "cancelado", "concluido"].map(f => (
                <button key={f} onClick={() => setFiltro(f)}
                  className={`px-4 py-1.5 rounded-full text-xs font-medium border transition-all ${
                    filtro === f
                      ? "bg-[#8c7642] text-white border-[#8c7642]"
                      : "border-white/15 text-white/50 hover:border-white/30 hover:text-white"
                  }`}>
                  {f === "todos" ? "Todos" : STATUS_LABELS[f]?.label}
                </button>
              ))}
            </div>

            {loading ? (
              <div className="text-center py-16 text-white/30">Carregando...</div>
            ) : agendamentosFiltrados.length === 0 ? (
              <div className="text-center py-16 text-white/30">Nenhum agendamento encontrado</div>
            ) : (
              <div className="space-y-3">
                {agendamentosFiltrados.map(ag => (
                  <div key={ag.id}
                    className="bg-white/4 border border-white/8 rounded-xl p-5 hover:border-white/15 transition-colors">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-3">
                          <User className="w-4 h-4 text-[#c4a05a] flex-shrink-0" />
                          <span className="text-white font-medium">{ag.nome}</span>
                          <span className={`text-xs px-2.5 py-0.5 rounded-full border ${STATUS_LABELS[ag.status]?.color}`}>
                            {STATUS_LABELS[ag.status]?.label}
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-4 text-sm text-white/50">
                          <span className="flex items-center gap-1.5">
                            <Phone className="w-3.5 h-3.5" />
                            {ag.telefone}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <Calendar className="w-3.5 h-3.5" />
                            {format(parseISO(ag.data_hora), "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5" />
                            {format(parseISO(ag.data_hora), "HH:mm")}h
                          </span>
                        </div>
                      </div>

                      {/* Ações */}
                      <div className="flex gap-2 flex-shrink-0">
                        {ag.status === "pendente" && (
                          <>
                            <Button size="sm" onClick={() => updateStatus(ag.id, "confirmado")}
                              className="bg-green-600/20 hover:bg-green-600/30 text-green-400 border border-green-500/20 gap-1.5 h-8">
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              Confirmar
                            </Button>
                            <Button size="sm" onClick={() => updateStatus(ag.id, "cancelado")}
                              className="bg-red-600/20 hover:bg-red-600/30 text-red-400 border border-red-500/20 gap-1.5 h-8">
                              <XCircle className="w-3.5 h-3.5" />
                              Cancelar
                            </Button>
                          </>
                        )}
                        {ag.status === "confirmado" && (
                          <Button size="sm" onClick={() => updateStatus(ag.id, "concluido")}
                            className="bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 border border-blue-500/20 gap-1.5 h-8">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            Concluído
                          </Button>
                        )}
                        <Button size="sm" asChild
                          className="bg-[#8c7642]/20 hover:bg-[#8c7642]/30 text-[#c4a05a] border border-[#8c7642]/20 h-8">
                          <a href={`https://wa.me/55${ag.telefone.replace(/\D/g, "")}?text=Olá ${ag.nome},%20sua%20consulta%20está%20confirmada%20para%20${format(parseISO(ag.data_hora), "dd/MM 'às' HH:mm")}h.`}
                            target="_blank" rel="noopener noreferrer">
                            WhatsApp
                          </a>
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Bloqueios Tab */}
        {tab === "bloqueios" && (
          <div>
            {/* Adicionar bloqueio */}
            <div className="bg-white/4 border border-white/8 rounded-xl p-6 mb-6">
              <h3 className="text-white font-medium mb-4 flex items-center gap-2">
                <Ban className="w-4 h-4 text-[#c4a05a]" />
                Bloquear nova data
              </h3>
              <div className="flex flex-col sm:flex-row gap-3">
                <input type="date" value={novaData} onChange={e => setNovaData(e.target.value)}
                  min={new Date().toISOString().split("T")[0]}
                  className="flex-1 bg-white/8 border border-white/15 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#c4a05a]/50 [color-scheme:dark]" />
                <input type="text" value={novoMotivo} onChange={e => setNovoMotivo(e.target.value)}
                  placeholder="Motivo (opcional)"
                  className="flex-1 bg-white/8 border border-white/15 rounded-lg px-4 py-2.5 text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-[#c4a05a]/50" />
                <Button onClick={adicionarBloqueio} disabled={!novaData || saving}
                  className="bg-[#8c7642] hover:bg-[#7a6538] text-white border-0 px-6">
                  {saving ? "Salvando..." : "Bloquear"}
                </Button>
              </div>
            </div>

            {/* Lista de bloqueios */}
            {bloqueios.length === 0 ? (
              <div className="text-center py-16 text-white/30">Nenhuma data bloqueada</div>
            ) : (
              <div className="space-y-3">
                {bloqueios.map(b => (
                  <div key={b.id}
                    className="bg-white/4 border border-white/8 rounded-xl px-5 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <Ban className="w-4 h-4 text-red-400 flex-shrink-0" />
                      <div>
                        <p className="text-white font-medium">
                          {format(parseISO(b.data + "T12:00:00"), "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
                        </p>
                        {b.motivo && <p className="text-white/40 text-sm">{b.motivo}</p>}
                      </div>
                    </div>
                    <Button size="sm" onClick={() => removerBloqueio(b.id)}
                      className="bg-red-600/20 hover:bg-red-600/30 text-red-400 border border-red-500/20 h-8">
                      Remover
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
