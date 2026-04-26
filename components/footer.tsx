import Link from "next/link"
import { Instagram, Mail, Phone } from "lucide-react"

const navLinks = [
  { href: "#sobre", label: "Sobre" },
  { href: "#especialidades", label: "Especialidades" },
  { href: "#diferenciais", label: "Diferenciais" },
  { href: "#depoimentos", label: "Depoimentos" },
  { href: "#contato", label: "Contato" },
]

export function Footer() {
  return (
    <footer className="bg-[#141008] py-16">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-10 mb-12 pb-12 border-b border-white/8">

            {/* Marca */}
            <div>
              <h3 className="font-serif text-xl text-white mb-1">Dra. Sônis Paz</h3>
              <p className="text-white/30 text-xs tracking-widest uppercase mb-4">Fisioterapeuta Pélvica</p>
              <div className="w-8 h-px bg-[#c4a05a]/40 mb-4" />
              <p className="text-white/40 text-sm leading-relaxed">
                Atendimento humanizado e discreto para homens e mulheres em Campo Grande - MS.
              </p>
            </div>

            {/* Links */}
            <div>
              <h4 className="text-white/40 text-xs tracking-widest uppercase mb-5">Navegação</h4>
              <nav className="flex flex-col gap-3">
                {navLinks.map((link) => (
                  <Link key={link.href} href={link.href}
                    className="text-white/50 hover:text-white transition-colors text-sm">
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Contato */}
            <div>
              <h4 className="text-white/40 text-xs tracking-widest uppercase mb-5">Contato</h4>
              <div className="flex flex-col gap-3">
                {[
                  { icon: Phone, label: "(67) 99200-6609", href: "https://wa.me/5567992006609" },
                  { icon: Instagram, label: "@drsonispaz", href: "https://www.instagram.com/drsonispaz" },
                  { icon: Mail, label: "dra.sonispaz@gmail.com", href: "mailto:dra.sonispaz@gmail.com" },
                ].map((item, i) => (
                  <Link key={i} href={item.href} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-3 text-white/50 hover:text-white transition-colors text-sm group">
                    <item.icon className="w-4 h-4 text-[#c4a05a]/60 group-hover:text-[#c4a05a] transition-colors flex-shrink-0" />
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/25">
            <p>&copy; {new Date().getFullYear()} Dra. Sônis Paz. Todos os direitos reservados.</p>
            <p>CREFITO 436027-F · Campo Grande - MS</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
