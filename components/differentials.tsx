import { Shield, Heart, Sparkles, Target } from "lucide-react"

const items = [
  { icon: Shield, title: "Atendimento Individualizado", description: "Cada sessão é 100% dedicada a você, com total respeito à sua privacidade. Sem julgamentos, com discrição absoluta." },
  { icon: Heart, title: "Ambiente Acolhedor", description: "Um espaço seguro e confortável, pensado para que você se sinta à vontade durante todo o processo de cuidado." },
  { icon: Sparkles, title: "Técnicas Modernas", description: "Métodos baseados nas mais recentes evidências científicas, garantindo resultados reais e duradouros para você." },
  { icon: Target, title: "Foco em Resultado", description: "Compromisso com sua melhora real e sustentável, acompanhando cada etapa da sua evolução de perto." },
]

export function Differentials() {
  return (
    <section id="diferenciais" className="py-24 md:py-32 bg-[#f5f0e8]">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
            <div>
              <div className="section-label">Por que me escolher</div>
              <h2 className="font-serif text-3xl md:text-4xl text-foreground leading-tight">
                Diferenciais do<br />
                <em className="text-[#8c7642] not-italic">atendimento</em>
              </h2>
            </div>
            <p className="text-muted-foreground max-w-sm md:text-right leading-relaxed">
              Meu compromisso é oferecer um cuidado de excelência onde você é o centro de todo o processo.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            {items.map((item, i) => (
              <div key={i}
                className="flex gap-5 p-7 bg-card rounded-2xl border border-border hover:border-[#c4a05a]/30 hover:shadow-md transition-all duration-300 group">
                <div className="w-14 h-14 rounded-2xl bg-[#8c7642]/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#8c7642]/20 transition-colors border border-[#8c7642]/10">
                  <item.icon className="w-6 h-6 text-[#8c7642]" />
                </div>
                <div>
                  <h3 className="font-serif text-xl text-foreground mb-2">{item.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
