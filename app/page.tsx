import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { Problems } from "@/components/problems"
import { About } from "@/components/about"
import { Specialties } from "@/components/specialties"
import { Differentials } from "@/components/differentials"
import { Testimonials } from "@/components/testimonials"
import { HowItWorks } from "@/components/how-it-works"
import { CTA } from "@/components/cta"
import { Contact } from "@/components/contact"
import { Footer } from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Problems />
        <About />
        <Specialties />
        <Differentials />
        <Testimonials />
        <HowItWorks />
        <CTA />
        <Contact />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
