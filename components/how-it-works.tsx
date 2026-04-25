const steps = [
  {
    number: "01",
    title: "Avaliacao",
    description: "Conversa inicial para entender suas necessidades e historico de saude.",
  },
  {
    number: "02",
    title: "Diagnostico Funcional",
    description: "Avaliacao completa para identificar a causa dos sintomas.",
  },
  {
    number: "03",
    title: "Plano Personalizado",
    description: "Criacao de um protocolo de tratamento unico para voce.",
  },
  {
    number: "04",
    title: "Acompanhamento",
    description: "Sessoes regulares com monitoramento da sua evolucao.",
  },
]

export function HowItWorks() {
  return (
    <section className="py-20 md:py-28 bg-background floral-bg">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <span className="text-primary text-sm tracking-widest uppercase mb-4 block">
              Jornada de Cuidado
            </span>
            <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-4">
              Como Funciona
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Um processo simples e acolhedor, pensado para sua comodidade
            </p>
          </div>

          {/* Steps */}
          <div className="grid md:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="relative text-center">
                {/* Connector Line */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-[60%] w-[80%] h-px bg-gradient-to-r from-primary/30 to-transparent" />
                )}
                
                {/* Step Number */}
                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="font-serif text-xl text-primary">{step.number}</span>
                </div>
                
                {/* Content */}
                <h3 className="font-serif text-xl text-foreground mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
