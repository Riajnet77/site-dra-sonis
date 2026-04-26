import Link from "next/link"
import { MapPin, Phone, Mail, Instagram, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"

const contactInfo = [
  {
    icon: Phone,
    label: "WhatsApp",
    value: "(67) 99200-6609",
    href: "https://wa.me/5567992006609?text=Olá,%20gostaria%20de%20agendar%20uma%20avaliação.",
  },
  {
    icon: Mail,
    label: "E-mail",
    value: "dra.sonispaz@gmail.com",
    href: "mailto:dra.sonispaz@gmail.com",
  },
  {
    icon: Instagram,
    label: "Instagram",
    value: "@drsonispaz",
    href: "https://www.instagram.com/drsonispaz",
  },
]

export function Contact() {
  return (
    <section id="contato" className="py-20 md:py-28 bg-card">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <span className="text-primary text-sm tracking-widest uppercase mb-4 block">
              Contato
            </span>
            <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-4">
              Entre em Contato
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Estou à disposição para esclarecer suas dúvidas e agendar sua consulta
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div>
              {/* Professional Info */}
              <div className="mb-8 p-6 bg-background rounded-xl border border-border">
                <h3 className="font-serif text-2xl text-foreground mb-1">
                  Dra. Sônis Paz
                </h3>
                <p className="text-muted-foreground mb-4">
                  Fisioterapeuta | CREFITO 436027-F
                </p>
                <div className="w-16 h-px bg-primary/30" />
              </div>

              {/* Contact Links */}
              <div className="space-y-4">
                {contactInfo.map((item, index) => (
                  <Link
                    key={index}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-4 bg-background rounded-xl border border-border hover:border-primary/30 hover:shadow-sm transition-all duration-200 group"
                  >
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                      <item.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-muted-foreground">{item.label}</p>
                      <p className="text-foreground font-medium">{item.value}</p>
                    </div>
                    <ExternalLink className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                ))}
              </div>

              {/* Location */}
              <div className="mt-6 p-6 bg-background rounded-xl border border-border">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground mb-1">Localização</h4>
                    <p className="text-muted-foreground mb-4">
                      Work Center<br />
                      Campo Grande - MS
                    </p>
                    <Button
                      asChild
                      variant="outline"
                      size="sm"
                      className="border-primary/30 hover:bg-primary/5"
                    >
                      <Link
                        href="https://www.google.com/maps/place/Work+Center/@-20.4630019,-54.5866776,17z/data=!3m1!4b1!4m6!3m5!1s0x9486e8c0b5c1d841:0x8e761a37fb38d9c7!8m2!3d-20.4630019!4d-54.5866776!16s%2Fg%2F11b7gp292_"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <MapPin className="w-4 h-4 mr-2" />
                        Ver rota no Google Maps
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Map */}
            <div className="relative">
              <div className="aspect-square lg:aspect-auto lg:h-full min-h-[420px] bg-secondary rounded-2xl overflow-hidden border border-border shadow-sm">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3737.3!2d-54.5888663!3d-20.4630019!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9486e8c0b5c1d841%3A0x8e761a37fb38d9c7!2sWork%20Center!5e0!3m2!1spt-BR!2sbr!4v1700000000000!5m2!1spt-BR!2sbr"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Localização Work Center - Campo Grande MS"
                  className="grayscale opacity-90 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
