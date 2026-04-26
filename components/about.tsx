import Image from "next/image"
import { CheckCircle2 } from "lucide-react"

const benefits = [
  "Controle urinário e intestinal",
  "Redução da dor pélvica crônica",
  "Recuperação pós-cirúrgica completa",
  "Melhora da qualidade de vida",
  "Autoestima e bem-estar integral",
]

const stats = [
  { value: "10+", label: "Anos de experiência" },
  { value: "500+", label: "Pacientes atendidos" },
  { value: "6", label: "Especialidades" },
]

export function About() {
  return (
    <section id="sobre" className="py-24 md:py-32 bg-[#f5f0e8] texture-bg overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">

            {/* Foto */}
            <div className="relative">
              {/* Moldura decorativa */}
              <div className="absolute -top-4 -left-4 w-full h-full border border-[#c4a05a]/30 rounded-2xl" />

              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/dra-sonis-sobre.jpg"
                  alt="Dra. Sônis Paz — Fisioterapeuta Pélvica"
                  fill
                  className="object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1c1810]/50 via-transparent to-transparent" />

                {/* Badge flutuante */}
                <div className="absolute bottom-6 left-6 right-6 bg-[#1c1810]/90 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                  <p className="font-serif text-lg text-white mb-0.5">Dra. Sônis Paz</p>
                  <p className="text-white/50 text-xs tracking-wide">Fisioterapeuta Pélvica · CREFITO 436027-F</p>
                </div>
              </div>

              {/* Stats flutuantes */}
              <div className="absolute -right-6 top-1/3 flex flex-col gap-3">
                {stats.map((stat, i) => (
                  <div key={i} className="bg-card rounded-xl px-4 py-3 shadow-xl border border-border text-center min-w-[100px]">
                    <p className="font-serif text-2xl text-[#8c7642] leading-none">{stat.value}</p>
                    <p className="text-[10px] text-muted-foreground mt-0.5 leading-tight">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Conteúdo */}
            <div className="lg:pl-8">
              <div className="section-label">Sobre a Fisioterapia Pélvica</div>

              <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-6 leading-tight">
                Um cuidado especializado,<br />
                <em className="text-[#8c7642] not-italic">personalizado para você</em>
              </h2>

              <div className="space-y-4 text-muted-foreground leading-relaxed mb-8">
                <p>
                  A fisioterapia pélvica atua na reabilitação e fortalecimento do
                  assoalho pélvico — um conjunto de músculos responsável por sustentar
                  a bexiga, o intestino e os órgãos reprodutores.
                </p>
                <p>
                  Com técnicas modernas e baseadas em evidências científicas, o
                  tratamento é conduzido com total respeito, discrição e atenção
                  individual — sem julgamentos, em um ambiente seguro e acolhedor.
                </p>
              </div>

              <div className="space-y-3 mb-8">
                {benefits.map((benefit, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#8c7642] flex-shrink-0" />
                    <span className="text-foreground">{benefit}</span>
                  </div>
                ))}
              </div>

              {/* Assinatura */}
              <div className="flex items-center gap-4 pt-6 border-t border-border">
                <div className="w-12 h-12 rounded-full bg-[#8c7642]/10 flex items-center justify-center border border-[#8c7642]/20 flex-shrink-0">
                  <span className="font-serif text-[#8c7642] text-lg">SP</span>
                </div>
                <div>
                  <p className="font-serif text-foreground">Dra. Sônis Paz</p>
                  <p className="text-xs text-muted-foreground tracking-wide">Fisioterapeuta Pélvica</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
