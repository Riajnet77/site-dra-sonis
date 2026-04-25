import Link from "next/link"
import { MapPin, Phone, Mail, Instagram, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"

const contactInfo = [
  {
    icon: Phone,
    label: "WhatsApp",
    value: "(67) 99200-6609",
    href: "https://wa.me/5567992006609",
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
    value: "@drasonispaz",
    href: "https://instagram.com/drasonispaz",
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
              Estou a disposicao para esclarecer suas duvidas e agendar sua consulta
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div>
              {/* Professional Info */}
              <div className="mb-8 p-6 bg-background rounded-xl border border-border">
                <h3 className="font-serif text-2xl text-foreground mb-2">
                  Dra. Sonis Paz
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
                    className="flex items-center gap-4 p-4 bg-background rounded-xl border border-border hover:border-primary/30 transition-colors group"
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
              <div className="mt-8 p-6 bg-background rounded-xl border border-border">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground mb-1">Localizacao</h4>
                    <p className="text-muted-foreground mb-4">
                      Work Center<br />
                      Campo Grande - MS
                    </p>
                    <Button
                      asChild
                      variant="outline"
                      className="border-primary/30 hover:bg-primary/5"
                    >
                      <Link
                        href="https://www.google.com/maps/place/Work+Center/@-20.4630019,-54.5866776,17z"
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
              <div className="aspect-square lg:aspect-auto lg:h-full min-h-[400px] bg-secondary rounded-2xl overflow-hidden border border-border">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3737.123456789!2d-54.5866776!3d-20.4630019!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9486e8c0b5c1d841%3A0x8e761a37fb38d9c7!2sWork%20Center!5e0!3m2!1spt-BR!2sbr!4v1234567890"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Localizacao Work Center"
                  className="grayscale opacity-90 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
