"use client"
import { useState } from "react"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"

const testimonials = [
  { text: "Voltei a ter controle e confiança. O tratamento mudou completamente minha qualidade de vida. Me sinto uma pessoa nova — consegui retomar atividades que havia abandonado há anos.", author: "M. S.", role: "Campo Grande - MS" },
  { text: "Minha rotina mudou completamente. A Dra. Sônis me acolheu de uma forma que me fez superar o constrangimento inicial. Recomendo para qualquer pessoa que esteja sofrendo em silêncio.", author: "J. P.", role: "Campo Grande - MS" },
  { text: "Após a cirurgia de próstata, achei que nunca voltaria ao normal. O tratamento me devolveu a esperança e os resultados superaram minhas expectativas. Gratidão enorme.", author: "R. A.", role: "Campo Grande - MS" },
  { text: "Atendimento humanizado e muito profissional. Me senti segura desde a primeira consulta. A Dra. Sônis tem um cuidado especial com cada paciente.", author: "L. F.", role: "Campo Grande - MS" },
]

export function Testimonials() {
  const [current, setCurrent] = useState(0)
  const next = () => setCurrent(p => (p + 1) % testimonials.length)
  const prev = () => setCurrent(p => (p - 1 + testimonials.length) % testimonials.length)

  return (
    <section id="depoimentos" className="py-24 md:py-32 bg-[#1c1810] relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#8c7642]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto">

          <div className="text-center mb-16">
            <div className="section-label justify-center">Depoimentos</div>
            <h2 className="font-serif text-3xl md:text-4xl text-white">
              O que dizem os pacientes
            </h2>
          </div>

          <div className="bg-white/4 rounded-2xl p-8 md:p-12 border border-white/8">
            <Quote className="w-10 h-10 text-[#c4a05a]/30 mb-8" />

            <blockquote className="font-serif text-xl md:text-2xl text-white/90 leading-relaxed mb-10 min-h-[100px]">
              &ldquo;{testimonials[current].text}&rdquo;
            </blockquote>

            <div className="flex items-center justify-between border-t border-white/8 pt-6">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-[#8c7642]/20 border border-[#c4a05a]/20 flex items-center justify-center">
                  <span className="font-serif text-[#c4a05a] text-sm">{testimonials[current].author.charAt(0)}</span>
                </div>
                <div>
                  <p className="text-white font-medium">{testimonials[current].author}</p>
                  <p className="text-white/40 text-sm">{testimonials[current].role}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button onClick={prev}
                  className="w-10 h-10 rounded-full border border-white/15 text-white/60 hover:border-[#c4a05a]/50 hover:text-[#c4a05a] transition-all flex items-center justify-center"
                  aria-label="Anterior">
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button onClick={next}
                  className="w-10 h-10 rounded-full border border-white/15 text-white/60 hover:border-[#c4a05a]/50 hover:text-[#c4a05a] transition-all flex items-center justify-center"
                  aria-label="Próximo">
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-6">
            {testimonials.map((_, i) => (
              <button key={i} onClick={() => setCurrent(i)}
                className={`h-1.5 rounded-full transition-all duration-300 ${i === current ? "bg-[#c4a05a] w-6" : "bg-white/20 w-1.5"}`} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
