import { Droplets, Activity, Heart, AlertCircle, Stethoscope } from "lucide-react"

const problems = [
  {
    icon: Droplets,
    text: "Urgencia para urinar",
  },
  {
    icon: AlertCircle,
    text: "Perda urinaria involuntaria",
  },
  {
    icon: Activity,
    text: "Dor pelvica persistente",
  },
  {
    icon: Heart,
    text: "Dificuldade intestinal",
  },
  {
    icon: Stethoscope,
    text: "Impactos apos cirurgia de prostata",
  },
]

export function Problems() {
  return (
    <section className="py-20 md:py-28 bg-card">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-4">
              Voce sente...?
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Muitas pessoas convivem com esses sintomas em silencio. 
              Saiba que existe tratamento e solucao.
            </p>
          </div>

          {/* Problems Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
            {problems.map((problem, index) => (
              <div
                key={index}
                className="flex items-center gap-4 p-5 bg-secondary/50 rounded-xl hover:bg-secondary transition-colors"
              >
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <problem.icon className="w-5 h-5 text-primary" />
                </div>
                <span className="text-foreground">{problem.text}</span>
              </div>
            ))}
          </div>

          {/* Empathy Message */}
          <div className="text-center p-8 bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 rounded-2xl">
            <p className="font-serif text-xl md:text-2xl text-foreground mb-2">
              Voce nao esta sozinho(a).
            </p>
            <p className="text-primary font-medium">
              Existe tratamento e solucao para recuperar sua qualidade de vida.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
