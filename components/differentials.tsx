import { Shield, Heart, Sparkles, Target } from "lucide-react"

const differentials = [
  {
    icon: Shield,
    title: "Atendimento Individualizado",
    description: "Cada sessao e 100% dedicada a voce, respeitando sua privacidade e necessidades especificas.",
  },
  {
    icon: Heart,
    title: "Ambiente Acolhedor",
    description: "Um espaco seguro e confortavel, pensado para que voce se sinta a vontade durante todo o tratamento.",
  },
  {
    icon: Sparkles,
    title: "Tecnicas Modernas",
    description: "Utilizacao de metodos e tecnologias baseados nas mais recentes evidencias cientificas.",
  },
  {
    icon: Target,
    title: "Foco em Resultado",
    description: "Compromisso com a sua melhora real e sustentavel, acompanhando cada etapa da sua evolucao.",
  },
]

export function Differentials() {
  return (
    <section id="diferenciais" className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <span className="text-primary text-sm tracking-widest uppercase mb-4 block">
              Por que me escolher
            </span>
            <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-4">
              Diferenciais do Atendimento
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Meu compromisso e oferecer um cuidado de excelencia, 
              onde voce e o centro de todo o processo.
            </p>
          </div>

          {/* Differentials Grid */}
          <div className="grid sm:grid-cols-2 gap-8">
            {differentials.map((item, index) => (
              <div
                key={index}
                className="flex gap-6 p-6 rounded-2xl bg-card border border-border hover:border-primary/30 transition-colors"
              >
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center flex-shrink-0">
                  <item.icon className="w-7 h-7 text-primary" />
                </div>
                <div>
                  <h3 className="font-serif text-xl text-foreground mb-2">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
