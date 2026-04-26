"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"

const navLinks = [
  { href: "#sobre", label: "Sobre" },
  { href: "#especialidades", label: "Especialidades" },
  { href: "#diferenciais", label: "Diferenciais" },
  { href: "#depoimentos", label: "Depoimentos" },
  { href: "#contato", label: "Contato" },
]

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 60)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      isScrolled
        ? "bg-[#1c1810]/95 backdrop-blur-md shadow-lg"
        : "bg-transparent"
    }`}>
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-20">

          {/* Logo */}
          <Link href="/" className="flex flex-col group">
            <span className="font-serif text-xl text-white tracking-wide group-hover:text-[#c4a05a] transition-colors duration-300">
              Dra. Sônis Paz
            </span>
            <span className="text-[9px] text-white/40 tracking-[0.25em] uppercase">
              Fisioterapeuta Pélvica
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}
                className="text-sm text-white/70 hover:text-white transition-colors tracking-wide relative group">
                {link.label}
                <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-[#c4a05a] group-hover:w-full transition-all duration-300" />
              </Link>
            ))}
            <Button asChild
              className="bg-[#8c7642] hover:bg-[#7a6538] text-white text-sm px-5 py-2 h-9 border-0 shadow-none">
              <Link href="/agendar">
                <Calendar className="w-4 h-4 mr-1.5" />
                Agendar
              </Link>
            </Button>
          </nav>

          {/* Mobile toggle */}
          <button onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 text-white/80 hover:text-white transition-colors"
            aria-label={isOpen ? "Fechar menu" : "Abrir menu"}>
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile nav */}
        {isOpen && (
          <nav className="lg:hidden py-6 border-t border-white/10">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-white/70 hover:text-white transition-colors py-1 text-base">
                  {link.label}
                </Link>
              ))}
              <Button asChild className="mt-2 bg-[#8c7642] hover:bg-[#7a6538] text-white border-0">
                <Link href="/agendar" onClick={() => setIsOpen(false)}>
                  <Calendar className="w-4 h-4 mr-2" />
                  Agendar Online
                </Link>
              </Button>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}
