import Image from "next/image"
import { Activity, Zap, Sun, Ear, Home, Sparkles } from "lucide-react"

const services = [
  { icon: Activity, title: "Reabilitação Pélvica", description: "Fortalecimento e reabilitação especializada do assoalho pélvico." },
  { icon: Zap, title: "Alívio de Dor", description: "Técnicas avançadas para dor pélvica crônica e aguda." },
  { icon: Sparkles, title: "Acupuntura", description: "Equilíbrio, alívio da dor e bem-estar através de pontos específicos." },
  { icon: Ear, title: "Auriculoterapia", description: "Estimulação auricular para tratamento integrado e eficaz." },
  { icon: Sun, title: "Laser Terapia", description: "Tecnologia avançada para recuperação e redução da inflamação." },
  { icon: Home, title: "Home Care", description: "Atendimento domiciliar para maior conforto e comodidade." },
]

const forMen = ["Pós cirurgia de próstata", "Controle urinário", "Disfunções pélvicas"]
const forWomen = ["Incontinência urinária", "Pós-parto", "Dor pélvica crônica", "Constipação intestinal"]

export function Specialties() {
  return (
    <section id="especialidades" className="py-24 md:py-32 bg-card texture-bg overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">

          <div className="grid lg:grid-cols-2 gap-16 items-start mb-20">
            <div>
              <div className="section-label">Especialidades</div>
              <h2 className="font-serif text-3xl md:text-4xl text-foreground leading-tight">
                Tratamentos modernos<br />
                <em className="text-[#8c7642] not-italic">baseados em evidências</em>
              </h2>
            </div>
            <div className="lg:pt-14">
              <p className="text-muted-foreground leading-relaxed">
                Ofereço uma variedade de tratamentos especializados para cuidar
                da sua saúde pélvica de forma integral, com técnicas de última geração
                e atenção individualizada.
              </p>
            </div>
          </div>

          {/* Grid de serviços */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {services.map((service, i) => (
              <div key={i}
                className="group p-6 bg-background rounded-2xl border border-border hover:border-[#c4a05a]/40 hover:shadow-lg transition-all duration-300">
                <div className="w-12 h-12 rounded-xl bg-[#8c7642]/10 flex items-center justify-center mb-5 group-hover:bg-[#8c7642]/20 transition-colors">
                  <service.icon className="w-5 h-5 text-[#8c7642]" />
                </div>
                <h3 className="font-serif text-xl text-foreground mb-2">{service.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{service.description}</p>
              </div>
            ))}
          </div>

          {/* Homens / Mulheres */}
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { emoji: "👨", title: "Para Homens", items: forMen, bg: "bg-[#1c1810]" },
              { emoji: "👩", title: "Para Mulheres", items: forWomen, bg: "bg-[#1c1810]" },
            ].map((group, i) => (
              <div key={i} className={`${group.bg} rounded-2xl p-8`}>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-white/8 flex items-center justify-center text-xl">
                    {group.emoji}
                  </div>
                  <h3 className="font-serif text-2xl text-white">{group.title}</h3>
                </div>
                <ul className="space-y-3">
                  {group.items.map((item, j) => (
                    <li key={j} className="flex items-center gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#c4a05a] flex-shrink-0" />
                      <span className="text-white/70">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
