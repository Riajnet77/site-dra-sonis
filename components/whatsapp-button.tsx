"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { MessageCircle, X } from "lucide-react"

export function WhatsAppButton() {
  const [isVisible, setIsVisible] = useState(false)
  const [showTooltip, setShowTooltip] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 2000)

    const tooltipTimer = setTimeout(() => {
      setShowTooltip(true)
    }, 5000)

    return () => {
      clearTimeout(timer)
      clearTimeout(tooltipTimer)
    }
  }, [])

  if (!isVisible) return null

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* Tooltip */}
      {showTooltip && (
        <div className="relative bg-card rounded-xl shadow-lg border border-border p-4 max-w-[250px] animate-fade-in-up">
          <button
            onClick={() => setShowTooltip(false)}
            className="absolute -top-2 -right-2 w-6 h-6 bg-muted rounded-full flex items-center justify-center hover:bg-muted-foreground/20 transition-colors"
            aria-label="Fechar"
          >
            <X className="w-3 h-3 text-muted-foreground" />
          </button>
          <p className="text-sm text-foreground">
            Ola! Posso ajudar a agendar sua consulta?
          </p>
        </div>
      )}

      {/* Button */}
      <Link
        href="https://wa.me/5567992006609?text=Ol%C3%A1%2C%20gostaria%20de%20agendar%20uma%20consulta."
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-center justify-center w-14 h-14 bg-[#25D366] rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
        aria-label="Conversar pelo WhatsApp"
      >
        <MessageCircle className="w-6 h-6 text-white" />
        
        {/* Pulse effect */}
        <span className="absolute w-14 h-14 rounded-full bg-[#25D366] animate-ping opacity-25" />
      </Link>
    </div>
  )
}
