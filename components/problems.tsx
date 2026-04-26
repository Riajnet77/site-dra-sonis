import Link from "next/link"
import { Droplets, Activity, Heart, AlertCircle, Stethoscope, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

const problems = [
  { icon: Droplets, text: "Urgência para urinar" },
  { icon: AlertCircle, text: "Perda urinária involuntária" },
  { icon: Activity, text: "Dor pélvica persistente" },
  { icon: Heart, text: "Dificuldade intestinal" },
  { icon: Stethoscope, text: "Impactos após cirurgia de próstata" },
]

export function Problems() {
  return (
    <section className="py-24 md:py-32 bg-[#1c1810] relative overflow-hidden">
      {/* Textura sutil */}
      <div className="absolute inset-0 opacity-5"
        style={{ backgroundImage: "radial-gradient(circle at 20% 50%, #c4a05a 0%, transparent 50%), radial-gradient(circle at 80% 20%, #8c7642 0%, transparent 40%)" }} />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto">

          <div className="text-center mb-16">
            <div className="section-label justify-center">Você reconhece isso?</div>
            <h2 className="font-serif text-3xl md:text-4xl text-white mb-4">
              Você sente...?
            </h2>
            <p className="text-white/50 max-w-xl mx-auto">
              Muitas pessoas convivem com esses sintomas em silêncio por anos.
              Não precisa ser assim — existe tratamento eficaz.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-14">
            {problems.map((problem, i) => (
              <div key={i}
                className="flex items-center gap-4 p-5 bg-white/5 border border-white/8 rounded-xl hover:bg-white/10 hover:border-[#c4a05a]/30 transition-all duration-300 group">
                <div className="w-11 h-11 rounded-full bg-[#8c7642]/20 flex items-center justify-center flex-shrink-0 group-hover:bg-[#8c7642]/30 transition-colors">
                  <problem.icon className="w-5 h-5 text-[#c4a05a]" />
                </div>
                <span className="text-white/80 font-medium">{problem.text}</span>
              </div>
            ))}
          </div>

          <div className="text-center p-10 bg-white/4 rounded-2xl border border-white/8">
            <p className="font-serif text-2xl md:text-3xl text-white mb-2">
              Você não está sozinho(a).
            </p>
            <div className="w-8 h-px bg-[#c4a05a] mx-auto my-4" />
            <p className="text-[#c4a05a] mb-8 max-w-md mx-auto">
              Existe tratamento e solução para recuperar sua qualidade de vida com segurança e discrição.
            </p>
            <Button asChild className="bg-[#8c7642] hover:bg-[#7a6538] text-white border-0 px-8 py-6 text-base shadow-xl">
              <Link href="https://wa.me/5567992006609?text=Olá,%20gostaria%20de%20saber%20mais%20sobre%20o%20tratamento." target="_blank" rel="noopener noreferrer">
                <MessageCircle className="w-4 h-4 mr-2" />
                Quero saber mais
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
