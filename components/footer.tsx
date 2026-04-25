import Link from "next/link"
import { Instagram, Mail, Phone } from "lucide-react"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="py-12 bg-foreground text-background">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            {/* Logo & Info */}
            <div className="text-center md:text-left">
              <h3 className="font-serif text-xl mb-1">Dra. Sonis Paz</h3>
              <p className="text-background/60 text-sm">
                Fisioterapeuta | CREFITO 436027-F
              </p>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              <Link
                href="https://wa.me/5567992006609"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-background/20 transition-colors"
                aria-label="WhatsApp"
              >
                <Phone className="w-4 h-4" />
              </Link>
              <Link
                href="https://instagram.com/drasonispaz"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-background/20 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </Link>
              <Link
                href="mailto:dra.sonispaz@gmail.com"
                className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-background/20 transition-colors"
                aria-label="E-mail"
              >
                <Mail className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Divider */}
          <div className="my-8 h-px bg-background/10" />

          {/* Copyright */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-background/60">
            <p>
              &copy; {currentYear} Dra. Sonis Paz. Todos os direitos reservados.
            </p>
            <p>
              Fisioterapia Pelvica em Campo Grande - MS
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
