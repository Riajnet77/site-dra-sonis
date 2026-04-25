"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"
import { Button } from "@/components/ui/button"

const testimonials = [
  {
    text: "Voltei a ter controle e confianca. O tratamento mudou completamente minha qualidade de vida. Me sinto uma pessoa nova.",
    author: "M.S.",
    role: "Paciente",
  },
  {
    text: "Minha rotina mudou completamente. A Dra. Sonis me acolheu de uma forma que me fez superar o constrangimento inicial. Recomendo muito.",
    author: "J.P.",
    role: "Paciente",
  },
  {
    text: "Apos a cirurgia de prostata, achei que nunca voltaria ao normal. O tratamento me devolveu a esperanca e os resultados.",
    author: "R.A.",
    role: "Paciente",
  },
  {
    text: "Atendimento humanizado e muito profissional. Me senti segura e acolhida desde a primeira consulta.",
    author: "L.F.",
    role: "Paciente",
  },
]

export function Testimonials() {
  const [current, setCurrent] = useState(0)

  const next = () => {
    setCurrent((prev) => (prev + 1) % testimonials.length)
  }

  const prev = () => {
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section id="depoimentos" className="py-20 md:py-28 bg-card">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <span className="text-primary text-sm tracking-widest uppercase mb-4 block">
              Depoimentos
            </span>
            <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-4">
              O que dizem os pacientes
            </h2>
            <p className="text-muted-foreground">
              Historias reais de pessoas que transformaram suas vidas
            </p>
          </div>

          {/* Testimonial Carousel */}
          <div className="relative">
            <div className="bg-background rounded-2xl p-8 md:p-12 border border-border">
              <Quote className="w-12 h-12 text-primary/20 mb-6" />
              
              <blockquote className="font-serif text-xl md:text-2xl text-foreground leading-relaxed mb-8">
                {`"${testimonials[current].text}"`}
              </blockquote>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-foreground">
                    {testimonials[current].author}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {testimonials[current].role}
                  </p>
                </div>

                {/* Navigation */}
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={prev}
                    className="w-10 h-10 rounded-full border-border hover:border-primary hover:bg-primary/5"
                    aria-label="Depoimento anterior"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={next}
                    className="w-10 h-10 rounded-full border-border hover:border-primary hover:bg-primary/5"
                    aria-label="Proximo depoimento"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Dots */}
            <div className="flex items-center justify-center gap-2 mt-6">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrent(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === current
                      ? "bg-primary w-6"
                      : "bg-primary/30 hover:bg-primary/50"
                  }`}
                  aria-label={`Ir para depoimento ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
