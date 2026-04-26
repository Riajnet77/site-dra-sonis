"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Lock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "sonis2024"

export default function AdminLogin() {
  const [password, setPassword] = useState("")
  const [error, setError] = useState(false)
  const router = useRouter()

  const handleLogin = () => {
    if (password === ADMIN_PASSWORD) {
      sessionStorage.setItem("admin_auth", "true")
      router.push("/admin/dashboard")
    } else {
      setError(true)
      setTimeout(() => setError(false), 2000)
    }
  }

  return (
    <div className="min-h-screen bg-[#1c1810] flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-10">
          <div className="w-16 h-16 rounded-full bg-[#8c7642]/20 border border-[#8c7642]/30 flex items-center justify-center mx-auto mb-4">
            <Lock className="w-6 h-6 text-[#c4a05a]" />
          </div>
          <h1 className="font-serif text-2xl text-white mb-1">Painel Admin</h1>
          <p className="text-white/40 text-sm">Dra. Sônis Paz</p>
        </div>

        {/* Form */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
          <div className="space-y-4">
            <div>
              <label className="text-white/60 text-sm mb-2 block">Senha</label>
              <Input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                onKeyDown={e => e.key === "Enter" && handleLogin()}
                placeholder="Digite a senha"
                className={`bg-white/8 border-white/15 text-white placeholder:text-white/30 focus:border-[#c4a05a]/50 ${error ? "border-red-500/50" : ""}`}
              />
              {error && <p className="text-red-400 text-xs mt-1">Senha incorreta</p>}
            </div>
            <Button
              onClick={handleLogin}
              className="w-full bg-[#8c7642] hover:bg-[#7a6538] text-white border-0 py-5"
            >
              Entrar
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
