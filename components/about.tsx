import { CheckCircle2 } from "lucide-react"

const benefits = [
  "Controle urinario e intestinal",
  "Reducao da dor pelvica",
  "Recuperacao pos-cirurgica",
  "Melhora da qualidade de vida",
]

export function About() {
  return (
    <section id="sobre" className="py-20 md:py-28 bg-background floral-bg">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Content */}
            <div>
              <span className="text-primary text-sm tracking-widest uppercase mb-4 block">
                Sobre a Fisioterapia Pelvica
              </span>
              <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-6">
                O que e a Fisioterapia Pelvica?
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  A fisioterapia pelvica atua na reabilitacao e fortalecimento do 
                  assoalho pelvico, um conjunto de musculos responsavel por sustentar 
                  a bexiga, o intestino e os orgaos reprodutores.
                </p>
                <p>
                  Com tecnicas especializadas e baseadas em evidencias cientificas, 
                  o tratamento e feito de forma acolhedora, respeitosa e totalmente 
                  personalizado para cada paciente.
                </p>
              </div>

              {/* Benefits */}
              <div className="mt-8 space-y-3">
                <h3 className="font-medium text-foreground mb-4">Beneficios do tratamento:</h3>
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-foreground">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Visual Element */}
            <div className="relative">
              <div className="aspect-[4/5] bg-gradient-to-br from-secondary via-secondary to-primary/10 rounded-2xl overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center p-8">
                    <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
                      <svg
                        className="w-12 h-12 text-primary"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                        />
                      </svg>
                    </div>
                    <p className="font-serif text-2xl text-foreground mb-2">
                      Cuidado que transforma
                    </p>
                    <p className="text-muted-foreground">
                      Cada paciente e unico, assim como seu tratamento
                    </p>
                  </div>
                </div>
              </div>
              {/* Decorative */}
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-primary/10 rounded-full blur-2xl" />
              <div className="absolute -top-4 -left-4 w-32 h-32 bg-primary/5 rounded-full blur-3xl" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
