const steps = [
  { number: "01", title: "Avaliação", description: "Conversa inicial para entender suas necessidades, histórico de saúde e expectativas." },
  { number: "02", title: "Diagnóstico Funcional", description: "Avaliação completa para identificar a causa dos sintomas e traçar o melhor caminho." },
  { number: "03", title: "Plano Personalizado", description: "Protocolo de tratamento único, feito exclusivamente para você e seus objetivos." },
  { number: "04", title: "Acompanhamento", description: "Sessões regulares com monitoramento contínuo da sua evolução e resultados." },
]

export function HowItWorks() {
  return (
    <section className="py-24 md:py-32 bg-card texture-bg">
      <div className="container mx-auto px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <div className="section-label justify-center">Jornada de Cuidado</div>
            <h2 className="font-serif text-3xl md:text-4xl text-foreground">Como Funciona</h2>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {steps.map((step, i) => (
              <div key={i} className="relative text-center group">
                {i < steps.length - 1 && (
                  <div className="hidden md:block absolute top-7 left-[55%] w-[90%] h-px bg-gradient-to-r from-[#c4a05a]/30 to-transparent" />
                )}
                <div className="w-14 h-14 mx-auto mb-5 rounded-full bg-[#1c1810] flex items-center justify-center border border-[#8c7642]/30 group-hover:border-[#c4a05a]/60 transition-colors">
                  <span className="font-serif text-[#c4a05a] text-base">{step.number}</span>
                </div>
                <h3 className="font-serif text-lg text-foreground mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
