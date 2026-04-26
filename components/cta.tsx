import Link from "next/link"
import Image from "next/image"
import { Calendar, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

export function CTA() {
  return (
    <section className="relative py-28 md:py-40 overflow-hidden bg-[#1c1810]">
      {/* Foto de fundo */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/dra-sonis-especialidades.png"
          alt="Dra. Sônis Paz"
          fill
          className="object-cover object-center opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1c1810] via-[#1c1810]/90 to-[#1c1810]/70" />
      </div>

      {/* Luz dourada decorativa */}
      <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-[#8c7642]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-2xl">
          <div className="section-label">Dê o primeiro passo</div>
          <h2 className="font-serif text-3xl md:text-5xl text-white mb-6 leading-tight">
            Sua qualidade de vida<br />
            pode melhorar.{" "}
            <em className="text-[#c4a05a] not-italic">Comece hoje.</em>
          </h2>
          <div className="w-12 h-px bg-[#c4a05a] mb-6" />
          <p className="text-white/60 text-lg mb-10 max-w-xl leading-relaxed">
            Agende sua avaliação e descubra como posso ajudar você a recuperar
            o controle do seu corpo com segurança e total discrição.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button asChild size="lg"
              className="bg-[#8c7642] hover:bg-[#7a6538] text-white px-8 py-6 text-base border-0 shadow-xl">
              <Link href="/agendar">
                <Calendar className="w-5 h-5 mr-2" />
                Agendar Consulta Online
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg"
              className="border-white/20 text-white bg-white/8 hover:bg-white/15 px-8 py-6 text-base backdrop-blur-sm">
              <Link href="https://wa.me/5567992006609?text=Olá,%20gostaria%20de%20agendar%20uma%20avaliação." target="_blank" rel="noopener noreferrer">
                <MessageCircle className="w-5 h-5 mr-2" />
                Pelo WhatsApp
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
