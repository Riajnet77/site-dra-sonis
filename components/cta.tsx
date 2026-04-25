import Link from "next/link"
import { MessageCircle, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"

export function CTA() {
  return (
    <section className="py-20 md:py-28 bg-gradient-to-br from-primary/10 via-primary/5 to-background">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground mb-6 text-balance">
            Sua qualidade de vida pode melhorar.{" "}
            <span className="text-primary">Comece hoje.</span>
          </h2>
          <p className="text-lg text-muted-foreground mb-10 max-w-xl mx-auto">
            De o primeiro passo para recuperar o controle do seu corpo. 
            Agende sua avaliacao e descubra como posso ajudar.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              asChild
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-base"
            >
              <Link href="https://wa.me/5567992006609" target="_blank" rel="noopener noreferrer">
                <MessageCircle className="w-5 h-5 mr-2" />
                Agendar pelo WhatsApp
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-primary/30 text-foreground hover:bg-card px-8 py-6 text-base"
            >
              <Link href="#contato">
                <Calendar className="w-5 h-5 mr-2" />
                Ver Informacoes
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
