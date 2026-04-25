import { 
  Activity, 
  Zap, 
  Sun, 
  Ear, 
  Home,
  Sparkles
} from "lucide-react"

const services = [
  {
    icon: Activity,
    title: "Reabilitacao Pelvica",
    description: "Tratamento especializado para fortalecimento do assoalho pelvico",
  },
  {
    icon: Zap,
    title: "Alivio de Dor",
    description: "Tecnicas avancadas para tratamento de dor pelvica cronica",
  },
  {
    icon: Sparkles,
    title: "Acupuntura",
    description: "Tratamento complementar para equilibrio e bem-estar",
  },
  {
    icon: Ear,
    title: "Auriculoterapia",
    description: "Estimulacao de pontos auriculares para tratamento integrado",
  },
  {
    icon: Sun,
    title: "Laser Terapia",
    description: "Tecnologia avancada para aceleracao da recuperacao",
  },
  {
    icon: Home,
    title: "Home Care",
    description: "Atendimento domiciliar para maior conforto e comodidade",
  },
]

const forMen = [
  "Pos cirurgia de prostata",
  "Controle urinario",
  "Disfuncoes pelvicas",
]

const forWomen = [
  "Incontinencia urinaria",
  "Pos-parto",
  "Dor pelvica cronica",
  "Constipacao",
]

export function Specialties() {
  return (
    <section id="especialidades" className="py-20 md:py-28 bg-card">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <span className="text-primary text-sm tracking-widest uppercase mb-4 block">
              Especialidades
            </span>
            <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-4">
              Tratamentos Especializados
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Ofereco uma variedade de tratamentos modernos e baseados em evidencias 
              cientificas para cuidar da sua saude pelvica.
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {services.map((service, index) => (
              <div
                key={index}
                className="group p-6 bg-background rounded-xl border border-border hover:border-primary/30 hover:shadow-lg transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <service.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-serif text-xl text-foreground mb-2">
                  {service.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {service.description}
                </p>
              </div>
            ))}
          </div>

          {/* For Men & Women */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* For Men */}
            <div className="p-8 bg-background rounded-2xl border border-border">
              <div className="flex items-center gap-3 mb-6">
                <span className="text-2xl">&#x1F468;</span>
                <h3 className="font-serif text-2xl text-foreground">Para Homens</h3>
              </div>
              <ul className="space-y-3">
                {forMen.map((item, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                    <span className="text-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* For Women */}
            <div className="p-8 bg-background rounded-2xl border border-border">
              <div className="flex items-center gap-3 mb-6">
                <span className="text-2xl">&#x1F469;</span>
                <h3 className="font-serif text-2xl text-foreground">Para Mulheres</h3>
              </div>
              <ul className="space-y-3">
                {forWomen.map((item, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                    <span className="text-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
