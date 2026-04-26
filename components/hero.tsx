import Link from "next/link"
import Image from "next/image"
import { Calendar, MapPin, Star } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[#1c1810]">

      {/* Foto da Dra. Sônis — lado direito */}
      <div className="absolute inset-y-0 right-0 w-full lg:w-[58%] z-0">
        <Image
          src="/dra-sonis-hero.jpg"
          alt="Dra. Sônis Paz — Fisioterapeuta Pélvica"
          fill
          className="object-cover object-top"
          priority
        />
        {/* Gradiente da esquerda — para o texto ser legível */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#1c1810] via-[#1c1810]/80 to-transparent" />
        {/* Gradiente inferior */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1c1810]/60 via-transparent to-transparent" />
      </div>

      {/* Conteúdo — lado esquerdo */}
      <div className="relative z-10 container mx-auto px-6 pt-24 pb-16">
        <div className="max-w-xl">

          {/* Label */}
          <div className="section-label animate-fade-up">
            Fisioterapia Pélvica · Campo Grande - MS
          </div>

          {/* Título */}
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white leading-[1.1] mb-6 animate-fade-up delay-100">
            Recupere o controle<br />
            do seu corpo com<br />
            <em className="text-[#c4a05a] not-italic">segurança</em> e{" "}
            <em className="text-[#c4a05a] not-italic">discrição</em>
          </h1>

          {/* Linha decorativa */}
          <div className="w-12 h-px bg-[#c4a05a] mb-6 animate-fade-up delay-200" />

          {/* Subtítulo */}
          <p className="text-white/70 text-lg leading-relaxed mb-10 animate-fade-up delay-200">
            Atendimento especializado em fisioterapia pélvica, dor e
            reabilitação para homens e mulheres. Um espaço acolhedor
            para cuidar da sua saúde íntima.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 mb-12 animate-fade-up delay-300">
            <Button asChild size="lg"
              className="bg-[#8c7642] hover:bg-[#7a6538] text-white px-8 py-6 text-base font-medium tracking-wide shadow-xl border-0">
              <Link href="/agendar">
                <Calendar className="w-5 h-5 mr-2" />
                Agendar Avaliação
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg"
              className="border-white/25 text-white bg-white/8 hover:bg-white/15 px-8 py-6 text-base backdrop-blur-sm">
              <Link href="https://www.google.com/maps/place/Work+Center/@-20.4630019,-54.5866776,17z" target="_blank" rel="noopener noreferrer">
                <MapPin className="w-5 h-5 mr-2" />
                Ver Localização
              </Link>
            </Button>
          </div>

          {/* Credenciais */}
          <div className="flex flex-wrap items-center gap-6 animate-fade-up delay-400">
            <div className="flex items-center gap-1.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-[#c4a05a] text-[#c4a05a]" />
              ))}
              <span className="text-white/50 text-sm ml-1">Pacientes satisfeitos</span>
            </div>
            <div className="h-4 w-px bg-white/15 hidden sm:block" />
            <span className="text-white/40 text-sm">CREFITO 436027-F</span>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2">
        <span className="text-white/30 text-xs tracking-widest uppercase">Scroll</span>
        <div className="w-px h-10 bg-gradient-to-b from-white/30 to-transparent animate-pulse" />
      </div>
    </section>
  )
}
